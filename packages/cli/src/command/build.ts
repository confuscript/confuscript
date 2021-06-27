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

export interface BuildCommandOpts {
    debug?: boolean;
}

export default async function buildCommand(opts: BuildCommandOpts) {
    const log = new Logger(opts.debug);
    log.startHeader("Resolving project information...");

    const joycon = new JoyCon({
        packageKey: "confuscript",
    });
    const config = (await loadConfig(joycon)) as { path: string; data: Config };
    log.info(`Loaded config at path ${config.path}`);

    console.log(config);

    const src = resolve(process.cwd(), "src");

    if (!existsSync(src)) {
        log.err("No src folder");
        process.exit(1);
    }

    log.info('Using "src" folder as code root');
    log.endHeader("Resoled project", config.data.name);

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
    log.endHeader(`Parsed ${filecount} file${filecount > 1 ? "s" : ""}`);
}
