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
export class Command<R> {
    constructor(type: string, text: string, responseType?: string | undefined);
    type: string;
    text: string;
    responseType: string;
    isResponse(message: pyon.Message): boolean;
    parse(message: string): R;
}
import pyon from "fah-pyon";
