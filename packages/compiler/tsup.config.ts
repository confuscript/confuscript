import { Options } from "tsup";
import { TsupCommon } from "../../tsup.common";

export const tsup: Options = {
    ...TsupCommon,
    entryPoints: ["src/index.ts"],
};
