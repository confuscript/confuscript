import { Parser, Indexer } from "@confuscript/parser";
import JoyCon from "joycon";
import {
    Config,
    getSource,
    loadConfig,
    writeTargetDebugs,
} from "@confuscript/types";
import { existsSync } from "fs";
import { resolve } from "path";
import { Logger } from "../util/log";
import { Compiler } from "@confuscript/compiler";
import { initPlugins } from "../plugins/initPlugins";

export interface BuildCommandOpts {
    debug?: boolean;
}

export default async function buildCommand(opts: BuildCommandOpts) {
    // resolve

    const log = new Logger(opts.debug);
    let stageStart = Date.now();
    log.startHeader("Resolving project information...");

    const joycon = new JoyCon({
        packageKey: "confuscript",
    });
    const config = (await loadConfig(joycon)) as { path: string; data: Config };

    log.info(`Loaded config at path ${config.path}`);

    let hasJsPlugin = false;

    for (const plugin of config.data.plugins ?? []) {
        let name: string;
        if (typeof plugin === "string") name = plugin;
        else name = plugin[0];

        const matched = name.match(/(plugin-)?js$/);
        if (!hasJsPlugin && matched && matched.length > 0) hasJsPlugin = true;
    }

    if (!hasJsPlugin) {
        if (!config.data.pluginMode || config.data.pluginMode === "prepend")
            config.data.plugins = [
                "@confuscript/plugin-js",
                ...(config.data.plugins ?? []),
            ];
        else
            config.data.plugins = [
                ...(config.data.plugins ?? []),
                "@confuscript/plugin-js",
            ];
    }

    const plugins = initPlugins(config.data);

    log.info("Initialised plugins");

    const src = resolve(process.cwd(), "src");

    if (!existsSync(src)) {
        log.err("No src folder");
        process.exit(1);
    }

    log.info('Using "src" folder as code root');
    log.endHeader(
        "Resolved project",
        config.data.name,
        `in ${Date.now() - stageStart}ms`,
    );

    // parse

    stageStart = Date.now();
    log.startHeader("Parsing code...");
    const parser = new Parser();

    await parser.run(getSource(src));

    const exported = await parser.export();

    log.subHeader("Indexing files...");

    const indexer = new Indexer(parser);
    const indexed = await indexer.start(exported);

    if (opts.debug) {
        writeTargetDebugs(exported, indexed);
        log.debug("Wrote target debugs");
    }

    const filecount = Object.keys(exported).length;
    log.endHeader(
        `Parsed ${filecount} file${filecount !== 1 ? "s" : ""} in ${
            Date.now() - stageStart
        }ms`,
    );

    // compile

    log.startHeader("Compiling project...");

    const compiler = new Compiler(exported, indexed, config.data, plugins);

    compiler.start();

    log.endHeader(`Compiled project in ${Date.now() - stageStart}ms`);
}
