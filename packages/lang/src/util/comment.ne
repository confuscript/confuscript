@{%
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
%}

@lexer lexer

@include "./spaces.ne"

comment -> standardcomment
    | blockcomment

standardcomment -> %comment _

blockcomment -> %blockcomment _