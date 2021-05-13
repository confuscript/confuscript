@{%
    append({
        stringvalue: {
            match: /["'][A-Za-z0-9\s\t\S]+["']/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(["string"])
    })
%}

@lexer lexer

valuetype -> "string" {%id%}
    | "int" {%id%}
    | "boolean" {%id%}

value -> %stringvalue {%id%}
