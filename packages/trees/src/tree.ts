import { makeParentDirs, ProjectConfig, Tree } from "@confuscript/core";
import chalk from "chalk";
import { lstatSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { Grammar, Parser } from "nearley";
import { resolve, sep } from "path";

export default class Treeify {
    tree: Tree = {};
    config: ProjectConfig;
    rootdir: string;
    grammar: Grammar;

    constructor(config: ProjectConfig, rootdir: string, grammar: Grammar) {
        this.config = config;
        this.rootdir = rootdir;
        this.grammar = grammar;
    }

    /**
     * Start the Treeifier
     */
    async start() {
        await this.processDir();
        makeParentDirs(resolve(this.rootdir, "debug", "tree.json"));
        writeFileSync(
            resolve(this.rootdir, "debug", "tree.json"),
            JSON.stringify(this.tree),
        );
    }

    /**
     * For processing all files in a directory (recursive)
     */
    async processDir(dir = "") {
        const path = resolve(this.rootdir, "src", dir);
        for (const file of readdirSync(path)) {
            const stat = lstatSync(resolve(path, file));
            if (stat.isDirectory()) {
                await this.processDir(dir == "" ? file : dir + sep + file);
            } else {
                await this.processFile(dir == "" ? file : dir + sep + file);
            }
        }
    }

    /**
     * Process a file and add it to the tree
     * @param path Path to file (e.g. example.something.Name or for the default main file, projectname.Main)
     */
    async processFile(path: string) {
        const content = readFileSync(
            resolve(this.rootdir, "src", path),
            "utf-8",
        );
        const parser = new Parser(this.grammar, { keepHistory: false });
        parser.feed(content);
        let parsed = parser.finish();
        if (parsed.length > 1) {
            console.log(
                chalk`{red The parser returned multiple of the same parsed content. Make sure there are no extra whitespace rules or faffing with the whitespace ast (https://github.com/kach/nearley/issues/504)}`,
            );
            process.exit(1);
        }
        parsed = parsed[0];
        makeParentDirs(resolve(this.rootdir, "debug", path + ".json"));
        writeFileSync(
            resolve(this.rootdir, "debug", path + ".json"),
            JSON.stringify(parsed, null, 2),
        );
    }
}
