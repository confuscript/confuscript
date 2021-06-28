import Parser from "../parsing/Parser";
import { AST, Index } from "@confuscript/types";

export default class Indexer {
    parser?: Parser;

    constructor(parser?: Parser) {
        this.parser = parser;
    }

    async start($ast: AST): Promise<Index> {
        const ast = $ast ?? (await this.parser?.export());
        if (!ast)
            throw new Error(
                "No ast passed and no parser to export from was found",
            );

        const index: Index = {};

        for (const fkey of Object.keys(ast)) {
            const file = ast[fkey];
            if (file.type !== "File")
                throw new Error("Tried to index file that is not a file");

            const findex: Partial<Index[string]> = {};

            for (let bpindex = 0; bpindex < file.body.length; bpindex++) {
                const bodypart = file.body[bpindex];

                if (typeof bodypart !== "string") {
                    if (bodypart.type === "ClassDefinition") {
                        if (!findex.mainclass) {
                            findex.mainclass = bodypart.name.value;
                        }

                        const classindex: Partial<
                            Index[string]["classes"][string]
                        > = {
                            index: bpindex,
                        };

                        for (
                            let cindex = 0;
                            cindex < bodypart.content.length;
                            cindex++
                        ) {
                            const contentpart = bodypart.content[cindex];

                            if (typeof contentpart !== "string") {
                                if (
                                    contentpart.type ===
                                    "ClassVariableDefinition"
                                ) {
                                    if (!classindex.vars) classindex.vars = {};
                                    classindex.vars[contentpart.name.value] =
                                        cindex;
                                } else if (
                                    contentpart.type === "ClassMethodDefinition"
                                ) {
                                    if (!classindex.methods)
                                        classindex.methods = {};
                                    classindex.methods[contentpart.name.value] =
                                        cindex;
                                }
                            }
                        }

                        if (!findex.classes) findex.classes = {};
                        findex.classes[bodypart.name.value] =
                            classindex as Index[string]["classes"][string];
                    }
                }
            }

            index[fkey] = findex as Index[string]; // (at this point its populated)
        }

        return index;
    }
}
