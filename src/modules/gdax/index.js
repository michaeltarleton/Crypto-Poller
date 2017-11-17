var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , Gdax = require('gdax')
  , authenticatedClient = new Gdax.AuthenticatedClient(settings.gdax.api.key, settings.gdax.api.secret, settings.gdax.api.passphrase, settings.gdax.api.url)
  , bitcoinPublicClient = new Gdax.PublicClient('BTC-USD', settings.gdax.api.url)

var logError = function(err){
    logger.error(err)
    throw err
}

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

var getBTCUSDTicker = function(){
    return bitcoinPublicClient.getProductTicker()
        .then(function(ticker){
            logger.debug(ticker, 'BTC-USD Ticker')
            return ticker
        })
        .catch(logError)
}

module.exports = {
    getAccounts: getAccounts,
    getBTCUSDTicker: getBTCUSDTicker
}