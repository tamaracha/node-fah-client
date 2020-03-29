export type slotTypes = string;
export namespace slotTypes {
    export const cpu: string;
    export const gpu: string;
    export const smp: string;
}
export function list(): Command<Slot[]>;
export function create(type: string): Command<string>;
export function update(slot: number, type: string): Command<Slot>;
export function destroy(slot: number): Command<string>;
export type Slot = {
    id: string;
    description: string;
    type: string;
    idle: boolean;
    options: import("./options.js").Options;
    reason: string;
};
import { Command } from "./command.js";
