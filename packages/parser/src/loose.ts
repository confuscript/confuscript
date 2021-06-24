import { File } from "@confuscript/ast";
import { Grammar, Parser } from "nearley";

const cogrammar = require("@confuscript/grammar");

export function looseParse(
    content: string,
    grammar = Grammar.fromCompiled(cogrammar),
    customParser?: Parser,
): File {
    const parser = customParser ?? new Parser(grammar);
    parser.feed(content);

    const parsed = parser.finish();

    if (parsed.length > 1)
        throw new Error("Parser return multiple root File nodes");

    return parsed[0];
}
