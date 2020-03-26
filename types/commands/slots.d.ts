/**
 * An enum containing the possible slot type names
 */
export type slotTypes = string;
export namespace slotTypes {
    export const cpu: string;
    export const gpu: string;
    export const smp: string;
}
export function list(): import("./helpers.js").Command;
export function create(type: string): import("./helpers.js").Command;
export function update(slot: number, type: string): import("./helpers.js").Command;
export function destroy(slot: number): import("./helpers.js").Command;
