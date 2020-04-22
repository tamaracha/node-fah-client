'use strict'
/** @module */

import { Command } from './command.js'
import { formatOptions } from '../helpers/index.js'

/**
 * A dictionary of configuration options with their values
 * @typedef {object} Options
 * @property {string} [allow="127.0.0.1"]
 * @property {string} [assignment-servers="assign1.foldingathome.org:8080 assign2.foldingathome.org:80"]
 * @property {boolean} [auth-as=true]
 * @property {string} [capture-directory="capture"]
 * @property {boolean} [capture-on-error=false]
 * @property {boolean} [capture-packets=false]
 * @property {boolean} [capture-requests=false]
 * @property {boolean} [capture-responses=false]
 * @property {boolean} [capture-sockets=false]
 * @property {string} [cause="ANY"]
 * @property {string} [certificate-file]
 * @property {string} [checkpoint="15"]
 * @property {boolean} [child=false]
 * @property {string} [client-subtype="MACOSX"]
 * @property {string} [client-threads="6"]
 * @property {string} [client-type="normal"]
 * @property {string} [command-address="0.0.0.0"]
 * @property {string} [command-allow-no-pass="127.0.0.1"]
 * @property {string} [deny="0/0"]
 * @property {string} [command-deny-no-pass="0/0"]
 * @property {boolean} [command-enable=true]
 * @property {string} [command-port="36330"]
 * @property {boolean} [config-rotate=true]
 * @property {string} [config-rotate-dir="configs"]
 * @property {string} [config-rotate-max="16"]
 * @property {string} [connection-timeout="60"]
 * @property {string} [core-dir="cores"]
 * @property {string} [core-exec="FahCore_$type"]
 * @property {string} [core-key]
 * @property {string} [core-prep]
 * @property {string} [core-priority="idle"]
 * @property {string} [core-server]
 * @property {string} [core-wrapper-exec="FAHCoreWrapper"]
 * @property {boolean} [cpu-affinity=false]
 * @property {string} [cpu-species="X86_PENTIUM_II"]
 * @property {string} [cpu-type="AMD64"]
 * @property {string} [cpu-usage="100"]
 * @property {string} [cpus="-1"]
 * @property {string} [crl-file]
 * @property {string} [cuda-index]
 * @property {string} [cycle-rate="4"]
 * @property {string} [cycles="-1"]
 * @property {boolean} [daemon=false]
 * @property {string} [data-directory="."]
 * @property {boolean} [debug-sockets=false]
 * @property {boolean} [disable-sleep-when-active=true]
 * @property {boolean} [disable-viz=false]
 * @property {boolean} [dump-after-deadline=true]
 * @property {any} [eval]
 * @property {boolean} [exception-locations=true]
 * @property {string} [exec-directory="/usr/local/bin"]
 * @property {boolean} [exit-when-done=false]
 * @property {string} [extra-core-args]
 * @property {boolean} [fold-anon=false]
 * @property {boolean} [fork=false]
 * @property {boolean} [gpu=false]
 * @property {string} [gpu-index]
 * @property {string} [gpu-usage="100"]
 * @property {boolean} [gui-enabled=true]
 * @property {string} [http-addresses="0:7396"]
 * @property {string} [https-addresses=""]
 * @property {boolean} [idle=false]
 * @property {string} [log="log.txt"]
 * @property {boolean} [log-color=true]
 * @property {boolean} [log-crlf=false]
 * @property {boolean} [log-date=false]
 * @property {string} [log-date-periodically="21600"]
 * @property {boolean} [log-domain=false]
 * @property {string} [log-domain-levels]
 * @property {boolean} [log-header=true]
 * @property {boolean} [log-level=true]
 * @property {boolean} [log-no-info-header=true]
 * @property {boolean} [log-redirect=false]
 * @property {boolean} [log-rotate=true]
 * @property {string} [log-rotate-dir="logs"]
 * @property {string} [log-rotate-max="16"]
 * @property {boolean} [log-short-level=false]
 * @property {boolean} [log-simple-domains=true]
 * @property {boolean} [log-thread-id=false]
 * @property {boolean} [log-thread-prefix=true]
 * @property {boolean} [log-time=true]
 * @property {boolean} [log-to-screen=true]
 * @property {boolean} [log-truncate=false]
 * @property {string} [machine-id="0"]
 * @property {string} [max-connect-time="900"]
 * @property {string} [max-connections="800"]
 * @property {string} [max-packet-size="normal"]
 * @property {string} [max-queue="16"]
 * @property {string} [max-request-length="52428800"]
 * @property {string} [max-shutdown-wait="60"]
 * @property {string} [max-slot-errors="10"]
 * @property {string} [max-unit-errors="5"]
 * @property {string} [max-units="0"]
 * @property {string} [memory]
 * @property {string} [min-connect-time="300"]
 * @property {string} [next-unit-percentage="99"]
 * @property {string} [priority]
 * @property {boolean} [no-assembly=false]
 * @property {boolean} [open-web-control=false]
 * @property {string} [opencl-index]
 * @property {string} [os-species="UNKNOWN"]
 * @property {string} [os-type="MACOSX"]
 * @property {string} [passkey="d98338606f269d2bd98338606f269d2b"]
 * @property {string} [password]
 * @property {boolean} [pause-on-battery=true]
 * @property {boolean} [pause-on-start=false]
 * @property {boolean} [paused=false]
 * @property {boolean} [pid=false]
 * @property {string} [pid-file="Folding@home Client.pid"]
 * @property {string} [power="medium"]
 * @property {string} [private-key-file]
 * @property {string} [project-key="0"]
 * @property {string} [proxy=""]
 * @property {boolean} [proxy-enable=false]
 * @property {string} [proxy-pass=""]
 * @property {string} [proxy-user=""]
 * @property {boolean} [respawn=false]
 * @property {string} [run-as]
 * @property {string} [script]
 * @property {boolean} [service=false]
 * @property {string} [session-cookie="sid"]
 * @property {string} [session-lifetime="86400"]
 * @property {string} [session-timeout="3600"]
 * @property {boolean} [smp=true]
 * @property {boolean} [stack-traces=false]
 * @property {boolean} [stall-detection-enabled=false]
 * @property {string} [stall-percent="5"]
 * @property {string} [stall-timeout="1800"]
 * @property {string} [team="0"]
 * @property {string} [user="anonymous"]
 * @property {string} [verbosity="3"]
 * @property {string} [web-allow="127.0.0.1"]
 * @property {string} [web-deny="0/0"]
 * @property {boolean} [web-enable=true]
*/

/**
 * Create a new command to list Fah options filtered by given verbosity level.
 * @param {string} [level=explicit] - The verbosity level, determines which options are shown. This can be explicit (options set by user), implicit (explicit + options with default values), unset (implicit + unset options), or all. Any other value will default to explicit.
 * @param {number} [slot] - The number of the slot to be configured
 * @return { import("./command").Command<Options> }
 */
export const listByFilter = function listByFilter (level = 'explicit', slot) {
  let text = textWithSlot(slot)
  switch (level) {
    case 'explicit':
      break
    case 'implicit':
      text += ' -d'
      break
    case 'unset':
      text += ' -a'
      break
    case 'all':
      text += ' *'
      break
  }
  return new Command('[options] list by filter', text, 'options')
}

/**
 * Create a new command to list Fah options by names
 * @param {Array<string>} names - The names of the Fah options to be shown
 * @param {number} [slot] - A slot number.
 * @return { import("./command").Command<Options> }
 */
export const listByNames = function listByNames (names, slot) {
  const text = textWithSlot(slot)
  return new Command(
    '[options] list by names',
    `${text} ${names.join(' ')}`,
    'options'
  )
}

/**
 * Create a new command to update the global or a slot configuration
 * @param {Options} options - A dictionary of options to be set. A null value means that the respective option will be unset.
 * @param {number} [slot] - A slot number.
 * @return { import("./command").Command<Options> }
 */
export const update = function update (options, slot) {
  const text = textWithSlot(slot)
  return new Command(
    '[options] update',
    `${text} ${formatOptions(options)}`,
    'options'
  )
}

/**
 * @private
 * @param {number} [slot] - A slot number
 * @return {string}
 */
function textWithSlot (slot) {
  return typeof slot === 'number' ? 'slot-options ' + slot : 'options'
}
