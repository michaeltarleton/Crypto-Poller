var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , crypto = require('crypto')
  , axios = require('axios')
  , privateInstance = axios.create({
      baseURL: settings.gdax.api.url,
      headers: {
          'CONTENT-TYPE': 'application/json',
          'CB-ACCESS-KEY': settings.gdax.api.key,
          'CB-ACCESS-PASSPHRASE': settings.gdax.api.passphrase 
      }
  })

var generateSignature = function(timestamp, method, url, body){
    // create the prehash string by concatenating required parts
    var what = timestamp + method + url + (body || '')

    logger.info(what)

    // decode the base64 secret
    var key = Buffer(settings.gdax.api.secret, 'base64');

    // create a sha256 hmac with the secret
    var hmac = crypto.createHmac('sha256', key);

    // sign the require message with the hmac
    // and finally base64 encode the result
    return hmac.update(what).digest('base64');  
}

var getTimestamp = function(){
    return Date.now() / 1000
}

var getAccounts = function(){
    var method = 'GET'
      , path = '/accounts'
      , timestamp = getTimestamp()
      , signature = generateSignature(timestamp, method, path)

    logger.debug('Timestamp', timestamp)
    logger.debug('Signature', signature)
    logger.debug('Method', method)
    logger.debug('Url', settings.gdax.api.url)
    logger.debug('Path', path)

    return privateInstance.request({
        url: path,
        method: method,
        headers: {
            'CB-ACCESS-SIGN': signature,
            'CB-ACCESS-TIMESTAMP': '' + timestamp,
        }
    })
    .catch(function(err){
        logger.error(Object.keys(err.request._options))
        logger.error(err.request._options)
        throw err
    })
}

module.exports = {
    getAccounts: getAccounts
}