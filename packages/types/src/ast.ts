import { File } from "@confuscript/ast";

export type AST = { [path: string]: File };

export type SourceTree = {
    [dotpath: string]: string; // e.g. "confused.Logger": "<content>"
};
