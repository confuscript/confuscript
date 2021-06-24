import { Grammar, Parser as NearleyParser } from "nearley";
import { existsSync, lstatSync, readdirSync, readFileSync } from "fs";
import { resolve, sep } from "path";
import { AST } from "@confuscript/types";

const cogrammar = require("@confuscript/grammar");

export default class Parser {
    grammar: Grammar;
    parser: NearleyParser;

    tree: AST = {};

    constructor(grammar?: Grammar) {
        this.grammar = grammar ? grammar : Grammar.fromCompiled(cogrammar);
    }

    async run(previousPath: string | null, ...directories: string[]) {
        const prev = previousPath ? previousPath + sep : "";

        for (const dir of directories) {
            if (!existsSync(dir))
                throw new Error(`Directory "${dir}" does not exist`);

            const subs = readdirSync(dir);

            for (const file of subs) {
                const stat = lstatSync(resolve(dir, file));

                if (stat.isFile() && file.endsWith(".co")) {
                    await this.parse(
                        prev + file,
                        readFileSync(resolve(dir, file), "utf-8"),
                    );
                } else if (stat.isDirectory()) {
                    await this.run(prev + file, resolve(dir, file));
                }
            }
        }
    }

    async parse(path: string, content: string) {
        if (!this.parser) this.parser = new NearleyParser(this.grammar);

        this.parser.feed(content);

        const parsed = this.parser.finish();

        if (parsed.length > 1)
            throw new Error("Parser returned multiple root File nodes");

        this.tree[path.replace(/[\\/]/g, ".").replace(/.co$/, "")] = parsed[0];
    }

    async export() {
        return this.tree;
    }
}
