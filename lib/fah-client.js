'use strict'
/** @module */

import pyon from 'fah-pyon'
import Telnet from 'telnet-client'

/**
 * @private
 * @type {import("telnet-client").ConnectOptions}
 */
const defaultOptions = {
  shellPrompt: '>',
  irs: '\n',
  ors: '\n'
}

/** Represents a connection to the Fah telnet interface */
export class FahClient {
  constructor () {
    this._connection = new Telnet()
  }

  /**
   * @param {number} [port=36330]
   * @param {string} [host="127.0.0.1"]
   * @return {Promise<void>}
   */
  connect (port = 36330, host = '127.0.0.1') {
    const params = Object.assign({ port, host }, defaultOptions)
    return this._connection.connect(params)
  }

  /**
   * @param {boolean} [force]
   * @return {Promise<void>}
   */
  disconnect (force = false) {
    return force ? this._connection.end() : this._connection.destroy()
  }

  /**
   * @return {Promise<void>}
   */
  reset () {
    return this.disconnect(true).then(() => this.connect())
  }

  /**
   * @template R
   * @param {import("./commands/command").Command<R>} command
   * @return {Promise<R>}
   */
  dispatch (command) {
    return this._connection.exec(command.text).then(message => command.parse(message))
  }

  /**
   * @callback MessageHandler
   * @param {import("fah-pyon").Message} message
   */

  /**
   * @param {MessageHandler} cb
   * @return {FahClient}
   */
  onMessage (cb) {
    this._connection.on('data', data => {
      const message = pyon.safeLoad(data.toString())
      cb(message)
    })
    return this
  }
}
// export default FahClient
