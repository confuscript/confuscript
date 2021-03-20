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

_ -> %ws _
    | %ws %comment _