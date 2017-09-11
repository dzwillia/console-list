'use strict'

const path = require('path')
const version = require('../package.json').version

const banner =
  '/*!\n' +
  ' * console-list v' + version + ' (https://github.com/dzwillia/console-list)\n' +
  ' * (c) ' + new Date().getFullYear() + ' David Z. Williams\n' +
  ' * Released under the MIT License.\n' +
  ' */'

module.exports = {
  banner,
  version,

  isProduction: process.env.NODE_ENV === 'production',

  paths: {
    root: path.join(__dirname, '..'),

    src: {
      main: path.join(__dirname, '..', 'src'),
    },

    output: {
      main: path.join(__dirname, '..', 'dist'),
    },

    resolve(location) {
      return path.join(__dirname, '..', location)
    }
  }
}
