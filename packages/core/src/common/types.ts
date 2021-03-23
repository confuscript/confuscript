export type Types =
    | "string"
    | "byte"
    | "int"
    | "short"
    | "float"
    | "double"
    | "long"
    | "boolean";

export type AllTypes =
    | Types
    | {
          /**
           * Set to true if the type represents a structure e.g. instance of a class
           */
          isStructure: true;
          /**
           * Path to the constructor. If its an instance of the class, this should just be the path e.g. confused.logger.Logger
           */
          structurePath: string;
      };

export interface FormalParam {
    name: string;
    type: AllTypes;
}

export interface ActualParam extends FormalParam {
    value: Call;
}

export type RunnableContent = Call[];

export type Call =
    | StaticCall
    | InstanceCall
    | AccessorCall
    | CallGroup
    | LocalDeclaration
    | LocalAccessorCall
    | Concatenation
    | Literal;

/**
 * Calling a method, variable modifier/accessor, etc on a static structure. e.g. info(message: string) on confused.logger.Logger
 */
export interface StaticCall {
    type: "static";
    /**
     * should match the format: path.to.Structure#methodName or path.to.Structure#staticVariable. When doing it to a static variable, must be within a group call with the first being this and the second being an accessor call
     */
    staticpath: string;
    /**
     * type of static call
     */
    statictype: "method" | "variable";
    /**
     * Method params if static call type is method
     */
    methodparams?: Call[];
}

/**
 * Calling a method, variable modifier/accessor, etc on an instance
 * this should always be second in a group call when using it on a variable with the first being an accessor call
 */
export interface InstanceCall {
    type: "instance";
    /**
     * Path to the instance. Usually a group of accessor calls
     * If set to {type: "this"} it will grab the method from the current instance
     */
    instpath: { type: "this" } | CallGroup;
    /**
     * Name of the instanced method
     */
    methodName: string;
    /**
     * Method params
     */
    methodparams: Call[];
}

/**
 * For getting the value of/modifying an instanced variable
 */
export interface AccessorCall {
    type: "accessor";
    /**
     * Name of the variable
     * Should always be declarfed unless the location is set to grouped
     */
    name?: string;
    /**
     * Type of accessor or modifier
     */
    accessortype: "get" | "increment" | "decrement" | "set";
    /**
     * Location of the instanced variable
     * current - get from the current structure
     * grouped - get from the value returned from the last call in a group
     */
    location: "current" | "grouped";
}

/**
 * For getting the value of/modifying a variable declared in the current method
 */
export interface LocalAccessorCall {
    type: "localaccessor";
    /**
     * Name of the variable in the local method context
     */
    name: string;
    /**
     * Type of accessor or modifier
     */
    accessortype: "get" | "increment" | "decrement" | "set";
    /**
     * If the variable is a parameter passed to the method
     * @default false
     */
    formalParam?: boolean;
}

/**
 * For declaring a variable in the current method
 */
export interface LocalDeclaration {
    type: "localdeclaration";
    /**
     * Name of the variable to declared
     */
    name: string;
    /**
     * Type of the variable
     */
    vartype: AllTypes;
}

/**
 * For chaining calls.
 * Used for example when you are assigning `new SomeClass().someMethod()` to a variable but can be used anywhere and is used by some other call types' state
 */
export interface CallGroup {
    type: "group";
    /**
     * Grouped calls
     */
    calls: Call[];
}

/**
 * For concatenating values
 */
export interface Concatenation {
    type: "concat";
    /**
     * Call to start concatenating from
     */
    initial: Call;
    /**
     * Calls to concatenate onto the end
     */
    append: Call[];
}

/**
 * For defining literal values
 */
export interface Literal {
    type: "literal";
    /**
     * Literal type
     */
    ltype: Types;
    /**
     * The value as a string
     * This will be parsed into an actual value by the compiler
     */
    value: string;
}
