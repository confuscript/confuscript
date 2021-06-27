import { Config, Plugin } from "@confuscript/types";

export function initPlugins(config: Config) {
    const plugins: Plugin[] = [];

    for (const plugin of config.plugins ?? []) {
        let name: string | undefined = undefined;
        let options: any = {};

        if (typeof plugin === "string") {
            name = plugin;
        } else if (Array.isArray(plugin) && plugin.length >= 2) {
            name = plugin[0];
            // i have literally no clue why typescript complains at this because the type is set to [string | any] but typescript things its a tuple of [any]
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            options = plugin[1];
        }

        if (typeof name === "undefined")
            throw new Error("Couldnt find name for a plugin");

        const found = resolvePlugin(name);
        let p = require(found);
        if (p.default) p = p.default;

        const instant: Plugin = new p();
        instant.options = options;
        instant.onLoad(options);

        plugins.push();
    }

    return plugins;
}

export function resolvePlugin(name: string) {
    try {
        return require.resolve(name);
    } catch (e) {
        try {
            return require.resolve("confuscript-plugin-" + name);
        } catch (e) {
            try {
                return require.resolve("@confuscript/plugin-" + name);
            } catch (e) {
                throw new Error("Could not find plugin " + name);
            }
        }
    }
}
