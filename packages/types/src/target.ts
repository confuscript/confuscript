import { basename, resolve } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { AST } from "./ast";
import { stringify } from "./json";

export function createIfNotTarget(wd = process.cwd()) {
    const dir = resolve(wd, "target");

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    return dir;
}

export function writeTargetDebugs(ast: AST, wd = process.cwd()) {
    const dir = createIfNotTarget(wd);
    const debugDir = resolve(dir, "debug");

    if (!existsSync(debugDir)) mkdirSync(debugDir, { recursive: true });

    for (const key of Object.keys(ast)) {
        const file = resolve(debugDir, key + ".json");
        createParentDirs(file);
        writeFileSync(file, stringify(ast[key]));
    }
}

export function createParentDirs(path: string) {
    const newpath = path.replace(basename(path), "").replace(/[\/\\]$/, "");
    mkdirSync(newpath, {
        recursive: true,
    });
}
