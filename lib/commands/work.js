'use strict'
import { Command } from './command.js'

/**
 * @module
 * @public
*/

/**
 * A list of work unit objects
 * @public
 * @typedef {object} Unit
 * @property {string} id
 * @property {string} state
 * @property {string} error
 * @property {number} project
 * @property {number} run
 * @property {number} clone
 * @property {number} gen
 * @property {string} core
 * @property {string} unit
 * @property {string} percentdone
 * @property {string} eta
 * @property {string} ppd
 * @property {string} creditestimate
 * @property {string} waitingon
 * @property {string} nextattempt
 * @property {string} timeremaining
 * @property {number} totalframes
 * @property {number} framesdone
 * @property {string} assigned
 * @property {string} timeout
 * @property {string} deadline
 * @property {string} ws
 * @property {string} cs
 * @property {number} attempts
 * @property {string} slot
 * @property {string} tpf
 * @property {string} basecredit
*/

/**
 * A simulation description
 * @public
 * @typedef {object} SimulationInfo
 * @property {string} user
 * @property {string} team
 * @property {number} project
 * @property {number} run
 * @property {number} clone
 * @property {number} gen
 * @property {number} core_type
 * @property {string} core
 * @property {number} total_iterations
 * @property {number} iterations_done
 * @property {number} energy
 * @property {number} temperature
 * @property {string} start_time
 * @property {number} timeout
 * @property {number} deadline
 * @property {number} eta
 * @property {number} progress
 * @property {number} slot
*/

/**
 * A number indicating the current estimated points per day
 * @public
 * @typedef {number} PPD
*/

/**
 * @public
 * @return { import("./command").Command<Unit[]> }
 */
export function units () {
  return new Command('[work] units', 'queue-info', 'units')
}

/**
 * @public
 * @param {number} slot - A slot number
 * @return { import("./command").Command<SimulationInfo> }
 */
export function simulation (slot) {
  return new Command(
    '[work] simulation info',
    'simulation-info ' + slot,
    'simulation-info'
  )
}

/**
 * @public
 * @return { import("./command").Command<PPD> }
 */
export function ppd () {
  return new Command('[work] ppd', 'ppd', 'ppd')
}
