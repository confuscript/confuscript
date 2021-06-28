export interface Config {
    /**
     * Project name
     */
    name: string;
    /**
     * Semver version
     */
    version: string;
    /**
     * Main file and method.
     * Can be overwritten by a target
     */
    main?: `${string}.${string}`;
    /**
     * Whether or not to clean the target directory before building
     * @TJS-default true
     */
    clean?: boolean;
    /**
     * Compilation targets
     */
    target: Target[];
    /**
     * List of plugins to use. By default, this is prepended by @confuscript/plugin-js.
     */
    plugins?: ConfigPlugin[];
    /**
     * Whether to append or prepend core plugins.
     * @TJS-default "prepend"
     */
    pluginMode?: "prepend" | "append";
}

export type ConfigPlugin = string | [string | any];

export type Target = NodeTarget;

export interface BaseTarget {
    /**
     * Target
     */
    target: "node";
    /**
     * The id of the target. If there are multiple targets, this will be used as the output dir name inside target/build
     */
    id: string;
    /**
     * Use a different main path
     */
    main?: `${string}.${string}`;
}

export interface NodeTarget extends BaseTarget {
    /**
     * Compiler to use. Default "builtin"
     * @TJS-default "@confuscript/plugin-js"
     */
    compiler?: "@confuscript/plugin-js" | string;
    /**
     * Node target
     */
    target: "node";
    /**
     * Whether or not to bundle to a single file
     * @TJS-default true
     */
    bundle?: boolean;
    /**
     * Whether or not to minify the output files
     * @TJS-default true
     */
    minify?: boolean;
}
