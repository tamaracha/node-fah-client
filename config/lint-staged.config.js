'use strict'
module.exports = {
  '*.{json,yml,yaml}': 'prettier --write',
  '(lib|config)/**/*.?(c|m)js': files => `standard --fix ${files} | snazzy`,
  'lib/**/!(*.spec).?(c|m)js': [
    'tsc --noEmit --allowJs --checkJs --allowSyntheticDefaultImports --moduleResolution node --target es2019 --lib es2019 --module esnext --strict'
  ],
  'lib/**/*.spec.?(c|m)js': [
    'tsc --noEmit --allowJs --checkJs --allowSyntheticDefaultImports --moduleResolution node --target es2019 --lib es2019 --module esnext '
  ]
}