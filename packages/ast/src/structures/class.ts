import { RawString } from "../common/string";
import { ClassVariableDefinition } from "./variable";
import { ClassMethodDefinition } from "./class/method";

export interface ClassDefinition {
    type: "ClassDefinition";
    name: RawString;
    content: ClassBody[];
}

export type ClassBodyNodes = ClassVariableDefinition | ClassMethodDefinition;
export type ClassBody = ClassBodyNodes | string;
