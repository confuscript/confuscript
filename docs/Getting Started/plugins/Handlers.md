# Handlers

This file documents every handler

## Node Handlers

### ClassDefinition

params: [node, body]

- node: [ClassDefinition](/packages/ast/src/structures/class.ts)
- body: (data returned from [ClassBody](/packages/ast/src/structures/class.ts) based handlers)[]

returns: any

### ClassVariableDefinition

params: [node]

- node: [ClassVariableDefinition](/packages/ast/src/structures/variable.ts)

returns: any

### FormalParameter

params: [node]

- node: [FormalParameter](/packages/ast/src/structures/class/method.ts)

returns: any

### ClassMethodDefinition

params: [node, body, params]

- node: [ClassMethodDefinition](/packages/ast/src/structures/class/method.ts)
- body: (data returned from [MethodBody](/packages/ast/src/structures/class/method.ts) based
  handlers)[]
- params: (data returned from your [FormalParameter Node Handler](#formalparameter))

returns: any

## Logic Handlers

### MethodApplication

params: [class, method]

- class: (data returned from your [ClassDefinition Node Handler](#classdefinition))
- method: (data returned from your [ClassMethodDefinition Node Handler](#classmethoddefinition))

returns: void
