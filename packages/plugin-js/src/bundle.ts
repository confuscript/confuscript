import { ObjectExpression, Program } from "estree";

// VVV template VVV

/*
// https://astexplorer.net/

((classes, mainclass, mainmethod) => {
	const clss = classes[mainclass];
  	if(!clss) throw new Error("No such class " + clss);

  	if(!Object.prototype.hasOwnProperty.call(clss, mainmethod)) throw new Error("Class " + mainclass + " has no such property or method" + mainmethod);

  	return clss[methodname]();
})(
  {
  	Main: class E {
      main() {

      }
    }
  },
  "Main",
  "main",
)
 */

export const makeRunBundle = (
    classes: ObjectExpression,
    mainclass: string,
    mainmethod: string,
) =>
    ({
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "CallExpression",
                    callee: {
                        type: "ArrowFunctionExpression",
                        expression: false,
                        generator: false,
                        async: false,
                        params: [
                            {
                                type: "Identifier",
                                name: "classes",
                            },
                            {
                                type: "Identifier",
                                name: "mainclass",
                            },
                            {
                                type: "Identifier",
                                name: "mainmethod",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            id: {
                                                type: "Identifier",
                                                name: "clss",
                                            },
                                            init: {
                                                type: "MemberExpression",
                                                object: {
                                                    type: "Identifier",
                                                    name: "classes",
                                                },
                                                property: {
                                                    type: "Identifier",
                                                    name: "mainclass",
                                                },
                                                computed: true,
                                                optional: false,
                                            },
                                        },
                                    ],
                                    kind: "const",
                                },
                                {
                                    type: "IfStatement",
                                    test: {
                                        type: "UnaryExpression",
                                        operator: "!",
                                        prefix: true,
                                        argument: {
                                            type: "Identifier",
                                            name: "clss",
                                        },
                                    },
                                    consequent: {
                                        type: "ThrowStatement",
                                        argument: {
                                            type: "NewExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "Error",
                                            },
                                            arguments: [
                                                {
                                                    type: "BinaryExpression",
                                                    left: {
                                                        type: "Literal",
                                                        value: "No such class ",
                                                        raw: '"No such class "',
                                                    },
                                                    operator: "+",
                                                    right: {
                                                        type: "Identifier",
                                                        name: "clss",
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    alternate: null,
                                },
                                {
                                    type: "IfStatement",
                                    test: {
                                        type: "UnaryExpression",
                                        operator: "!",
                                        prefix: true,
                                        argument: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "MemberExpression",
                                                object: {
                                                    type: "MemberExpression",
                                                    object: {
                                                        type: "MemberExpression",
                                                        object: {
                                                            type: "Identifier",
                                                            name: "Object",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "prototype",
                                                        },
                                                        computed: false,
                                                        optional: false,
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "hasOwnProperty",
                                                    },
                                                    computed: false,
                                                    optional: false,
                                                },
                                                property: {
                                                    type: "Identifier",
                                                    name: "call",
                                                },
                                                computed: false,
                                                optional: false,
                                            },
                                            arguments: [
                                                {
                                                    type: "Identifier",
                                                    name: "clss",
                                                },
                                                {
                                                    type: "Identifier",
                                                    name: "mainmethod",
                                                },
                                            ],
                                            optional: false,
                                        },
                                    },
                                    consequent: {
                                        type: "ThrowStatement",
                                        argument: {
                                            type: "NewExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "Error",
                                            },
                                            arguments: [
                                                {
                                                    type: "BinaryExpression",
                                                    left: {
                                                        type: "BinaryExpression",
                                                        left: {
                                                            type: "BinaryExpression",
                                                            left: {
                                                                type: "Literal",
                                                                value: "Class ",
                                                                raw: '"Class "',
                                                            },
                                                            operator: "+",
                                                            right: {
                                                                type: "Identifier",
                                                                name: "mainclass",
                                                            },
                                                        },
                                                        operator: "+",
                                                        right: {
                                                            type: "Literal",
                                                            value: " has no such property or method",
                                                            raw: '" has no such property or method"',
                                                        },
                                                    },
                                                    operator: "+",
                                                    right: {
                                                        type: "Identifier",
                                                        name: "mainmethod",
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    alternate: null,
                                },
                                {
                                    type: "ReturnStatement",
                                    argument: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "MemberExpression",
                                            object: {
                                                type: "Identifier",
                                                name: "clss",
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "methodname",
                                            },
                                            computed: true,
                                            optional: false,
                                        },
                                        arguments: [],
                                        optional: false,
                                    },
                                },
                            ],
                        },
                    },
                    arguments: [
                        classes,
                        {
                            type: "Literal",
                            value: mainclass,
                            raw: `"${mainclass}"`,
                        },
                        {
                            type: "Literal",
                            value: mainmethod,
                            raw: `"${mainmethod}"`,
                        },
                    ],
                    optional: false,
                },
            },
        ],
        sourceType: "module",
    } as Program);
