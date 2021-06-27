import { AST, Config, Index, Plugin } from "@confuscript/types";

export default class Compiler {
    ast: AST;
    index: Index;
    config: Config;
    plugins: { plugins: Plugin[]; named: { [name: string]: number } };
    built: { [file: string]: string } = {};

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
        //e
    }

    output() {
        return this.built;
    }
}
