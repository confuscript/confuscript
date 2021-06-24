import { Parser } from "@confuscript/parser";
import JoyCon from "joycon";
import { loadConfig } from "@confuscript/types";

export interface BuildCommandOpts {
    debug?: boolean;
}

export default async function buildCommand(_opts: BuildCommandOpts) {
    const joycon = new JoyCon();
    const config = await loadConfig(joycon);

    console.log(config);

    const parser = new Parser();

    parser.export();
}
