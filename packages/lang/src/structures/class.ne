@{%
    append({
        ws: {
            match: /\s+/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(["class"])
    })
%}

@lexer lexer

class -> "class" %ws:? %word %ws:? "{" classbody:* "}" {% d => ({ type: "class", name: d[2].value, content: d[5] }) %}

classbody -> %ws {%d => d[0].value%}