'use strict'

/**
 * Prepare an update expression
 * @param {string} text - A command text
 * @return {string} The command text, preceded with a dollar sign if it contains no whitespace, otherwise wrapped into `$()`
 * @package
*/
export function formatExpression (text) {
  if (/\s/.test(text)) {
    return `$(${text})`
  } else {
    return `$${text}`
  }
}
