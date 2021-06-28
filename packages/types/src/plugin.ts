import PluginManager from "./pluginmanager";
import { Config, Target } from "./config";
import { Compiler } from "@confuscript/compiler/src";

export default class Plugin<Options extends any = any> {
    name: string;
    options: Options;

    protected constructor(name: string) {
        this.name = name;
    }

    /**
     * Ran while loading the plugin (usually during the project resolution step
     */
    onLoad?(options?: Options): void | any;

    /**
     * Ran just before the compiler starts compiling.
     * This is where you should register your node handlers.
     */
    onPreCompile(manager: PluginManager<Compiler>): void | any {
        return manager;
    }

    doFinal(
        manager: PluginManager<Compiler>,
        context: any & {
            target: Target;
            config: Config;
            mainclass: string;
            mainmethod: string;
        },
        prebuilt: { [file: string]: any },
    ): any {
        manager;
        context;

        const final: any = {};

        for (const build of Object.keys(prebuilt)) {
            final[build] = prebuilt[build].toString();
        }

        return final;
    }
}
