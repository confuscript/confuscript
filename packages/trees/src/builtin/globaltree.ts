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
                            type: "instance",
                            instpath: { type: "this" },
                            methodName: "put",
                            methodparams: [
                                {
                                    type: "concat",
                                    initial: {
                                        type: "localaccessor",
                                        accessortype: "get",
                                        name: "message",
                                        formalParam: true,
                                    },
                                    append: [
                                        {
                                            type: "literal",
                                            ltype: "string",
                                            value: "\n",
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
