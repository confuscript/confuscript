export type NearleyOutput = (OutputRootImport|OutputRootClass|string)[]

export interface OutputRootImport {
    type: "rootimport",
    location: string
}

export interface OutputRootClass {
    type: "rootclass",
    name: string,
    body: OutputClassBody
}

export type OutputClassBody = (OutputMethod|string)[]

export interface OutputMethod {
    type: "method",
    name: string,
    public: boolean,
    returns: {
        type: "type",
        is: "any"|"unknown"
    },
    body: OutputMethodBody
}

export type OutputMethodBody = (OutputCall|string)[]

export interface OutputCall {
    type: "call",
    calls: string[],
    values: OutputValue[]
}

export interface OutputValue {
    type: "string"|"int",
    value: string
}
