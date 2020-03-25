declare module "commands/helpers" {
    /**
     * An enum containing the type names of pyon-formatted response messages
     */
    export type DataTypes = string;
    export namespace DataTypes {
        export const error: string;
        export const options: string;
        export const slots: string;
        export const slotModify: string;
        export const units: string;
        export const simulationInfo: string;
        export const ppd: string;
    }
    export function command(type: string, text: string, responseType?: string | undefined): Command;
    /**
     * A command object which can be interpreted by the FahClient
     */
    export type Command = {
        /**
         * - A text based command name
         */
        type: string;
        /**
         * - The string to be sent to FahClient
         */
        text: string;
        /**
         * - The expected name of the response message type
         */
        responseType?: string;
    };
}
declare module "commands/control" {
    export function pause(slot?: number | undefined): import("commands/helpers").Command;
    export function resume(slot?: number | undefined): import("commands/helpers").Command;
    export function finish(slot?: number | undefined): import("commands/helpers").Command;
    export function shutdown(): import("commands/helpers").Command;
    export function heartbeat(): import("commands/helpers").Command;
}
declare module "commands/options" {
    export function listByFilter(level?: string | undefined, slot?: number | undefined): import("commands/helpers").Command;
    export function listByNames(names: string[], slot?: number | undefined): import("commands/helpers").Command;
    export function update(options: object, slot?: number | undefined): import("commands/helpers").Command;
}
declare module "commands/slots" {
    /**
     * An enum containing the possible slot type names
     */
    export type slotTypes = string;
    export namespace slotTypes {
        export const cpu: string;
        export const gpu: string;
        export const smp: string;
    }
    export function list(): import("commands/helpers").Command;
    export function create(type: string): import("commands/helpers").Command;
    export function update(slot: number, type: string): import("commands/helpers").Command;
    export function destroy(slot: number): import("commands/helpers").Command;
}
declare module "commands/updates" {
    export function list(): import("commands/helpers").Command;
    export function create(id: number, rate: number, payload: import("commands/helpers").Command): import("commands/helpers").Command;
    export function clear(): import("commands/helpers").Command;
    export function destroy(id: number): import("commands/helpers").Command;
}
declare module "commands/work" {
    export function units(): import("commands/helpers").Command;
    export function simulation(slot: number): import("commands/helpers").Command;
    export function ppd(): import("commands/helpers").Command;
}
declare module "commands/index" {
    export * as control from "commands/control";
    export * as helpers from "commands/helpers";
    export * as options from "commands/options";
    export * as slots from "commands/slots";
    export * as updates from "commands/updates";
    export * as work from "commands/work";
}
declare module "fah-client" {
    /**
     * @module
    */
    export class FahError extends Error {
        /**
         * @param {import("./commands/helpers").Command} command
         * @param {string} message
        */
        constructor(command: import("commands/helpers").Command, message: string);
        command: import("commands/helpers").Command;
    }
    export default FahClient;
    /** Represents a connection to the Fah telnet interface */
    class FahClient {
        _connection: Telnet;
        /**
         * @param {number} [port=36330]
         * @param {string} [host="127.0.0.1"]
         * @return {Promise<void>}
        */
        connect(port?: number | undefined, host?: string | undefined): Promise<void>;
        /**
          * @param {boolean} [force]
          * @return {Promise<void>}
        */
        disconnect(force?: boolean | undefined): Promise<void>;
        /**
         * @return {Promise<void>}
        */
        reset(): Promise<void>;
        /**
         * @template T
         * @param {import("./commands/helpers").Command} command
         * @return {Promise<T>}
        */
        dispatch<T>(command: import("commands/helpers").Command): Promise<T>;
        /**
         * @callback EventHandler
         * @param {Buffer} data
        */
        /**
         * @param {string} event
         * @param {EventHandler} cb
         * @return {FahClient}
        */
        on(event: string, cb: (data: Buffer) => any): FahClient;
    }
    import Telnet from "telnet-client";
}
declare module "index" {
    export * from "commands";
    export * from "fah-client";
}
