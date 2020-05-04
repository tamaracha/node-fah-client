'use strict'
import { EventEmitter, once } from 'events'
import { createConnection } from 'net'
import { Tokenizer, Command } from '../commands/index.js'
import { PromiseQueue } from './promise-queue.js'
const tokenizer = new Tokenizer('\n> ')

/**
 * @module
 * @public
*/

/** @typedef {import("fah-pyon").Message} Message */

/**
 * @typedef {object} FahEvents
 * @property {function(string): void} ready
 * @property {function(Message): void} token
*/

/**
 * Represents a basic connection to the Fah telnet interface that is used to send commands and listen to data events
 * @public
*/
class FahClient {
  /**
   * Create a new client
   * @param {import("net").Socket} socket - A tcp socket connection
  */
  constructor (socket) {
    /** @private */
    this.socket = socket
    /** @private */
    this.readingResponse = false
    /** @public */
    this.events = /** @type {import("typed-emitter").default<FahEvents>} */ (new EventEmitter())
    /** @private */
    this.queue = new PromiseQueue()
    /** @private */
    this.tokenStream = tokenizer.getTokenStream(this.socket)
    this.socket.once('ready', () => {
      return this.queue.enqueue(() => this.takeResponse(new Command('initial', '', 'none'))
        .then(init => {
          /**
         * The initial welcome string printed by the fah interface after connection is established
        * @public
 * @event FahClient#ready
        @type {string}
  */
          this.events.emit('ready', init)
        }))
    })
    this.tokenStream.on('data', token => {
      /**
        * Tokens that are not part of a command response
       * @public
* @event FahClient#message
       @type {Message}
 */
      if (this.readingResponse === false) { this.events.emit('token', token) }
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
      /** @type {function(Error): void} */
      const errorHandler = error => reject(error)
      try {
        /** @type {import("net").Socket} */
        const socket = createConnection({ port, host }, () => {
          socket.off('error', errorHandler)
          socket.setEncoding('utf8')
          const fah = new FahClient(socket)
          resolve(fah)
        })
        socket.once('error', errorHandler)
      } catch (e) {
        return reject(e)
      }
    })
  }

  /**
 * Half-close the connection to the fah interface by calling socket.end
  * @public
  * @return {Promise<void[]>} The forwarded end event from the socket
  */
  end () {
    this.socket.end()
    return once(this.socket, 'end')
  }

  /**
   * Destroy the socket connection to the fah interface by calling socket.destroy
  * @param {Error} [error]
  * @return {Promise<boolean[]>} The forwarded close event from the socket
  */
  destroy (error) {
    this.socket.destroy(error)
    return once(this.socket, 'close')
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
      const responseHandler = token => {
        if (token.type === 'prompt') {
          this.tokenStream.off('data', responseHandler)
          this.readingResponse = false
          try {
            return resolve(cmd.findResponseFromTokens(tokens))
          } catch (e) {
            return reject(e)
          }
        }
        tokens.push(token)
      }
      this.readingResponse = true
      this.tokenStream.on('data', responseHandler)
    })
  }
}

export { FahClient }
