'use strict'
/** @module */

import pyon from 'fah-pyon'
import * as errors from '../errors.js'

/**
 * An enum containing the type names of pyon-formatted response messages
 * @readonly
 * @enum {string}
 */
export const DataTypes = {
  /** an error message */
  error: 'error',
  /** A dictionary of configuration options with their values */
  options: 'options',
  /** An array of slot objects */
  slots: 'slots',
  /** A slot object describing a modified slot */
  slotModify: 'slot-modify',
  /** A list of work unit objects */
  units: 'units',
  /** A simulation description */
  simulationInfo: 'simulation-info',
  /** A number indicating the current estimated points per day */
  ppd: 'ppd'
}

/**
 * A command which can parse its response messages
 * @template R
 */
export class Command {
  /**
   * Create a new command object
   * @param {string} type - Identifies the unique command type, e.g., [options] list.
   * @param {string} text - The serialized command which can be passed to the telnet fah interface.
   * @param {DataTypes} [responseType=none] - Indicates the object type of the response message, if the response is in pyon serialization format.
   */
  constructor (type, text, responseType = 'none') {
    this.type = type
    this.text = text
    this.responseType = responseType
  }

  /**
   * @param {import("fah-pyon").Message} message
   * @return {boolean}
   */
  isResponse (message) {
    return this.responseType === message.name
  }

  /**
   * Parse a response message
   * @param {string} message
   * @return {R}
   */
  parse (message) {
    let parsed
    try {
      parsed = pyon.load(message)
    } catch (e) {
      if (this.responseType === 'none') {
        // prettier-ignore
        return /** @type any */ (message)
      } else {
        throw e
      }
    }
    if (parsed && parsed.name === 'error') {
      throw new errors.ReportedError(parsed.body, this)
    }
    if (!this.isResponse(parsed)) {
      throw new errors.ResponseMismatchError(this, parsed)
    }
    return parsed.body
  }
}
