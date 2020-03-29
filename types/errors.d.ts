/// <reference types="fah-pyon" />
export class FahError extends Error {
    constructor(message: string);
}
export class CommandError<R> extends FahError {
    constructor(message: string, command: import("./commands/command").Command<R>);
    command: import("./commands/command").Command<R>;
}
export class ReportedError<R> extends CommandError<R> {
    constructor(message: string, command: import("./commands/command").Command<R>);
}
export class ResponseMismatchError<R> extends CommandError<R> {
    constructor(command: import("./commands/command").Command<R>, response: import("fah-pyon").Message);
    response: import("fah-pyon").Message;
}
export type Message = {
    name: string;
    body: any;
};
export type Command<R> = import("./commands/command").Command<R>;
