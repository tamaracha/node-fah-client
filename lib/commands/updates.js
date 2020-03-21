'use strict'
const { command } = require('./helpers')

/**
 * @module
 */
exports = module.exports = {}

/**
 * Create a new command to list all updates
 * @return { import("./helpers").Command }
 */
exports.list = function list () {
  return command('[updates] list', 'updates list')
}

/**
 * Create a new command to add a new update
 * @param {number} id - An id number for the new update
 * @param {number} rate - Indicates the distance in seconds between updates
 * @param { import("./helpers").Command } payload - The command to be evaluated
 * @return { import("./helpers").Command }
 */
exports.create = function create (id, rate, payload) {
  const text = `updates add ${id} ${rate} ${payload.text}`
  return command('[updates] create', text)
}

/**
 * Create a new command to clear the full updates list
 * @return { import("./helpers").Command }
 */
exports.clear = function clear () {
  return command('[updates] clear', 'updates clear')
}

/**
 * Create a new command to remove one update from the updates list
 * @param {number} id - The id of an update
 * @return { import("./helpers").Command }
 */
exports.destroy = function destroy (id) {
  return command('[updates] destroy', 'updates del ' + id)
}
