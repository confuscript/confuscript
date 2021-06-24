import { Options } from "tsup";
import { TsupCommon } from "../../tsup.common";

export const tsup: Options = {
    ...TsupCommon,
    splitting: true,
    entryPoints: ["src/index.ts", "src/cli.ts"],
};
