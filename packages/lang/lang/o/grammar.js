// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require("moo");

    const lex = moo.compile({
        s: /[\ \t]+/,
        cw: /[A-z]+/,
        cwn: /[A-z0-9]+/,
        nl: { match: /\n/, lineBreaks: true },
        rnl: { match: /\r\n/, lineBreaks: true },

        //common
        stringdouble: /"/,
        stringsingle: /'/,

        openbody: /{$/,
        closebody: /}$/,

        means: ":",
        broitended: /\;$/,

        pub: "public",

        opensub: "(",
        closesub: ")",

        //class
        class: "class",

        //values
        ambiguous: "any",
        string: "string",
        nothing: "void",
        comment: "//",

        //random
        dot: ".",
        hash: "#",
        theresMore: ",",
        maybeLiteral: /\#/,
        anysymbol: /[\-\_\=\+\[\{\]\}\:\@\~\<\>\/\?\`\!\£\$\%\^\&\*\9\\\|]+/,

        run: "run",
        node: "node",
        java: "java",
    });

    function undef() {
        return undefined;
    }

    function idpipe(d) {
        return [d[0], ...d[1]];
    }

    function idval(d) {
        return d[0].value;
    }
var grammar = {
    Lexer: lex,
    ParserRules: [
    {"name": "stringmark", "symbols": [(lex.has("stringdouble") ? {type: "stringdouble"} : stringdouble)]},
    {"name": "stringmark", "symbols": [(lex.has("stringsingle") ? {type: "stringsingle"} : stringsingle)]},
    {"name": "import$ebnf$1$subexpression$1", "symbols": [(lex.has("w") ? {type: "w"} : w)], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$1", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$1", "symbols": [{"literal":"."}], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$1", "symbols": [{"literal":"#"}], "postprocess": idval},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1$subexpression$1"]},
    {"name": "import$ebnf$1$subexpression$2", "symbols": [(lex.has("w") ? {type: "w"} : w)], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$2", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$2", "symbols": [{"literal":"."}], "postprocess": idval},
    {"name": "import$ebnf$1$subexpression$2", "symbols": [{"literal":"#"}], "postprocess": idval},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1", "import$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import", "symbols": [{"literal":"import"}, (lex.has("s") ? {type: "s"} : s), "stringmark", "import$ebnf$1", "stringmark"], "postprocess": (d) => { return { type: "rootimport", location: d[3].join("") } }},
    {"name": "types", "symbols": [{"literal":"any"}], "postprocess": (d) => { return { type: "type", is: "any" } }},
    {"name": "types", "symbols": [{"literal":"string"}], "postprocess": (d) => { return { type: "type", is: "string" } }},
    {"name": "types", "symbols": [{"literal":"void"}], "postprocess": (d) => { return { type: "type", is: "void" } }},
    {"name": "values$ebnf$1", "symbols": ["anythingReally"]},
    {"name": "values$ebnf$1", "symbols": ["values$ebnf$1", "anythingReally"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "values", "symbols": ["stringmark", "values$ebnf$1", "stringmark"], "postprocess": (d) => { return [{ type: "string", value: d[1].join("") }] }},
    {"name": "anythingReally", "symbols": [(lex.has("cwn") ? {type: "cwn"} : cwn)], "postprocess": (d) => {return d[0].value}},
    {"name": "anythingReally", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": (d) => {return d[0].value}},
    {"name": "anythingReally", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": (d) => {return d[0].value}},
    {"name": "anyWordReally", "symbols": [(lex.has("cwn") ? {type: "cwn"} : cwn)], "postprocess": (d) => {return d[0].value}},
    {"name": "anyWordReally", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnything", "symbols": [(lex.has("cwn") ? {type: "cwn"} : cwn)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnything", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnything", "symbols": [(lex.has("anysymbol") ? {type: "anysymbol"} : anysymbol)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnything", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnything", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("rnl") ? {type: "rnl"} : rnl)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("broitended") ? {type: "broitended"} : broitended)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("dot") ? {type: "dot"} : dot)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("opensub") ? {type: "opensub"} : opensub)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("closesub") ? {type: "closesub"} : closesub)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": [(lex.has("theresMore") ? {type: "theresMore"} : theresMore)], "postprocess": idval},
    {"name": "literallyAnything", "symbols": ["stringmark"], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("cwn") ? {type: "cwn"} : cwn)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("cw") ? {type: "cw"} : cw)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("anysymbol") ? {type: "anysymbol"} : anysymbol)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": (d) => {return d[0].value}},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("broitended") ? {type: "broitended"} : broitended)], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("dot") ? {type: "dot"} : dot)], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("opensub") ? {type: "opensub"} : opensub)], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("closesub") ? {type: "closesub"} : closesub)], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": [(lex.has("theresMore") ? {type: "theresMore"} : theresMore)], "postprocess": idval},
    {"name": "literallyAnythingButLine", "symbols": ["stringmark"], "postprocess": idval},
    {"name": "injectvar", "symbols": [{"literal":"#"}, {"literal":"{"}, "anyWordReally", {"literal":"}"}, {"literal":"#"}], "postprocess": (d) => { return { type: "injectvar", var: d[2] } }},
    {"name": "comment$ebnf$1", "symbols": ["literallyAnythingButLine"]},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", "literallyAnythingButLine"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment", "symbols": [{"literal":"//"}, "comment$ebnf$1"], "postprocess": (d) => { return d.join("") }},
    {"name": "methods$ebnf$1", "symbols": ["methodbody"]},
    {"name": "methods$ebnf$1", "symbols": ["methods$ebnf$1", "methodbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "methods", "symbols": [(lex.has("cw") ? {type: "cw"} : cw), "methodargs", {"literal":":"}, (lex.has("s") ? {type: "s"} : s), "types", (lex.has("s") ? {type: "s"} : s), {"literal":"{"}, "methods$ebnf$1", {"literal":"}"}], "postprocess": (d) => { return { type: "method", name: d[0].value, public: false, returns: d[4], body: d[7] } }},
    {"name": "methods$ebnf$2", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "methods$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "methods$ebnf$3", "symbols": ["methodbody"]},
    {"name": "methods$ebnf$3", "symbols": ["methods$ebnf$3", "methodbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "methods", "symbols": [{"literal":"public"}, (lex.has("s") ? {type: "s"} : s), (lex.has("cw") ? {type: "cw"} : cw), "methodargs", {"literal":":"}, "methods$ebnf$2", "types", (lex.has("s") ? {type: "s"} : s), {"literal":"{"}, "methods$ebnf$3", {"literal":"}"}], "postprocess": (d) => { return { type: "method", name: d[2].value, public: true, returns: d[6], body: d[9] } }},
    {"name": "methodbody", "symbols": ["call"], "postprocess": id},
    {"name": "methodbody", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": idval},
    {"name": "methodbody", "symbols": [(lex.has("rnl") ? {type: "rnl"} : rnl)], "postprocess": idval},
    {"name": "methodbody", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": idval},
    {"name": "methodbody", "symbols": ["comment"], "postprocess": idval},
    {"name": "call$ebnf$1", "symbols": []},
    {"name": "call$ebnf$1", "symbols": ["call$ebnf$1", "callextra"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "call$ebnf$2", "symbols": []},
    {"name": "call$ebnf$2$subexpression$1$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "call$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call$ebnf$2$subexpression$1$ebnf$2", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "call$ebnf$2$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call$ebnf$2$subexpression$1", "symbols": ["call$ebnf$2$subexpression$1$ebnf$1", {"literal":","}, "call$ebnf$2$subexpression$1$ebnf$2", "values"]},
    {"name": "call$ebnf$2", "symbols": ["call$ebnf$2", "call$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "call$ebnf$3", "symbols": [{"literal":";"}], "postprocess": id},
    {"name": "call$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call", "symbols": [(lex.has("cw") ? {type: "cw"} : cw), "call$ebnf$1", {"literal":"("}, "values", "call$ebnf$2", {"literal":")"}, "call$ebnf$3"], "postprocess": (d) => { return { type: "call", calls: [d[0].value, ...d[1]], values: [...d[3], ...d[4]]} }},
    {"name": "callextra", "symbols": [{"literal":"."}, (lex.has("cw") ? {type: "cw"} : cw)], "postprocess": (d) => { return d[1].value }},
    {"name": "methodargs$ebnf$1", "symbols": ["methodargbits"], "postprocess": id},
    {"name": "methodargs$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "methodargs", "symbols": [{"literal":"("}, "methodargs$ebnf$1", {"literal":")"}], "postprocess": (d) => { return d[1] }},
    {"name": "methodargbits$ebnf$1", "symbols": []},
    {"name": "methodargbits$ebnf$1", "symbols": ["methodargbits$ebnf$1", "extraargs"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "methodargbits", "symbols": ["methodarg", "methodargbits$ebnf$1"], "postprocess": (d) => { return [d[0], ...d[1]] }},
    {"name": "extraargs$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "extraargs$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extraargs$ebnf$2", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "extraargs$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extraargs", "symbols": ["extraargs$ebnf$1", {"literal":","}, "extraargs$ebnf$2", "methodarg"], "postprocess": (d) => { return d[3] }},
    {"name": "methodarg$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "methodarg$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "methodarg", "symbols": ["anyWordReally", {"literal":":"}, "methodarg$ebnf$1", "types"], "postprocess": (d) => { return { type: "methodarg", name: d[0], type: d[3] } }},
    {"name": "methodconstructor$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "methodconstructor$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "methodconstructor$ebnf$2", "symbols": ["methodbody"]},
    {"name": "methodconstructor$ebnf$2", "symbols": ["methodconstructor$ebnf$2", "methodbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "methodconstructor", "symbols": [(lex.has("cw") ? {type: "cw"} : cw), "methodargs", "methodconstructor$ebnf$1", {"literal":"{"}, "methodconstructor$ebnf$2", {"literal":"}"}], "postprocess": (d) => { return { type: "constructor", name: d[0].value, body: d[4] } }},
    {"name": "injectMethods$ebnf$1", "symbols": ["inject"]},
    {"name": "injectMethods$ebnf$1", "symbols": ["injectMethods$ebnf$1", "inject"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "injectMethods", "symbols": [(lex.has("cw") ? {type: "cw"} : cw), "methodargs", {"literal":":"}, (lex.has("s") ? {type: "s"} : s), "types", (lex.has("s") ? {type: "s"} : s), {"literal":"#"}, {"literal":"#"}, {"literal":"{"}, "injectMethods$ebnf$1", {"literal":"}"}, {"literal":"#"}, {"literal":"#"}], "postprocess": (d) => { return { type: "inject", name: d[0].value, public: false, returns: d[4], body: d[11] } }},
    {"name": "injectMethods$ebnf$2", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "injectMethods$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "injectMethods$ebnf$3", "symbols": ["injectbody"]},
    {"name": "injectMethods$ebnf$3", "symbols": ["injectMethods$ebnf$3", "injectbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "injectMethods", "symbols": [{"literal":"public"}, (lex.has("s") ? {type: "s"} : s), (lex.has("cw") ? {type: "cw"} : cw), "methodargs", {"literal":":"}, "injectMethods$ebnf$2", "types", (lex.has("s") ? {type: "s"} : s), {"literal":"#"}, {"literal":"#"}, {"literal":"{"}, "injectMethods$ebnf$3", {"literal":"}"}, {"literal":"#"}, {"literal":"#"}], "postprocess": (d) => { return { type: "inject", name: d[2].value, public: true, returns: d[6], body: d[11] } }},
    {"name": "injectbody", "symbols": ["runinject"], "postprocess": id},
    {"name": "injectbody", "symbols": ["nodeinject"], "postprocess": id},
    {"name": "injectbody", "symbols": ["javainject"], "postprocess": id},
    {"name": "injectbody", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": idval},
    {"name": "injectbody", "symbols": [(lex.has("rnl") ? {type: "rnl"} : rnl)], "postprocess": idval},
    {"name": "injectbody", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": idval},
    {"name": "runinject$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "runinject$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "runinject$ebnf$2", "symbols": ["injectmbody"]},
    {"name": "runinject$ebnf$2", "symbols": ["runinject$ebnf$2", "injectmbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "runinject", "symbols": [{"literal":"run"}, "runinject$ebnf$1", {"literal":"{"}, "runinject$ebnf$2", {"literal":"}"}], "postprocess": (d) => { return { type: "runinject", value: d[3] } }},
    {"name": "nodeinject$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "nodeinject$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "nodeinject$ebnf$2", "symbols": ["injectmbody"]},
    {"name": "nodeinject$ebnf$2", "symbols": ["nodeinject$ebnf$2", "injectmbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nodeinject", "symbols": [{"literal":"node"}, "nodeinject$ebnf$1", {"literal":"{"}, "nodeinject$ebnf$2", {"literal":"}"}], "postprocess": (d) => { return { type: "nodeinject", value: d[3] } }},
    {"name": "javainject$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "javainject$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "javainject$ebnf$2", "symbols": ["injectmbody"]},
    {"name": "javainject$ebnf$2", "symbols": ["javainject$ebnf$2", "injectmbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "javainject", "symbols": [{"literal":"java"}, "javainject$ebnf$1", {"literal":"{"}, "javainject$ebnf$2", {"literal":"}"}], "postprocess": (d) => { return { type: "javainject", value: d[3] } }},
    {"name": "injectmbody", "symbols": ["injectvar"], "postprocess": id},
    {"name": "injectmbody", "symbols": ["literallyAnything"], "postprocess": id},
    {"name": "rootclass$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "rootclass$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$2", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$3", "symbols": ["classbody"]},
    {"name": "rootclass$ebnf$3", "symbols": ["rootclass$ebnf$3", "classbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rootclass$ebnf$4", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass", "symbols": [{"literal":"class"}, (lex.has("s") ? {type: "s"} : s), (lex.has("cw") ? {type: "cw"} : cw), "rootclass$ebnf$1", {"literal":"{"}, "rootclass$ebnf$2", "rootclass$ebnf$3", "rootclass$ebnf$4", {"literal":"}"}], "postprocess": (d) => { return { type: "rootclass", name: d[2].value, body: d[6], public: false } }},
    {"name": "rootclass$ebnf$5", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "rootclass$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$6", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$7", "symbols": ["classbody"]},
    {"name": "rootclass$ebnf$7", "symbols": ["rootclass$ebnf$7", "classbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rootclass$ebnf$8", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass", "symbols": [{"literal":"public"}, (lex.has("s") ? {type: "s"} : s), {"literal":"class"}, (lex.has("s") ? {type: "s"} : s), (lex.has("cw") ? {type: "cw"} : cw), "rootclass$ebnf$5", {"literal":"{"}, "rootclass$ebnf$6", "rootclass$ebnf$7", "rootclass$ebnf$8", {"literal":"}"}], "postprocess": (d) => { return { type: "rootclass", name: d[4].value, body: d[8], public: true } }},
    {"name": "classbody", "symbols": ["methods"], "postprocess": id},
    {"name": "classbody", "symbols": ["injectMethods"], "postprocess": id},
    {"name": "classbody", "symbols": ["methodconstructor"], "postprocess": id},
    {"name": "classbody", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": idval},
    {"name": "classbody", "symbols": [(lex.has("rnl") ? {type: "rnl"} : rnl)], "postprocess": idval},
    {"name": "classbody", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": idval},
    {"name": "classbody", "symbols": ["comment"], "postprocess": idval},
    {"name": "root$ebnf$1", "symbols": ["main"]},
    {"name": "root$ebnf$1", "symbols": ["root$ebnf$1", "main"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "root", "symbols": ["root$ebnf$1"], "postprocess": id},
    {"name": "main", "symbols": ["rootclass"], "postprocess": id},
    {"name": "main", "symbols": ["import"], "postprocess": id},
    {"name": "main", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": idval},
    {"name": "main", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": idval},
    {"name": "main", "symbols": [(lex.has("rnl") ? {type: "rnl"} : rnl)], "postprocess": idval},
    {"name": "main", "symbols": ["comment"], "postprocess": idval}
]
  , ParserStart: "root"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
