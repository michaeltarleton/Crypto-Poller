'use strict'

require('make-promises-safe')

var logger = require('./logger')
  , settings = require('./config')
  , schedules = require('./schedules')

schedules()