'use strict'

var pino = require('pino')
  , pretty = pino.pretty()

pretty.pipe(process.stdout)

var log = pino({
    name: 'Crypto Logger',
    safe: true
}, pretty)

module.exports = log