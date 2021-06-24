import { Config } from "@confuscript/types";

export const CoConfig: Config = {
    name: "Confuscript-Test",
    version: "0.0.1",
    main: "Main.co",
    target: [
        {
            compiler: "builtin",
            target: "node",
            bundle: false,
            out: "dist/node/unbundled",
        },
        {
            compiler: "builtin",
            target: "node",
            bundle: true,
            out: "dist/node/bundled",
        },
    ],
};
