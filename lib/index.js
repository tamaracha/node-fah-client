'use strict'
/** @module */

/**
 * @typedef {number} Heartbeat
*/

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
 * An array of slot objects
 * @typedef {object} Slot
 * @property {string} id
 * @property {string} description
 * @property {slotTypes} type
 * @property {boolean} idle
 * @property {Options} options
 * @property {string} reason
 */

/**
 * A slot object describing a modified slot
 * @typedef {object} SlotModify
*/

/**
 * A list of work unit objects
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
 * @typedef {number} PPD
*/

export * from './commands/index.js'
export * from './fah-client.js'
export * as errors from './errors.js'
