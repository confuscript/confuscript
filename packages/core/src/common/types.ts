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
    | CallGroup
    | LocalDeclaration
    | Concatenation
    | Literal
    | GrabCall
    | RunCall;

/**
 * This is for running the property value returned from the last call in the group.
 * Should only be used after a grab call that targets a runnable method
 */
export interface RunCall {
    type: "run";
    /**
     * The parameters to pass
     */
    methodParams: ActualParam[];
}

/**
 * For grabbing the property of an object.
 * This is the main call that a lot of things derive from
 */
export interface GrabCall {
    type: "grab";
    /**
     * Name of the property to grab
     */
    name: string;
    /**
     * If not grouped, location of the prop
     */
    location?: CallLocation;
}

export type CallLocation =
    | GroupedCallLocation
    | UndeterminedCallLocation
    | CurrentCallLocation
    | FormalParamCallLocation;

/**
 * Grouped call location type. This will tell the compiler to grab the property from the value returned from the last call in the group
 */
export interface GroupedCallLocation {
    type: "grouped";
}

/**
 * Use this if you are not sure where the call is coming from. The compiler will determine where this is from based on the name and context.
 * This is what the treeifier uses most of the time
 * Determined by the following order of checks:
 *  - local variable name
 *  - formal param name
 *  - class variable name
 *  - static sub-structure
 *  - imports
 */
export interface UndeterminedCallLocation {
    type: "undetermined";
    /**
     * Name of the value to find
     */
    name: string;
}

/**
 * Use this to get the value of a variable declared as a formal parameter in the current method
 * Uses the name passed from the root grab call definition
 */
export interface FormalParamCallLocation {
    type: "formal";
    /**
     * Type to expect.
     * This is optional and only to prevent accidental mistyping
     */
    expectedType?: AllTypes;
}

/**
 * Use this to grab the property from the current class instance (not static)
 */
export interface CurrentCallLocation {
    type: "current";
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
