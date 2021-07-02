import { ClassDeclaration, MethodDefinition, PropertyDefinition } from "estree";
import { JSIdentifier } from "./id";

export const JSClass = (
    name: string,
    body: (MethodDefinition | PropertyDefinition)[],
) =>
    ({
        type: "ClassDeclaration",
        id: JSIdentifier(name),
        body: {
            type: "ClassBody",
            body,
        },
    } as ClassDeclaration);
