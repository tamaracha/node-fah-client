'use strict'
/** @module */

/** @typedef {import("fah-pyon").Message} Message */

/**
 * @template R
 * @typedef {import("./commands/command").Command<R>} Command<R>
 */

/** Base type for errors thrown by this package */
export class FahError extends Error {
  /**
   * @param {string} message
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
  }
}

/**
 * @template R
 */
export class CommandError extends FahError {
  /**
   * @param {string} message
   * @param {Command<R>} command
   */
  constructor (message, command) {
    super(message)
    this.command = command
  }
}

/**
 * Thrown if FahClient responds with an error message
 * @template R
 * @extends {CommandError<R>}
 */
export class ReportedError extends CommandError {}

/**
 * Thrown if parsed message has wrong type
 * @template R
 * @extends {CommandError<R>}
 */
export class ResponseMismatchError extends CommandError {
  /**
   * @param {Command<R>} command
   * @param {Message} response
   */
  constructor (command, response) {
    super('Response type mismatch', command)
    this.response = response
  }
}
