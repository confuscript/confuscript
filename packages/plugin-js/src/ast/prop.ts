import { PropertyDefinition } from "estree";
import { JSIdentifier } from "./id";

export const JSProp = (
    name: string,
    isStatic?: boolean,
    computed?: boolean,
    value?: any,
) =>
    ({
        type: "PropertyDefinition",
        static: isStatic,
        computed,
        value,
        key: JSIdentifier(name),
    } as PropertyDefinition);
