@{%
    append({
        ...literals([":", "="])
    })
%}

@lexer lexer

@include "../util/value.ne"

classvariable -> %word variabletype variableassign {% (d) => ({type: "classvariable", type: d[1], value: d[3]}) %} # typed

variabletype -> %ws:? ":" %ws:? valuetype {% (d) => d[3] %}

variableassign -> %ws:? "=" %ws:? value {% (d) => d[3] %}