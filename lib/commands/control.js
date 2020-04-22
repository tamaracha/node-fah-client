'use strict'
import { Command } from './command.js'

/**
 * @module
 * @public
*/

/**
 * @public
 * @typedef {number} Heartbeat
*/

/**
 * Create command to pause all or one slots.
 * @public
 * @param {number} [slot] - A slot number
 * @return { import("./command").Command<null> }
 */
export function pause (slot) {
  const text = textWithSlot('pause', slot)
  return new Command('[control] pause', text)
}

/**
 * Create command to resume all or one slots.
 * @public
 * @param {number} [slot] - A slot number
 * @return { import("./command").Command<null> }
 */
export function resume (slot) {
  const text = textWithSlot('unpause', slot)
  return new Command('[control] resume', text)
}

/**
 * Create command to finish all or one slots.
 * @public
 * @param {number} [slot] - A slot number
 * @return { import("./command").Command<null> }
 */
export function finish (slot) {
  const text = textWithSlot('finish', slot)
  return new Command('[control] finish', text)
}

/**
 * Create a command to shutdown the fahclient
 * @public
 * @return { import("./command").Command<null> }
 */
export function shutdown () {
  return new Command('[control] shutdown', 'shutdown')
}

/**
 * Create a new command to get an increasing heartbeat count
 * @public
 * @return { import("./command").Command<Heartbeat> }
 */
export function heartbeat () {
  return new Command('[control] heartbeat', 'heartbeat', 'heartbeat')
}

/**
 * @private
 * @param {string} text
 * @param {number} [slot]
 * @return {string}
 */
function textWithSlot (text, slot) {
  if (typeof text === 'string' && typeof slot === 'number') {
    return `${text} ${slot}`
  }
  return text
}
