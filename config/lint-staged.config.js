'use strict'
module.exports = {
  '*.{json,yml,yaml}': 'prettier --write',
  '(lib|config)/**/*.js': files => `standard --fix ${files} | snazzy`,
  'lib/**/!(*.spec).js': [
    'tsc --noEmit --allowJs --checkJs --allowSyntheticDefaultImports --moduleResolution node --target es2019 --lib es2019 --module esnext --strict'
  ],
  'lib/**/*.spec.js': [
    'tsc --noEmit --allowJs --checkJs --allowSyntheticDefaultImports --moduleResolution node --target es2019 --lib es2019 --module esnext '
  ]
}
