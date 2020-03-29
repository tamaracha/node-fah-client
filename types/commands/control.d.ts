export function pause(slot?: number | undefined): Command<string>;
export function resume(slot?: number | undefined): Command<string>;
export function finish(slot?: number | undefined): Command<string>;
export function shutdown(): Command<string>;
export function heartbeat(): Command<number>;
export type Heartbeat = number;
import { Command } from "./command.js";
