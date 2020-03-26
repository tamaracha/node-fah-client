export class FahError extends Error {
    /**
     * @param {import("./commands/helpers").Command} command
     * @param {string} message
     */
    constructor(command: import("./commands/helpers").Command, message: string);
    command: import("./commands/helpers").Command;
}
export default FahClient;
/** Represents a connection to the Fah telnet interface */
declare class FahClient {
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
    dispatch<T>(command: import("./commands/helpers").Command): Promise<T>;
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
