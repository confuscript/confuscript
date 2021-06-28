import { RawString } from "../common/string";
import { ClassVariableDefinition } from "./variable";

export interface ClassDefinition {
    type: "ClassDefinition";
    name: RawString;
    content: ClassBody[];
}

export type ClassBodyNodes = ClassVariableDefinition;
export type ClassBody = ClassBodyNodes | string;
