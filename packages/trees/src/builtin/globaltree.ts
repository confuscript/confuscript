import { Tree } from "@confuscript/core";

export const GlobalTree: Tree = {
    "confused.prog.Program": {
        type: "class",
        constructable: false,
        special: "global",
        specialProps: ["INSTANCE"],
        content: {
            name: "Program",
            vars: [],
            staticVars: [
                {
                    accessibility: "public",
                    name: "INSTANCE",
                    type: {
                        isStructure: true,
                        structurePath: "confused.prog.Program",
                    },
                },
            ],
            methods: [
                {
                    name: "putLn",
                    params: [{ name: "message", type: "string" }],
                    returns: "void",
                    compiled: false,
                    content: [
                        {
                            type: "group",
                            calls: [
                                {
                                    type: "grab",
                                    name: "put",
                                    location: {
                                        type: "current",
                                    },
                                },
                                {
                                    type: "run",
                                    methodParams: [
                                        {
                                            name: "message",
                                            type: "string",
                                            value: {
                                                type: "concat",
                                                initial: {
                                                    type: "grab",
                                                    name: "message",
                                                    location: {
                                                        type: "formal",
                                                        expectedType: "string",
                                                    },
                                                },
                                                append: [
                                                    {
                                                        type: "literal",
                                                        ltype: "string",
                                                        value: "\n",
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "put",
                    params: [{ name: "message", type: "string" }],
                    returns: "void",
                    compiled: true,
                },
            ],
        },
    },
};
