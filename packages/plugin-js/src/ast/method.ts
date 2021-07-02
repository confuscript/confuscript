import { Identifier, MethodDefinition } from "estree";
import { JSIdentifier } from "./id";

export const JSClassMethod = (
    name: string,
    body: any[],
    params?: Identifier[],
    isAsync?: boolean,
    isStatic?: boolean,
    isComputed?: boolean,
) =>
    ({
        type: "MethodDefinition",
        static: isStatic ?? false,
        computed: isComputed ?? false,
        kind: "method",
        key: JSIdentifier(name),
        value: {
            type: "FunctionExpression",
            id: null,
            generator: false,
            async: isAsync ?? false,
            params: params ?? [],
            body: {
                type: "BlockStatement",
                body,
            },
        },
    } as MethodDefinition);
