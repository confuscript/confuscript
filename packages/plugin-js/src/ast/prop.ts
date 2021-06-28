import { PropertyDefinition } from "estree";

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
        key: {
            type: "Identifier",
            name,
        },
    } as PropertyDefinition);
