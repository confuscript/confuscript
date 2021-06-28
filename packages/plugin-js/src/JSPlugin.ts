import { Config, Plugin, PluginManager, Target } from "@confuscript/types";
import { JSClass } from "./ast/class";
import { JSProp } from "./ast/prop";
import { ClassDeclaration, Property } from "estree";
import { makeRunBundle } from "./bundle";
import { generate } from "astring";
import { Compiler } from "@confuscript/compiler";

export default class JSPlugin extends Plugin {
    constructor() {
        super("js");
    }

    onPreCompile(manager: PluginManager<Compiler>) {
        manager.compiler.registerTarget("node", () => {
            manager.compiler.handle("ClassDefinition", (node, body) =>
                JSClass(node.name.value, body ?? []),
            );
            manager.compiler.handle("ClassVariableDefinition", (node) =>
                JSProp(node.name.value, false, false, null),
            );

            manager.compiler.finalfn = (manager, context, prebuilt) =>
                this.doFinal(manager, context, prebuilt);
        });
    }

    doFinal(
        manager: PluginManager<Compiler>,
        context: any & {
            target: Target;
            config: Config;
            mainclass: string;
            mainmethod: string;
        },
        prebuilt: { [p: string]: ClassDeclaration },
    ) {
        manager;

        const final: any = {};

        if (context.target.bundle) {
            const properties: Property[] = [];

            for (const built of Object.keys(prebuilt)) {
                const clss = prebuilt[built];

                properties.push({
                    type: "Property",
                    method: false,
                    shorthand: false,
                    computed: false,
                    key: {
                        type: "Identifier",
                        name: built,
                    },
                    value: {
                        type: "ClassExpression",
                        id: null,
                        superClass: null,
                        body: clss.body,
                    },
                    kind: "init",
                });
            }

            final["out.js"] = generate(
                makeRunBundle(
                    {
                        type: "ObjectExpression",
                        properties,
                    },
                    context.mainclass,
                    context.mainmethod,
                ),
                context.target.minify ?? true
                    ? {
                          indent: "",
                          lineEnd: "",
                      }
                    : undefined,
            );
        }

        return final;
    }
}
