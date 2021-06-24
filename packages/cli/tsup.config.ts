import { Options } from "tsup";

export const tsup: Options = {
    splitting: true,
    sourcemap: true,
    clean: true,
    entryPoints: ["src/index.ts", "src/cli.ts"],
    dts: true,
};
