import { ClassDeclaration, MethodDefinition, PropertyDefinition } from "estree";

export const JSClass = (
    name: string,
    body: (MethodDefinition | PropertyDefinition)[],
) =>
    ({
        type: "ClassDeclaration",
        id: {
            type: "Identifier",
            name,
        },
        body: {
            type: "ClassBody",
            body,
        },
    } as ClassDeclaration);
