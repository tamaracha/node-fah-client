export function listByFilter(level?: string | undefined, slot?: number | undefined): Command<Options>;
export function listByNames(names: string[], slot?: number | undefined): Command<Options>;
export function update(options: object, slot?: number | undefined): Command<Options>;
export type Options = {
    user?: string;
    team?: string;
};
import { Command } from "./command.js";
