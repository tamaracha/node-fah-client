'use strict'
/** @module */

import { command, DataTypes } from './helpers.js'

/**
 * @return { import("./helpers").Command }
 */
export const units = function units () {
  return command('[work] units', 'queue-info', DataTypes.units)
}

/**
 * @param {number} slot - A slot number
 * @return { import("./helpers").Command }
 */
export const simulation = function simulation (slot) {
  return command(
    '[work] simulation info',
    'simulation-info ' + slot,
    DataTypes.simulationInfo
  )
}

/**
 * @return { import("./helpers").Command }
 */
export const ppd = function ppd () {
  return command('[work] ppd', 'ppd', DataTypes.ppd)
}
