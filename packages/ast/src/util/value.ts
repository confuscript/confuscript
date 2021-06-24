import { RawString } from "../common/string";

export type ValueType = RawString<"word", "string" | "int" | "boolean">;

export type Value = RawString<"stringvalue">;
