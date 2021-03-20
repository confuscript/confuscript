// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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


    append({
		comment: {
            match: /\/\/.*/,
            lineBreaks: true,
            next: "main"
        },
        blockcomment: {
            match: /\/\*[\w\W]*\*\//,
            lineBreaks: true,
            next: "main"
        },
    });


    append({
        ws: {
            match: /\s+/,
            lineBreaks: true,
            next: "main"
        },
    })


    const lexer = moo.states({
        main: {
            ...rules
        }
    })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "_"]},
    {"name": "_", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("comment") ? {type: "comment"} : comment), "_"]},
    {"name": "comment", "symbols": ["standardcomment"]},
    {"name": "comment", "symbols": ["blockcomment"]},
    {"name": "standardcomment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment), "_"]},
    {"name": "blockcomment", "symbols": [(lexer.has("blockcomment") ? {type: "blockcomment"} : blockcomment), "_"]},
    {"name": "import$ebnf$1", "symbols": ["moreimport"]},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1", "moreimport"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import", "symbols": [{"literal":"import"}, "_", "import$ebnf$1", (lexer.has("word") ? {type: "word"} : word)], "postprocess": (d) => ({type: "import", path: [...d[2], d[3]]})},
    {"name": "moreimport", "symbols": [(lexer.has("word") ? {type: "word"} : word), {"literal":"."}], "postprocess": initial},
    {"name": "main$ebnf$1", "symbols": ["m"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "m"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"]},
    {"name": "m", "symbols": ["comment"]},
    {"name": "m", "symbols": ["import"]},
    {"name": "m", "symbols": [(lexer.has("s") ? {type: "s"} : s)]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
