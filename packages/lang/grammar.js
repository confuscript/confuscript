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
        ".", "{", "}"
        ]

    const rules = {
        word: {
            match: /[A-Za-z0-9]+/,
            lineBreaks: true,
            next: "main"
        },
        sentence:{
            match: /[A-Za-z0-9\s\t\S]/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(l)
    }

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


    append({
        ...literals(["import"])
    })


    append({
        ws: {
            match: /\s+/,
            lineBreaks: true,
            next: "main"
        },
        ...literals(["class"])
    })


    append({
        ...literals([":", "="])
    })


    append({
        stringmark: {
            match: /("|')/,
            lineBreaks: true,
            next: "main"
        }
        ...literals(["string"])
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
    {"name": "valuetype", "symbols": [{"literal":"string"}]},
    {"name": "valuetype", "symbols": [{"literal":"int"}]},
    {"name": "valuetype", "symbols": [{"literal":"boolean"}]},
    {"name": "value", "symbols": [(lexer.has("stringmark") ? {type: "stringmark"} : stringmark), (lexer.has("sentence") ? {type: "sentence"} : sentence), (lexer.has("stringmark") ? {type: "stringmark"} : stringmark)]},
    {"name": "classvariable", "symbols": [(lexer.has("word") ? {type: "word"} : word), "variabletype", "variableassign"], "postprocess": (d) => ({type: "classvariable", type: d[1], value: d[3]})},
    {"name": "variabletype$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variabletype$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variabletype$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variabletype$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variabletype", "symbols": ["variabletype$ebnf$1", {"literal":":"}, "variabletype$ebnf$2", "valuetype"], "postprocess": (d) => d[3]},
    {"name": "variableassign$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variableassign$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variableassign$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variableassign$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variableassign", "symbols": ["variableassign$ebnf$1", {"literal":"="}, "variableassign$ebnf$2", "value"], "postprocess": (d) => d[3]},
    {"name": "class$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "class$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "class$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "class$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "class$ebnf$3", "symbols": []},
    {"name": "class$ebnf$3", "symbols": ["class$ebnf$3", "classbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "class", "symbols": [{"literal":"class"}, "class$ebnf$1", (lexer.has("word") ? {type: "word"} : word), "class$ebnf$2", {"literal":"{"}, "class$ebnf$3", {"literal":"}"}], "postprocess": d => ({ type: "class", name: d[2].value, content: d[5] })},
    {"name": "classbody", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": d => d[0].value},
    {"name": "classbody", "symbols": ["classvariable"], "postprocess": id},
    {"name": "root$ebnf$1", "symbols": ["main"]},
    {"name": "root$ebnf$1", "symbols": ["root$ebnf$1", "main"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "root", "symbols": ["root$ebnf$1"], "postprocess": d => d[0]},
    {"name": "main", "symbols": ["import"], "postprocess": id},
    {"name": "main", "symbols": ["class"], "postprocess": id},
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
