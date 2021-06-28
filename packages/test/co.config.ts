import { Config } from "@confuscript/types";

export const confuscript: Config = {
    name: "Confuscript-Test",
    version: "0.0.1",
    main: "Main.main",
    target: [
        {
            id: "unbundled",
            target: "node",
            bundle: false,
            minify: true,
        },
        {
            id: "bundled",
            target: "node",
            bundle: true,
            minify: false,
        },
    ],
};
