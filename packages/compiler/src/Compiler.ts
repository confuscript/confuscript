import {
    AST,
    Config,
    Index,
    Plugin,
    PluginManager,
    Target,
} from "@confuscript/types";
import { AllNodes, ClassDefinition, NodeTypes } from "@confuscript/ast";
import { ClassMethodDefinition } from "@confuscript/ast";

export type NodeHandler<Type extends NodeTypes> = (
    node: AllNodes & { type: Type },
    body?: any,
) => any;

export type TargetFN = (config: Config, target: Target) => any;

export default class Compiler {
    ast: AST;
    index: Index;
    config: Config;
    plugins: { plugins: Plugin[]; named: { [name: string]: number } };

    initialtree: { [file: string]: any };
    built: { [id: string]: { [file: string]: string } } = {};
    manager: PluginManager<this>;

    handlers: Map<NodeTypes, NodeHandler<any>>;
    targets: Map<string, TargetFN> = new Map();

    finalfn:
        | undefined
        | ((
              manager: PluginManager<this>,
              context: any,
              prebuilt: { [p: string]: any },
          ) => any);

    constructor(
        ast: AST,
        index: Index,
        config: Config,
        plugins: { plugins: Plugin[]; named: { [name: string]: number } },
    ) {
        this.ast = ast;
        this.index = index;
        this.config = config;
        this.plugins = plugins;
    }

    start() {
        for (const target of this.config.target) {
            this.handlers = new Map();
            this.initialtree = {};
            this.finalfn = undefined;

            this.buildTarget(target);
        }
    }

    buildTarget(target: Target) {
        if (this.targets.has(target.target)) {
            const main = target.main ?? this.config.main;
            if (!main)
                throw new Error(
                    `Target ${
                        target.id ?? `for node with no id`
                    } could not resolve a name`,
                );

            const filename = main.split(".")[0];
            const methodname = main.split(".")[1];

            const fileindex = this.index[filename];

            if (!fileindex) throw new Error(`No file of name ${filename}.co`);

            const classindex = fileindex.classes[fileindex.mainclass];

            if (!classindex)
                throw new Error(
                    "Internal error occured: indexer returns incorrect main class " +
                        fileindex.mainclass,
                );

            if (!classindex.methods)
                throw new Error(`${filename} has no methods`);
            const methodindex = classindex.methods[methodname];

            if (!methodindex)
                throw new Error(
                    `No method in class ${fileindex.mainclass} of name ${methodname}`,
                );

            const file = this.ast[filename];
            if (!file) return;

            const clss = file.body[classindex.index] as ClassDefinition;
            if (!clss) return;

            let context = (this.targets.get(target.target) as TargetFN)(
                this.config,
                target,
            );

            context = {
                target,
                config: this.config,
                mainclass: filename,
                mainmethod: methodname,
                ...context,
            };

            const method = clss.content[methodindex] as ClassMethodDefinition;
            if (!method) return;

            this.initialtree[filename] = this.processEntrypoint(clss, method);

            if (typeof this.finalfn !== "function")
                throw new Error("No final function registered");

            this.built[target.id] = this.finalfn(
                this.manager,
                context,
                this.initialtree,
            );
        } else {
            throw new Error("Unrecognised target " + target.target);
        }
    }

    processEntrypoint(c: ClassDefinition, m: ClassMethodDefinition) {
        if (this.handlers.has("ClassDefinition")) {
            const body: any[] = [];

            console.log(m);

            return (
                this.handlers.get(
                    "ClassDefinition",
                ) as NodeHandler<"ClassDefinition">
            )(c, body);
        }

        return null;
    }

    registerTarget(name: string, context: TargetFN) {
        if (this.targets.has(name))
            throw new Error(`Target ${name} already known`);

        this.targets.set(name, context);
    }

    handle<Type extends NodeTypes>(type: Type, handler: NodeHandler<Type>) {
        // if (this.handlers.has(type))
        //     throw new Error("Already registered type " + type);

        this.handlers.set(type, handler);
    }

    output() {
        return this.built;
    }
}
