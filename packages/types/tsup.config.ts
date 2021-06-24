import { Options } from "tsup";

export const tsup: Options = {
    sourcemap: true,
    clean: true,
    entryPoints: ["src/index.ts"],
    dts: true,
};
