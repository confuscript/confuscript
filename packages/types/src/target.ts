import { basename, resolve } from "path";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { AST } from "./ast";
import { stringify } from "./json";
import { Index } from "./indexing";

export function createIfNotTarget(clean?: boolean, wd = process.cwd()) {
    const dir = resolve(wd, "target");

    if (clean || typeof clean === "undefined") {
        if (existsSync(dir)) rmSync(dir, { recursive: true });
        mkdirSync(dir, { recursive: true });
    } else if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    return dir;
}

export function writeTargetDebugs(
    ast: AST,
    index: Index,
    clean?: boolean,
    wd = process.cwd(),
) {
    const dir = createIfNotTarget(clean, wd);
    const debugDir = resolve(dir, "debug");

    if (!existsSync(debugDir)) mkdirSync(debugDir);

    const astfile = resolve(debugDir, "ast.json");
    const indexfile = resolve(debugDir, "index.json");

    createParentDirs(astfile);
    createParentDirs(indexfile);

    writeFileSync(astfile, stringify(ast));
    writeFileSync(indexfile, stringify(index));
}

export function writeBuilds(
    built: { [file: string]: string },
    clean?: boolean,
    wd = process.cwd(),
) {
    const dir = createIfNotTarget(clean, wd);
    const buildDir = resolve(dir, "build");

    if (!existsSync(buildDir)) mkdirSync(buildDir);

    for (const file of Object.keys(built)) {
        writeFileSync(resolve(buildDir, file), built[file]);
    }
}

export function createParentDirs(path: string) {
    const newpath = path.replace(basename(path), "").replace(/[\/\\]$/, "");
    mkdirSync(newpath, {
        recursive: true,
    });
}
