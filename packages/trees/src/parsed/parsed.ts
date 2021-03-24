export type Parsed = (string | ParsedImport | ParsedClass)[];

export interface ParsedImport {
    type: "import";
    path: string[];
}

export interface ParsedClass {
    type: "class";
    name: string;
    content: ParsedClassContent;
}

export type ParsedClassContent = string[];
