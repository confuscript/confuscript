import { Grammar, Parser as NearleyParser } from "nearley";
import { AST, SourceTree } from "@confuscript/types";

const cogrammar = require("@confuscript/grammar");

export default class Parser {
    grammar: Grammar;
    parser: NearleyParser;

    tree: AST = {};

    constructor(grammar?: Grammar) {
        this.grammar = grammar ? grammar : Grammar.fromCompiled(cogrammar);
    }

    async run(source: SourceTree) {
        for (const dotpath of Object.keys(source)) {
            await this.parse(dotpath, source[dotpath]);
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

    async export(): Promise<AST> {
        return this.tree;
    }
}
