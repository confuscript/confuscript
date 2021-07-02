import { Identifier } from "estree";

export const JSIdentifier = (name: string) =>
    ({
        type: "Identifier",
        name,
    } as Identifier);
