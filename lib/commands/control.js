'use strict'
const { command } = require('./helpers')

/**
 * @module
 */
exports = module.exports = {}

/**
 * Create command to pause all or one slots.
 * @param {number} [slot] - A slot number
 * @return { import("./helpers").Command }
 */
exports.pause = function pause (slot) {
  const text = textWithSlot('pause', slot)
  return command('[control] pause', text)
}

/**
 * Create command to resume all or one slots.
 * @param {number} [slot] - A slot number
 * @return { import("./helpers").Command }
 */
exports.resume = function resume (slot) {
  const text = textWithSlot('unpause', slot)
  return command('[control] resume', text)
}

/**
 * Create command to finish all or one slots.
 * @param {number} [slot] - A slot number
 * @return { import("./helpers").Command }
 */
exports.finish = function finish (slot) {
  const text = textWithSlot('finish', slot)
  return command('[control] finish', text)
}

/**
 * Create a command to shutdown the fahclient
 * @return { import("./helpers").Command }
 */
exports.shutdown = function shutdown () {
  return command('[control] shutdown', 'shutdown')
}

/**
 * Create a new command to get an increasing heartbeat count
 * @return { import("./helpers").Command }
 */
exports.heartbeat = function heartbeat () {
  return command('[control] heartbeat', 'heartbeat', 'heartbeat')
}

/**
 * @private
 * @param {string} text
 * @param {number} [slot]
 * @return {string}
 */
function textWithSlot (text, slot) {
  if (typeof text === 'string' && typeof slot === 'number') { return `${text} ${slot}` }
  return text
}
