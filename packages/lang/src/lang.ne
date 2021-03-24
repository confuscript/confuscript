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
            match: /[A-Za-z0-9]+/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(l)
    }

    function append(rs) {
        Object.assign(rules, rs);
    }
%}

@lexer lexer

@include "./util/comment.ne"
@include "./structures/imports.ne"

root -> main:+ {%d => d[0]%}

main -> import {%id%}
    | comment {%id%}
    | %ws {%d => d[0].value%}

@{%
    const lexer = moo.states({
        main: {
            ...rules
        }
    })
%}
