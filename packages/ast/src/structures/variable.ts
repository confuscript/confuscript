import { Value, ValueType } from "../util/value";

export interface ClassVariableDefinition {
    type: "ClassVariableDefinition";
    value: {
        type: ValueType | null;
        value: Value | null;
    };
}
