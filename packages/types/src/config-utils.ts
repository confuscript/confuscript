import { readFileSync } from "fs";
import JoyCon from "joycon";
import { parse } from "jju";
import stripJsonComments from "strip-json-comments";
import { transform } from "sucrase";
import { dirname, resolve } from "path";
import Module from "module";

export async function loadConfig(joycon: JoyCon, wd = process.cwd()) {
    joycon.addLoader({
        test: /\.co(nfuscript)?rc$/,
        load: async (path) =>
            parse(stripJsonComments(readFileSync(path, "utf-8"))),
    });

    joycon.addLoader({
        test: /\.ts$/,
        load: async (path) => {
            const content = transform(readFileSync(resolve(path), "utf-8"), {
                filePath: path,
                transforms: ["imports", "typescript"],
            });

            // @ts-ignore
            const paths = Module._nodeModulePaths(dirname(path));

            const parent = module.parent ?? undefined;
            const m = new Module(path, parent);
            m.filename = path;
            m.paths = paths;

            // @ts-ignore
            m._compile(content.code, path);

            const exports = m.exports;

            parent &&
                parent.children &&
                parent.children.splice(parent.children.indexOf(m), 1);

            return exports.default ?? exports;
        },
    });

    const loaded = await joycon.load(
        [
            ".confuscriptrc",
            ".corc",
            "confuscript.config.js",
            "confuscript.config.ts",
            "co.config.js",
            "co.config.ts",
            "package.json",
        ],
        wd,
        dirname(wd),
    );

    if (!loaded.data.name && loaded.data.config)
        loaded.data = loaded.data.config;

    if (!loaded.data.name && Object.keys(loaded.data).length > 0) {
        for (const key of Object.keys(loaded.data)) {
            if (typeof loaded.data[key].name !== "undefined") {
                loaded.data = loaded.data[key];
            }
        }
    }
    if (!loaded.data.name)
        throw new Error(
            "No config found (or you didnt specify a package name)",
        );

    return loaded;
}
