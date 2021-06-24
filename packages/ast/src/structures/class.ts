import { RawString } from "../common/string";

export interface ClassDefinition {
    type: "ClassDefinition";
    name: RawString;
    content: ClassBody[];
}

export type ClassBody = ClassDefinition | string;
