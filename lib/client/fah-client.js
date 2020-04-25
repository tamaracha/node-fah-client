'use strict'
import { on, once, EventEmitter } from 'events'
import { createConnection } from 'net'
import { Tokenizer, Command } from '../commands/index.js'
import { PromiseQueue } from './promise-queue.js'

/**
 * @module
 * @public
*/

const tokenizer = new Tokenizer('\n> ')

/**
 * Represents a basic connection to the Fah telnet interface that is used to send commands and listen to data events
 * @public
*/
class FahClient extends EventEmitter {
  /**
   * Create a new client
   * @param {import("net").Socket} socket - A tcp socket connection
  */
  constructor (socket) {
    super()
    this.socket = socket
    this.queue = new PromiseQueue()
    this.setup()
  }

  /**
   * Connect to the fah interface and create a new fah client
   * @public
   * @param {number} [port=36330] - The socket port to connect to
   * @param {string} [host="127.0.0.1"] - The socket host to connect to
   * @return {Promise<{ fah: FahClient, init: string}>} A promise resolved to an object containing the fah client and the initial message
  */
  static connect (port = 36330, host = 'localhost') {
    return new Promise((resolve, reject) => {
      try {
        /** @type {import("net").Socket} */
        const socket = createConnection(port, host, () => {
          const fah = new FahClient(socket)
          return fah.takeResponse(new Command('initial', '', 'none'))
            .then(init => resolve({ fah, init }))
        })
      } catch (e) {
        return reject(e)
      }
    })
  }

  /**
  * Send a new command, wait until previously sent commands are processed
  * @public
  * @template R
  * @param {import("../commands/command").Command<R>} cmd - The command to be sent
  * @return {Promise<R>} A promise that resolves to the command's response
  */
  dispatch (cmd) {
    return this.queue.enqueue(() => this.send(cmd))
  }

  /**
  * Send a new command, immediately process the command
  * @template R
  * @param {import("../commands/command").Command<R>} cmd
  * @return {Promise<R>}
  */
  send (cmd) {
    return new Promise((resolve, reject) => {
      try {
        this.socket.write(cmd.text + '\r\n', () => {
          return resolve('done')
        })
      } catch (e) {
        return reject(e)
      }
    })
      .then(() => this.takeResponse(cmd))
  }

  /**
  * @param {boolean} [force]
  * @return {Promise<any>}
  */
  disconnect (force = false) {
    force ? this.socket.destroy() : this.socket.end()
    return once(this.socket, 'end')
  }

  /**
  * @template R
  * @param {import("../commands/command").Command<R>} cmd
  * @return {Promise<R>}
  */
  async takeResponse (cmd) {
    const tokens = []
    for await (const [token] of on(this, 'token')) {
      if (token.type === 'prompt') { break }
      tokens.push(token)
    }
    return cmd.findResponseFromTokens(tokens)
  }

  setup () {
    this.socket.on('data', data => {
      const tokens = tokenizer.tokenize(data.toString())
      tokens.forEach(t => {
        /**
         * The full fah output data stream parsed into messages with Tokenizer
        * @public
 * @event FahClient#token
        @type {import("fah-pyon").Message}
  */
        setTimeout(() => this.emit('token', t), 1)
      })
    })
    this.on('token', t => {
      /**
        * Tokens that are not part of a response
       * @public
* @event FahClient#message
       @type {import("fah-pyon").Message}
 */
      if (this.listeners('token').length === 1) { this.emit('message', t) }
    })
  }
}

export { FahClient }
