export default FahClient;
declare class FahClient {
    _connection: Telnet;
    connect(port?: number | undefined, host?: string | undefined): Promise<void>;
    disconnect(force?: boolean | undefined): Promise<void>;
    reset(): Promise<void>;
    dispatch<R>(command: import("./commands/command").Command<R>): Promise<R>;
    onMessage(cb: (message: pyon.Message) => any): FahClient;
}
import Telnet from "telnet-client";
import pyon from "fah-pyon";
