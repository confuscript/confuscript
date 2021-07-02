export type LogicHandler<Type extends LogicTypes> = (
    ...args: (AllLogic & { type: Type })["parameters"]
) => unknown;

export type AllLogic = MethodApplication;
export type LogicTypes = AllLogic["type"];

/**
 * parameters: [class, method]
 */
export interface MethodApplication {
    type: "MethodApplication";
    parameters: [any, any];
}
