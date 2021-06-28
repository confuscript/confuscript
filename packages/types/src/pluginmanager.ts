import { Compiler } from "@confuscript/compiler";

export default class PluginManager {
    compiler: Compiler;

    constructor(compiler: Compiler) {
        this.compiler = compiler;
    }
}
