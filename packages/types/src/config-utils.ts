import { readFileSync } from "fs";
import JoyCon from "joycon";
import { parse } from "jju";
import stripJsonComments from "strip-json-comments";

export async function loadConfig(joycon: JoyCon, wd = process.cwd()) {
    joycon.addLoader({
        test: /\.co(nfuscript)?rc$/,
        load: async (path) =>
            parse(stripJsonComments(readFileSync(path, "utf-8"))),
    });

    return await joycon.load(
        [
            ".confuscriptrc",
            ".corc",
            "package.json",
            "confuscript.config.js",
            "confuscript.config.ts",
            "co.config.js",
            "co.config.ts",
        ],
        wd,
        "src",
    );
}
