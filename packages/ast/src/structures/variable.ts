import { Value, ValueType } from "../util/value";
import { RawString } from "../common/string";

export interface ClassVariableDefinition {
    type: "ClassVariableDefinition";
    name: RawString<"word">;
    value: {
        type: ValueType | null;
        value: Value | null;
    };
}
