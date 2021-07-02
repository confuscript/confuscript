import { Config, Plugin, PluginManager, Target } from "@confuscript/types";
import { JSClass } from "./ast/class";
import { JSProp } from "./ast/prop";
import { ClassDeclaration, Property } from "estree";
import { makeRunBundle } from "./bundle";
import { generate } from "astring";
import { Compiler } from "@confuscript/compiler";
import { JSIdentifier } from "./ast/id";
import { JSClassMethod } from "./ast/method";

export default class JSPlugin extends Plugin {
    constructor() {
        super("js");
    }

    onPreCompile(manager: PluginManager<Compiler>) {
        manager.compiler.registerTarget("node", () => {
            // handlers
            manager.compiler.handle("ClassDefinition", (node, body) =>
                JSClass(node.name.value, body ?? []),
            );
            manager.compiler.handle("ClassVariableDefinition", (node) =>
                JSProp(node.name.value, false, false, null),
            );

            manager.compiler.handle("FormalParameter", (node) =>
                JSIdentifier(node.name.value),
            );

            manager.compiler.handle(
                "ClassMethodDefinition",
                (node, body, params) =>
                    JSClassMethod(node.name.value, body, params),
            );

            manager.compiler.finalfn = (manager, context, prebuilt) =>
                this.doFinal(manager, context, prebuilt);

            // logic
            manager.compiler.handleLogic(
                "MethodApplication",
                (
                    clss: ReturnType<typeof JSClass>,
                    method: ReturnType<typeof JSClassMethod>,
                ) => clss.body.body.push(method),
            );
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
