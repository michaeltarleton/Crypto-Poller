# Crypto Poller

## Description

This project is designed to go out and fetch the latest currencies from the Coinbase Pro Exchange for the top three currencies (BTC, LTC, and ETH) and email them out to specified users.

## Usage

- If you want to build the dockerfile just run `npm run build`
- If you want to use docker compose just run `npm run compose` (make sure you update the environment variables

## Configuration

| Environment Variable  | Description                      |
|-----------------------|----------------------------------|
| EMAILSMTPCLIENTID     | Google SMTP Client Id            |
| EMAILSMTPCLIENTSECRET | Google SMTP Client Secret        |
| EMAILSMTPREFRESHTOKEN | Google SMTP Client Refresh Token |
| EMAILSMTPFROM         | Email From                       |
| EMAILSMTPTO           | Email To (comma separated list ) |
| EMAILSMTPUSERNAME     | SMTP Username                    |
| GDAXAPIKEY            | GDAX API Key                     |
| GDAXAPISECRET         | GDAX API Secret                  |
| GDAXAPIPASSPHRASE     | GDAX API Passphrase              |
| LOGGERLEVEL           | Logger level                     |

## TODO

- [x] Remove private environment variables from the Crypto-Base project into this one
- [x] Allow for ENV vars to be added to this project's Docker app
- [ ] De-couple Google SMTP settings
