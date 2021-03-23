import { Treeify } from "@confuscript/trees";
import { resolve } from "path";
import { ProjectConfig } from "@confuscript/core";
import { readFileSync } from "fs";
import { Grammar } from "nearley";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const grammar = require("@confuscript/lang");

export default function build(options: any) {
    const configpath = resolve(
        process.cwd(),
        options.config ? options.config : ".confuscriptrc",
    );
    const config: ProjectConfig = JSON.parse(readFileSync(configpath, "utf-8"));
    const tree = new Treeify(
        config,
        resolve(configpath, "../"),
        Grammar.fromCompiled(grammar),
    );

    tree.start();
}
