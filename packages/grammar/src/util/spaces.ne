@{%
    append({
        ws: {
            match: /\s+/,
            lineBreaks: true,
            next: "main"
        },
    })
%}

@lexer lexer

_ -> %ws {%d => d[0].value%}
    | %comment {%d => d[0].value%}