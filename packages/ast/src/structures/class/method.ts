import { RawString } from "../../common/string";
import { ValueType } from "../../util/value";

export interface ClassMethodDefinition {
    type: "ClassMethodDefinition";
    name: RawString<"word">;
    parameters: FormalParameter[];
    content: MethodBody[];
}

export interface FormalParameter {
    type: "FormalParameter";
    name: RawString<"word">;
    value: {
        type: ValueType;
    };
}

export type MethodBodyNodes = any;
export type MethodBody = MethodBodyNodes | string;
