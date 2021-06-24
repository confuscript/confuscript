@{%
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
%}

@lexer lexer

@include "./spaces.ne"

comment -> standardcomment {%id%}
    | blockcomment {%id%}

standardcomment -> %comment _ {%d => d[0].value%}

blockcomment -> %blockcomment _ {%d => d[0].value%}
