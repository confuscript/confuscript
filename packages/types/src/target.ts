import { basename, resolve } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { AST } from "./ast";
import { stringify } from "./json";
import { Index } from "@confuscript/parser";

export function createIfNotTarget(wd = process.cwd()) {
    const dir = resolve(wd, "target");

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    return dir;
}

export function writeTargetDebugs(ast: AST, index: Index, wd = process.cwd()) {
    const dir = createIfNotTarget(wd);
    const debugDir = resolve(dir, "debug");

    if (!existsSync(debugDir)) mkdirSync(debugDir, { recursive: true });

    const astfile = resolve(debugDir, "ast.json");
    const indexfile = resolve(debugDir, "index.json");

    createParentDirs(astfile);
    createParentDirs(indexfile);

    writeFileSync(astfile, stringify(ast));
    writeFileSync(indexfile, stringify(index));
}

export function createParentDirs(path: string) {
    const newpath = path.replace(basename(path), "").replace(/[\/\\]$/, "");
    mkdirSync(newpath, {
        recursive: true,
    });
}
