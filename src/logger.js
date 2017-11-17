'use strict'

var pino = require('pino')
  , pretty = pino.pretty()
  , settings = require('./config')

pretty.pipe(process.stdout)

var log = pino({
    name: 'Crypto Logger',
    level: settings.logger.level,
    safe: true
}, pretty)

module.exports = log