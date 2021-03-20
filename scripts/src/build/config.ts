export default interface BuildConfig {
    /**
     * Whether or not to enable the windows terminal when on windows and in dev mode
     * @TJS-default false
     */
    enableTerminal?: boolean;
    /**
     * Platforms to support and build commands for
     */
    allowedTargets: ("win" | "linux")[];
    /**
     * The commands to run.
     * Will run in the order found.
     */
    commands: Command[];
    /**
     * What to prefix package names with
     * @TJS-default ""
     */
    packagePrefix: string;
}

export type Command = TSBuildCommand | CustomBuildCommand;

/**
 * Base build command
 */
export interface BuildCommand {
    /**
     * The type of build
     * Currently implemented:
     *  - typescript
     *  - custom
     * Unimplemented:
     *  - snowpack
     *  - storybook
     */
    type: "typescript" | "custom" | "snowpack" | "storybook";
    /**
     * Environments to run in
     */
    runInEnvironments?: ("dev" | "prod")[];
}

/**
 * Typescript build information
 */
export interface TSBuildCommand extends BuildCommand {
    /**
     * The type of build
     */
    type: "typescript";
    /**
     * Whether or not to use an alternate config
     */
    useAlternateConfig: boolean;
    /**
     * Relative path to the alternate config
     */
    alternateConfig: string;
    /**
     * The name of the package/workspace to give yarn
     */
    package: string;
}

export interface CustomBuildCommand extends BuildCommand {
    /**
     * The type of build
     */
    type: "custom";
    /**
     * The name of the package/workspace to give yarn
     */
    package: string;
    /**
     * The command to run in that workspace
     */
    command: string;
}
