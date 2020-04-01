'use strict'
/** @module */

import { Command } from './command.js'

/**
 * @return { import("./command").Command<import("../index").Unit[]> }
 */
export const units = function units () {
  return new Command('[work] units', 'queue-info', 'units')
}

/**
 * @param {number} slot - A slot number
 * @return { import("./command").Command<import("../index").SimulationInfo> }
 */
export const simulation = function simulation (slot) {
  return new Command(
    '[work] simulation info',
    'simulation-info ' + slot,
    'simulation-info'
  )
}

/**
 * @return { import("./command").Command<import("../index").PPD> }
 */
export const ppd = function ppd () {
  return new Command('[work] ppd', 'ppd', 'ppd')
}
