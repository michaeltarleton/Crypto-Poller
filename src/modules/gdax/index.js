var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , client = require('./client')

var getAccounts = function(){
    return client.getPrivateRoute('GET', '/accounts')
}

module.exports = {
    getAccounts: getAccounts
}