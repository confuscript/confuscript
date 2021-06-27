@{%
    append({
        ...literals([":", "="])
    })
%}

@lexer lexer

@include "../util/value.ne"

classvariable -> %word variabletype variableassign:? ";" {% (d) => ({type: "ClassVariableDefinition", name: d[0], value: {type: d[1], value: d[2]}}) %} # typed

variabletype -> %ws:? ":" %ws:? valuetype {% (d) => d[3] %}

variableassign -> %ws:? "=" %ws:? value {% (d) => d[3] %}
