import { Config } from "@confuscript/types";

export const confuscript: Config = {
    name: "Confuscript-Test",
    version: "0.0.1",
    main: "Main",
    target: [
        {
            target: "node",
            bundle: false,
            out: "dist/node/unbundled",
        },
        {
            target: "node",
            bundle: true,
            out: "dist/node/bundled",
        },
    ],
};
