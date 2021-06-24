import { Parser } from "@confuscript/parser";
import JoyCon from "joycon";
import { Config, loadConfig } from "@confuscript/types";
import { existsSync } from "fs";
import { resolve } from "path";
import { writeTargetDebugs } from "@confuscript/types";

export interface BuildCommandOpts {
    debug?: boolean;
}

export default async function buildCommand(opts: BuildCommandOpts) {
    const joycon = new JoyCon();
    const config = (await loadConfig(joycon)) as Config;
    console.log(config.name);
    const src = resolve(process.cwd(), "src");

    if (!existsSync(src)) throw "No src folder";

    const parser = new Parser();

    await parser.run(null, src);

    const exported = await parser.export();

    if (opts.debug) writeTargetDebugs(exported);
}
