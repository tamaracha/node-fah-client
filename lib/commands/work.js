'use strict'
const { command, DataTypes } = require('./helpers')

/**
@module
*/
exports = module.exports = {}

/**
 * @return { import("./helpers").Command }
 */
exports.units = function units () {
  return command('[work] units', 'queue-info', DataTypes.units)
}

/**
 * @param {number} slot - A slot number
 * @return { import("./helpers").Command }
 */
exports.simulation = function simulation (slot) {
  return command(
    '[work] simulation info',
    'simulation-info ' + slot,
    DataTypes.simulationInfo
  )
}

/**
 * @return { import("./helpers").Command }
 */
exports.ppd = function ppd () {
  return command('[work] ppd', 'ppd', DataTypes.ppd)
}
