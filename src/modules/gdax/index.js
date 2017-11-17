var settings = require('../../config')
  , crypto = require('crypto')
  , axios = require('axios')
  , instance = axios.create({
      baseURL: settings.GDAX.API.Url,
      headers: {
          'CONTENT-TYPE': 'application/json',
          'CB-ACCESS-KEY': settings.GDAX.API.KEY,
          'CB-ACCESS-PASSPHRASE': settings.GDAX.API.PASSPHRASE 
      }
  })

var generateSignature = function(timestamp, method, url, body){
    // create the prehash string by concatenating required parts
    var what = timestamp + method + url + (body || '')

    // decode the base64 secret
    var key = Buffer(settings.GDAX.API.SECRET, 'base64');

    // create a sha256 hmac with the secret
    var hmac = crypto.createHmac('sha256', key);

    // sign the require message with the hmac
    // and finally base64 encode the result
    return hmac.update(what).digest('base64');  
}

var get = function(method, url, body){
    var timestamp = Date.now() / 1000
      , signature = generateSignature(timestamp, method, url, body)
    
    return instance.request({
        method: method,
        url: url,
        headers: {
            'CB-ACCESS-SIGN': signature,
            'CB-ACCESS-TIMESTAMP': timestamp,
        }
    })
}

var getAccounts = function(){
    return get('get', '/accounts')
}

module.exports = {
    getAccounts: getAccounts
}