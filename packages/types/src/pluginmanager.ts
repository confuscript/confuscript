export default class PluginManager<Compiler> {
    compiler: Compiler;

    constructor(compiler: Compiler) {
        this.compiler = compiler;
    }
}
