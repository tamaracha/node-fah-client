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
