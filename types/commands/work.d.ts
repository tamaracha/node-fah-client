export function units(): Command<object[]>;
export function simulation(slot: number): Command<object>;
export function ppd(): Command<number>;
export type Unit = object;
export type Simulation = object;
import { Command } from "./command.js";
