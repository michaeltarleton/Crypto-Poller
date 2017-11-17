'use strict'

require('make-promises-safe')

var logger = require('./logger')
  , settings = require('./config')
  , modules = require('./modules')

modules.gdax.getAccounts()
    .then(function(accounts){
        logger.debug('accounts', accounts)
    })
    .catch(function(err){
        if(err && !err.response) return logger.error(err)
        var response = err.response
        logger.error(response.status, response.data)
    })