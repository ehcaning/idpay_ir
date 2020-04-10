const request = require('request');

class idpay {
    constructor(api_key, sandbox = false) {
        this.api_key = api_key;
        this.sandbox = sandbox ? 1 : 0;
    }

    create = (order_id, amount, callback, desc = '', name = '', phone = '', mail = '') => new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: 'https://api.idpay.ir/v1.1/payment',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.api_key,
                'X-SANDBOX': this.sandbox
            },
            body: {
                'order_id': String(order_id),
                'amount': parseInt(amount),
                'name': name,
                'phone': phone,
                'mail': mail,
                'desc': desc,
                'callback': callback,
                'reseller': null,
            },
            json: true,
        };

        request(options, (error, response, body) => resolve(body));
    });

    validate = (order_id, token) => new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: 'https://api.idpay.ir/v1.1/payment/verify',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.api_key,
                'X-SANDBOX': this.sandbox
            },
            body: {
                'id': token,
                'order_id': order_id,
            },
            json: true,
        };

        request(options, (error, response, body) => resolve(body));
    });
}


module.exports = (api_key, sandbox) => new idpay(api_key, sandbox);