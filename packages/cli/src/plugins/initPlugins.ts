import { Config, Plugin } from "@confuscript/types";

export function initPlugins(config: Config) {
    const plugins: Plugin[] = [];
    const named: { [name: string]: number } = {};

    let i = 0;
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

        let found = resolvePlugin(name);
        if (found.default) found = found.default;

        const instant: Plugin = new found();
        instant.options = options;
        if (instant.onLoad) instant.onLoad(options);

        plugins.push(instant);
        named[instant.name] = i;
        i++;
    }

    return {
        plugins,
        named,
    };
}

export function resolvePlugin(name: string) {
    try {
        return require(name);
    } catch (e) {
        try {
            return require(`confuscript-plugin-${name}`);
        } catch (e) {
            return require(`@confuscript/plugin-${name}`);
        }
    }
}
