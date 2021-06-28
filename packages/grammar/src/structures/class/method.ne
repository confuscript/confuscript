@{%
    append({
        ...literals([","])
    })
%}

@lexer lexer

@include "../../util/value.ne"

classmethod -> %word "(" %ws:? parameters:? %ws:? ")" %ws:? "{" methodbody:+ "}" {% (d) => ({ type: "ClassMethodDefinition", name: d[0], parameters: d[3] , content: d[8] }) %}

parameters -> param moreparameters:* %ws:? ",":? {% (d) => [d[0], ...(d[1] ?? [])] %}

moreparameters -> %ws:? "," %ws:? param {% (d) => d[3] %}

param -> %word %ws:? ":" %ws:? valuetype {% (d) => ({ type: "FormalParameter", name: d[0], value: { type: d[4] } }) %}



methodbody -> %ws {%d => d[0].value%}