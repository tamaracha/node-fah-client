export function list(): Command<string>;
export function create<R>(id: number, rate: number, payload: Command<R>): Command<string>;
export function clear(): Command<string>;
export function destroy(id: number): Command<string>;
import { Command } from "./command.js";
