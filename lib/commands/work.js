'use strict'
/** @module */

import { Command, DataTypes } from './command.js'

/**
 * @typedef {object} Unit
 */

/**
 * @typedef {object} Simulation
 */

/**
 * @return { import("./command").Command<Unit[]> }
 */
export const units = function units () {
  return new Command('[work] units', 'queue-info', DataTypes.units)
}

/**
 * @param {number} slot - A slot number
 * @return { import("./command").Command<Simulation> }
 */
export const simulation = function simulation (slot) {
  return new Command(
    '[work] simulation info',
    'simulation-info ' + slot,
    DataTypes.simulationInfo
  )
}

/**
 * @return { import("./command").Command<number> }
 */
export const ppd = function ppd () {
  return new Command('[work] ppd', 'ppd', DataTypes.ppd)
}
