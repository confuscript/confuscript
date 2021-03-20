@{%
    const moo = require("moo");

    function literals(list) {
        var rules = {}
        for (var lit of list) {
            rules[lit] = {match: lit, next: "main"}
        }
        return rules
    }

    const l =
        [
        ".",
        "import"
        ]

    const rules = {
        string: {
            match: /\"(?:(?![\"\n])[\w\W]+)\"/,
            lineBreaks: true,
            next: "main",
            value: v => v.slice(1, -1)
        },
        word: {
            match: /\w+/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(l)
    }

    const initial = (d) => d[0];

    function append(rs) {
        Object.assign(rules, rs);
    }
%}

@lexer lexer

@include "./util/comment.ne"
@include "./structures/imports.ne"

main -> m:+

m -> comment
    | import
    | %s

@{%
    const lexer = moo.states({
        main: {
            ...rules
        }
    })
%}