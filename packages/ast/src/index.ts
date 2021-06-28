import { Import } from "./structures/imports";
import { ClassBodyNodes, ClassDefinition } from "./structures/class";

export interface File {
    type: "File";
    body: BodyNode[];
}

export type RootNode = File;

export type RawBodyNodes = Import | ClassDefinition;
export type BodyNode = RawBodyNodes | string;
export type AllNodes = RootNode | RawBodyNodes | ClassBodyNodes;
export type NodeTypes = AllNodes["type"];

export { RawString } from "./common/string";
export { ClassDefinition, ClassBody, ClassBodyNodes } from "./structures/class";
export { Import }; //from "./structures/imports";
export { ClassVariableDefinition } from "./structures/variable";
export { Value, ValueType } from "./util/value";
export {
    ClassMethodDefinition,
    FormalParameter,
    MethodBody,
    MethodBodyNodes,
} from "./structures/class/method";
