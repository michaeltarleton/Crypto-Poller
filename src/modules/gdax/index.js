var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , client = require('./client')
  , Gdax = require('gdax')
  , authenticatedClient = new Gdax.AuthenticatedClient(settings.gdax.api.key, settings.gdax.api.secret, settings.gdax.api.passphrase, settings.gdax.api.url)

var getAccounts = function(){
    return client.getPrivateRoute('GET', '/accounts')
}

var getAccounts = function(){
    return authenticatedClient.getAccounts()
        .then(function(accounts){
            logger.debug(accounts, 'Accounts')
            return accounts
        })
        .catch(function(err){
            logger.error(err)
            throw err
        })
}

module.exports = {
    getAccounts: getAccounts
}