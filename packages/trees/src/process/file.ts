import { Parsed } from "../parsed/parsed";
import { TreeClass } from "@confuscript/core";

export function processParsedFile(p: Parsed): TreeClass {
    const cls: TreeClass = {
        type: "class",
        constructable: false,
        special: "none",
        specialProps: [],
        compileType: "include",
        imports: [],
        content: {
            name: "",
            staticVars: [],
            vars: [],
            constructors: [],
            methods: [],
            staticMethods: [],
        },
    };

    for (const part of p) {
        if (typeof part !== "string") {
            if (part.type === "import") {
                cls.imports?.push(part);
            } else if (part.type === "class") {
                cls.content.name = part.name;
            }
        }
    }

    return cls;
}
