import { AST, Config, Index, Plugin } from "@confuscript/types";

export default class Compiler {
    ast: AST;
    index: Index;
    config: Config;
    plugins: Plugin[];

    constructor(ast: AST, index: Index, config: Config, plugins: Plugin[]) {
        this.ast = ast;
        this.index = index;
        this.config = config;
        this.plugins = plugins;
    }

    start() {
        //e
    }
}
