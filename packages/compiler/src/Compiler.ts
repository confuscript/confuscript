import {
    AST,
    Config,
    Index,
    Plugin,
    PluginManager,
    Target,
} from "@confuscript/types";
import {
    AllNodes,
    ClassDefinition,
    ClassMethodDefinition,
    NodeTypes,
} from "@confuscript/ast";
import { LogicHandler, LogicTypes } from "./allLogic";

export type NodeHandler<Type extends NodeTypes> = (
    node: AllNodes & { type: Type },
    body?: any,
    ...args: any[]
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
    logicHandlers: Map<LogicTypes, LogicHandler<any>> = new Map();
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
            this.logicHandlers = new Map();
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

            //this.initialtree[filename] = this.processEntrypoint(clss, method);
            this.methodCall(filename, methodname);

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

    processEntrypoint(c: ClassDefinition, _m: ClassMethodDefinition) {
        if (this.handlers.has("ClassDefinition")) {
            const body: any[] = [];

            return this.getHandler("ClassDefinition", true)(c, body);
        }

        return null;
    }

    methodCall(filename: string, methodname: string, classname?: string) {
        const fileindex = this.index[filename];
        if (!fileindex) throw new Error("No such file " + filename);
        const file = this.ast[filename];

        const classindex = fileindex.classes[classname ?? fileindex.mainclass];
        if (!classindex)
            throw new Error(
                "No such class " + classname ?? fileindex.mainclass,
            );
        const clss = file.body[classindex.index] as ClassDefinition;

        const methodindex = classindex.methods[methodname];
        const method = clss.content[methodindex] as ClassMethodDefinition;

        const params: any[] = [];

        for (const param of method.parameters) {
            params.push(this.getHandler("FormalParameter", true)(param));
        }

        const result = this.getHandler("ClassMethodDefinition", true)(
            method,
            [],
            params,
        );

        if (!this.initialtree[filename]) {
            this.initialtree[filename] = this.getHandler(
                "ClassDefinition",
                true,
            )(clss, [result]);
        } else {
            this.getLogicHandler("MethodApplication")(
                this.initialtree[filename],
                result,
            );
        }
    }

    getHandler<Type extends NodeTypes>(
        type: Type,
        required?: boolean,
    ): NodeHandler<Type> {
        const found = this.handlers.get(type);
        if (required && !found) throw new Error("No type for " + type);
        return found ?? (() => ({}));
    }

    getLogicHandler<Type extends LogicTypes>(type: Type): LogicHandler<Type> {
        return this.logicHandlers.get(type) ?? (() => ({}));
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

    handleLogic<Type extends LogicTypes>(
        type: Type,
        handler: LogicHandler<Type>,
    ) {
        this.logicHandlers.set(type, handler);
    }

    output() {
        return this.built;
    }
}
