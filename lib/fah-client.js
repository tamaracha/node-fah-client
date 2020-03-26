'use strict'
/** @module */

import pyon from 'fah-pyon'
import Telnet from 'telnet-client'

export class FahError extends Error {
  /**
   * @param {import("./commands/helpers").Command} command
   * @param {string} message
   */
  constructor (command, message) {
    super(message)
    this.command = command
  }
}

/**
 * @type {import("telnet-client").ConnectOptions}
 */
const defaultOptions = {
  shellPrompt: '>',
  irs: '\n',
  ors: '\n'
}

/** Represents a connection to the Fah telnet interface */
class FahClient {
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
   * @template T
   * @param {import("./commands/helpers").Command} command
   * @return {Promise<T>}
   */
  dispatch (command) {
    /** @type {string} */
    let raw
    return this._connection
      .exec(command.text)
      .then(res => {
        raw = res
        return pyon.load(res)
      })
      .then(
        parsed => {
          if (parsed && parsed.name === 'error') {
            throw new FahError(command, parsed.body)
          }
          return parsed.body
        },
        e => {
          if (command.responseType) {
            throw e
          }
          return raw
        }
      )
  }

  /**
   * @callback EventHandler
   * @param {Buffer} data
   */

  /**
   * @param {string} event
   * @param {EventHandler} cb
   * @return {FahClient}
   */
  on (event, cb) {
    this._connection.on(event, cb)
    return this
  }
}
export default FahClient
