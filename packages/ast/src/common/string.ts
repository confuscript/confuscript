export interface RawString<
    Type extends string = string,
    Value extends string = string,
> {
    type: Type;
    value: Value;
    text: string;
    offset: number;
    lineBreaks: number;
    line: number;
    col: number;
}
