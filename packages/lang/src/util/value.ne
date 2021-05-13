@{%
    append({
        stringmark: {
            match: /("|')/,
            lineBreaks: true,
            next: "main"
        }
        ...literals(["string"])
    })
%}

@lexer lexer

valuetype -> "string"
    | "int"
    | "boolean"

value -> %stringmark %sentence %stringmark