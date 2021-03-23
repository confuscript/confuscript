export interface ProjectConfig {
    /**
     * Project name
     */
    name: string;
    /**
     * Project version (semver)
     */
    version: string;
    /**
     * Main entrypoint file
     * This can be overridden in individual compilation rules
     */
    main: string;
    /**
     * Compilation information
     */
    compilation: Compilation[];
}

export interface Compilation {
    /**
     * Compiler to use
     * @TJS-default builtin
     */
    compiler?: string;
    /**
     * Platform target
     * Native currently not implemented
     */
    target: "node" | "java" | "native";
    /**
     * File entrypoint
     * @TJS-default main@project.config
     */
    main?: string;
    /**
     * Whether to bundle to a single file
     * Only applies to the node target (however some 3rd party compilers might support it)
     * @TJS-default false
     */
    bundle?: boolean;
    /**
     * Relative path to output to
     * @TJS-default dist
     */
    out: string;
}
