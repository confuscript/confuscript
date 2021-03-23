import { mkdirSync } from "fs";
import { resolve } from "path";

export function makeParentDirs(path: string) {
    mkdirSync(resolve(path, "../"), {
        recursive: true,
    });
}
