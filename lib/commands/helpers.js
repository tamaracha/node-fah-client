'use strict'
/** @module */

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
 * A command object which can be interpreted by the FahClient
@typedef {object} Command
 * @property {string} type - A text based command name
 * @property {string} text - The string to be sent to FahClient
 * @property {DataTypes} [responseType] - The expected name of the response message type
*/

/**
 * Create a new command object
 * @param {string} type - Identifies the unique command type, e.g., [options] list.
 * @param {string} text - The serialized command which can be passed to the telnet fah interface.
 * @param {DataTypes} [responseType] - Indicates the object type of the response message, if the response is in pyon serialization format.
 * @return {Command} A command object
 */
export const command = function command (type, text, responseType) {
  if (typeof responseType === 'string') return { type, text, responseType }
  return { type, text }
}
