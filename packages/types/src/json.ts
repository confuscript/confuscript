import { stringify as jjuStringify } from "jju";

export const stringify = (content: any) =>
    jjuStringify(content, {
        mode: "json",
        indent: "    ",
    });
