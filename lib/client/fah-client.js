'use strict'
import { EventEmitter, once } from 'events'
import { createConnection } from 'net'
import { Tokenizer, Command } from '../commands/index.js'
import { PromiseQueue } from './promise-queue.js'

/**
 * @module
 * @public
*/

/** @typedef {import("fah-pyon").Message} Message */

/**
 * @typedef {object} FahEvents
 * @property {function(string): void} ready
 * @property {function(Message): void} response
 * @property {function(Message): void} message
*/

/**
 * Represents a basic connection to the Fah telnet interface that is used to send commands and listen to data events
 * @public
*/
class FahClient {
  /**
   * Create a new client
   * @param {import("net").Socket} socket - A tcp socket connection
   * @param {Tokenizer} tokenizer - A Tokenizer instance for parsing the telnet output
  */
  constructor (socket, tokenizer = new Tokenizer('\n> ')) {
    this.socket = socket
    this.tokenizer = tokenizer
    this.events = /** @type {import("typed-emitter").default<FahEvents>} */ (new EventEmitter())
    this.queue = new PromiseQueue()
    this.readingResponse = false
    /** @type {function(Buffer): void} */
    this.dataHandler = (data) => {
      const tokens = this.tokenizer.tokenize(data.toString())
      tokens.forEach(t => {
        /**
          * Tokens that are part of a command response
         * @public
  * @event FahClient#response
         @type {Message}
   */
        setImmediate(() => {
          /**
           * Tokens that are not part of a response
          * @public
   * @event FahClient#message
          @type {Message}
    */
          this.events.emit(this.readingResponse ? 'response' : 'message', t)
        })
      })
    }
    this.socket.on('data', this.dataHandler)
    this.socket.once('ready', () => {
      return this.queue.enqueue(() => this.takeResponse(new Command('initial', '', 'none')))
        .then(init => {
          /**
         * The initial welcome string printed by the fah interface after connection is established
        * @public
 * @event FahClient#ready
        @type {string}
  */
          this.events.emit('ready', init)
        })
    })
  }

  /**
   * Connect to the fah interface and create a new fah client
   * @public
   * @param {number} [port=36330] - The socket port to connect to
   * @param {string} [host="127.0.0.1"] - The socket host to connect to
   * @return {Promise<FahClient>} A promise resolved to the connected fah client
  */
  static connect (port = 36330, host = '127.0.0.1') {
    return new Promise((resolve, reject) => {
      try {
        /** @type {import("net").Socket} */
        const socket = createConnection(port, host, () => {
          const fah = new FahClient(socket)
          resolve(fah)
        })
      } catch (e) {
        return reject(e)
      }
    })
  }

  /**
 * close the connection to the fah interface
  * @public
  * @param {boolean} [force]
  * @return {Promise<any>}
  */
  disconnect (force = false) {
    force ? this.socket.destroy() : this.socket.end()
    return once(this.socket, 'end')
  }

  /**
  * Send a new command, wait until previously sent commands are processed
  * @public
  * @template R
  * @param {import("../commands/command").Command<R>} cmd - The command to be sent
  * @return {Promise<R>} A promise that resolves to the command's response
  */
  dispatch (cmd) {
    return this.queue.enqueue(() => this.send(cmd)
      .then(() => this.takeResponse(cmd)))
  }

  /**
  * Send a new command to socket
   * @private
  * @template R
  * @param {import("../commands/command").Command<R>} cmd
  * @return {Promise<void>}
  */
  send (cmd) {
    return new Promise((resolve, reject) => {
      try {
        this.socket.write(cmd.text + '\r\n', () => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @private
  * @template R
  * @param {import("../commands/command").Command<R>} cmd
  * @return {Promise<R>}
  */
  takeResponse (cmd) {
    return new Promise((resolve, reject) => {
    /** @type {Message[]} */
      const tokens = []
      /** @type {function(Message): void} */
      const responseHandler = (token) => {
        if (token.type === 'prompt') {
          this.events.off('response', responseHandler)
          this.readingResponse = false
          try {
            const response = cmd.findResponseFromTokens(tokens)
            resolve(response)
          } catch (e) {
            reject(e)
          }
        }
        tokens.push(token)
      }
      this.readingResponse = true
      this.events.on('response', responseHandler)
    })
  }
}

export { FahClient }
