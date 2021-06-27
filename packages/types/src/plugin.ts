export default class Plugin<Options extends any = any> {
    name: string;
    options: Options;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * Ran while loading the plugin (usually during the project resolution step
     */
    onLoad(_options?: Options) {}
}
