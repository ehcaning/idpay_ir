# IDPay Create, Verify Payments

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install idpay_ir
```

## Instantiate module
```js
const idpay = require('idpay_ir')(your-merchant-id, sandbox);
```

Example:
```js
const idpay = require('idpay_ir')('6a7f99eb-7c20-4412-a972-6dfb7cd253a4', true);
```

## Create Payment Link:
```js
idpay.create(order_id, amount, callback, desc = '', name = '', phone = '', mail = '');
```
Example:
```js
let res = await idpay.create('12345678', 10000, 'https://app.io/cb');
console.log(res);
```

Output Example:
```json
{
  "id": "1dbebd143d9f4b422532502753fb00f0",
  "link": "https://idpay.ir/p/ws-sandbox/1dbebd143d9f4b422532502753fb00f0"
}
```

## Validate Payment:
```js
idpay.validate(order_id, token);
```
Example:
```js
let res = await idpay.validate('12345678', '1dbebd143d9f4b422532502753fb00f0');
console.log(res);
```

Output Example:
```json
{
  "status": 100,
  "track_id": "190080",
  "id": "1dbebd143d9f4b422532502753fb00f0",
  "order_id": "12345678",
  "amount": "10000",
  "date": "1586517391",
  "payment": {
    "track_id": "75809406",
    "amount": "10000",
    "card_no": "123456******1234",
    "hashed_card_no": "E59FA6241C94B8836E3D03120DF33E80FD988888BBA0A122240C2E7D23B48295",
    "date": "1586517391"
  },
  "verify": {
    "date": 1586517870
  }
}
```