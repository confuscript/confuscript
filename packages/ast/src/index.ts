import { Import } from "./structures/imports";
import { ClassDefinition } from "./structures/class";

export interface File {
    type: "File";
    body: BodyNode[];
}

export type RootNode = File;

export type BodyNode = Import | ClassDefinition | string;

export { RawString } from "./common/string";
export { ClassDefinition, ClassBody } from "./structures/class";
export { Import }; //from "./structures/imports";
export { ClassVariableDefinition } from "./structures/variable";
export { Value, ValueType } from "./util/value";
