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

@include "./variable.ne"
@include "./class/method.ne"

class -> "class" %ws:? %word %ws:? "{" classbody:* "}" {% d => ({ type: "ClassDefinition", name: d[2], content: d[5] }) %}

classbody -> %ws {%d => d[0].value%}
    | classvariable {%id%}
    | classmethod {%id%}
