import { resolve } from "path";
import { SourceTree } from "./ast";
import { lstatSync, readdirSync, readFileSync } from "fs";

export function getSource(rootdir: string) {
    rootdir = resolve(rootdir); //cleansing purposes

    const map: SourceTree = {};

    const run = (prev: string | null, dir: string) => {
        const subs = readdirSync(dir);

        for (const file of subs) {
            const stat = lstatSync(resolve(dir, file));

            let dotpath = "";
            if (prev) dotpath += prev + ".";
            dotpath += file.replace(/\.co$/, "");

            if (stat.isFile() && file.endsWith(".co")) {
                map[dotpath] = readFileSync(resolve(dir, file), "utf-8");
            } else if (stat.isDirectory()) {
                run(dotpath, resolve(dir, file));
            }
        }
    };

    run(null, rootdir);

    return map;
}
