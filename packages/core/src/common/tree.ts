import { AllTypes, Call, FormalParam, RunnableContent } from "./types";

export default interface Tree {
    /**
     * The name of this should follow the format of an import (e.g. some.import.Path)
     */
    [k: string]: TreeTypes;
}

export type TreeTypes = TreeClass;

/**
 * public = Accessible anywhere (respecting context)
 * module = Accessible inside the project package (e.g. projectname or src/projectname)
 * protected = Accessible inside the package (e.g. projectname.logger.Logger is accessible from structures inside projectname.logger but not projectname.util)
 * private = Accessibly only inside the same structure
 */
export type TreePartAccessorType =
    | "public"
    | "module"
    | "protected"
    | "private";

export interface TreeClass {
    /**
     * Class type of tree element
     */
    type: "class";
    /**
     * Whether or not its constructable
     */
    constructable: boolean;
    /**
     * If this is a special class
     * None - not special
     * Global - This class has a static instance which is able to be accessed anywhere without importing - It has one property which should just be the name of a static variable on the class with the type of the class that has not been initialised to the compiler can automatically initialise it depending on the context
     * Static-based - This doesn't really affect anything but should be used when a class has no constructors and shouldn't be initialised. Some compilers will not utilise certain instance based helper functions with this special type
     * @default "none"
     */
    special?: "none" | "global" | "static-based";
    /**
     * Any properties to link with the special type
     */
    specialProps?: (string | number)[];
    /**
     * Class content
     */
    content: {
        /**
         * Name
         */
        name: string;
        /**
         * Array of static variables declared in the class
         */
        staticVars?: StaticTreeClassVariable[];
        /**
         * Array of variables declared in the class
         */
        vars: TreeClassVariable[];
        /**
         * Constructors, if constructable
         */
        constructors?: TreeClassConstructor[];
        /**
         * Methods in the class
         */
        methods: TreeClassMethod[];
        /**
         * Static methods in the class
         */
        staticMethods?: StaticTreeClassMethod[];
    };
}

export interface TreeClassVariable {
    /**
     * Variable name
     */
    name: string;
    /**
     * Accessibility of the variable
     */
    accessibility: TreePartAccessorType;
    /**
     * Variable type
     */
    type: AllTypes;
    /**
     * Initial value of the variable. These calls are processed when the class is constructed
     */
    initially?: "null" | Call;
}

export interface StaticTreeClassVariable {
    /**
     * Static variable name
     */
    name: string;
    /**
     * Accessibility of the static variable
     */
    accessibility: TreePartAccessorType;
    /**
     * Static variable type
     */
    type: AllTypes;
    /**
     * Initial value of the static variable. These calls are processed when the program starts up and before the main method or exports are processed
     */
    initially?: "null" | Call;
}

export interface TreeClassConstructor {
    /**
     * Constructor params
     * This is what uniquely identifies it
     */
    params: FormalParam[];
    /**
     * Accessibility of the constructor
     */
    accessibility: TreePartAccessorType;
    /**
     * Content of the constructor (the calls it makes)
     */
    content?: RunnableContent;
    /**
     * Whether or not the constructor is aided by the compiler and has no set content
     */
    compiled: boolean;
}

export interface TreeClassMethod {
    /**
     * Method name
     */
    name: string;
    /**
     * Accessibility of the method
     * default "public"
     */
    accessibility?: TreePartAccessorType;
    /**
     * The parameters that it requires.
     * This is what uniquely identifies it amongst methods of the same name
     */
    params: FormalParam[];
    /**
     * What type the method returns
     */
    returns: AllTypes | "void";
    /**
     * Content of the method (the calls it makes)
     */
    content?: RunnableContent;
    /**
     * Whether or not the method is aided by the compiler and has no set content
     * default false
     */
    compiled?: boolean;
}

export interface StaticTreeClassMethod {
    /**
     * Static method name
     */
    name: string;
    /**
     * Accessibility of the static method
     * default "public"
     */
    accessibility?: TreePartAccessorType;
    /**
     * The parameters that it requires.
     * This is what uniquely identifies it amongst static methods of the same name
     */
    params: FormalParam[];
    /**
     * What type the static method returns
     */
    returns: AllTypes | "void";
    /**
     * Content of the static method (the calls it makes)
     */
    content?: RunnableContent;
    /**
     * Whether or not the static method is aided by the compiler and has no set content
     * default false
     */
    compiled?: boolean;
}
