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

    function all(d) { return [...d] }

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
            match: /[A-z0-9]+/,
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
            match: /\/\/.+/,
            lineBreaks: true,
            next: "main"
        },
        blockcomment: {
            match: /\/\*[\w\W]+\*\//,
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
    {"name": "_", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": d => d[0].value},
    {"name": "_", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": d => d[0].value},
    {"name": "comment", "symbols": ["standardcomment"], "postprocess": id},
    {"name": "comment", "symbols": ["blockcomment"], "postprocess": id},
    {"name": "standardcomment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment), "_"], "postprocess": d => d[0].value},
    {"name": "blockcomment", "symbols": [(lexer.has("blockcomment") ? {type: "blockcomment"} : blockcomment), "_"], "postprocess": d => d[0].value},
    {"name": "import$ebnf$1", "symbols": ["moreimport"]},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1", "moreimport"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import", "symbols": [{"literal":"import"}, "_", (lexer.has("word") ? {type: "word"} : word), "import$ebnf$1"], "postprocess": (d) => ({type: "import", path: [d[2].value, ...(d[3].map(x => x.value))]})},
    {"name": "moreimport$ebnf$1", "symbols": ["_"], "postprocess": id},
    {"name": "moreimport$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "moreimport$ebnf$2", "symbols": ["_"], "postprocess": id},
    {"name": "moreimport$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "moreimport", "symbols": ["moreimport$ebnf$1", {"literal":"."}, "moreimport$ebnf$2", (lexer.has("word") ? {type: "word"} : word)], "postprocess": d => d[3]},
    {"name": "root$ebnf$1", "symbols": ["main"]},
    {"name": "root$ebnf$1", "symbols": ["root$ebnf$1", "main"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "root", "symbols": ["root$ebnf$1"], "postprocess": d => d[0]},
    {"name": "main", "symbols": ["import"], "postprocess": id},
    {"name": "main", "symbols": ["comment"], "postprocess": id},
    {"name": "main", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": d => d[0].value}
]
  , ParserStart: "root"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
