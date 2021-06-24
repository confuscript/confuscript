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
        ".", "{", "}",
        ";"
        ]

    const rules = {
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
@include "./structures/class.ne"

root -> main:+ {%d => ({ type: "File", body: d[0] }) %}

main -> import {%id%}
    | class {%id%}
    | comment {%id%}
    | %ws {%d => d[0].value%}

@{%
    const lexer = moo.states({
        main: {
            ...rules
        }
    })
%}
