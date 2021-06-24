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
     * Main file.
     * Can be overwritten by a target
     */
    main: string;
    /**
     * Compilation targets
     */
    target: Target[];
}

export type Target = NodeTarget;

export interface BaseTarget {
    /**
     * Target
     */
    target: "node";
}

export interface NodeTarget extends BaseTarget {
    /**
     * Compiler to use. Default "builtin"
     * @TJS-default "builtin"
     */
    compiler: "builtin" | string;
    /**
     * Node target
     */
    target: "node";
    /**
     * Whether or not to bundle to a single file
     * @TJS-default true
     */
    bundle: boolean;
    /**
     * If bundling is enabled, this acts as the out file,
     * if bundling is disabled, this acts as the out dir
     * @TJS-default "dist"
     */
    out: string;
}