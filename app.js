const axios = require('axios');

class idpay {
	constructor(api_key, sandbox = false) {
		this.api_key = api_key;
		this.sandbox = sandbox ? 1 : 0;
	}

	create = (order_id, amount, callback, desc = '', name = '', phone = '', mail = '') =>
		new Promise((resolve, reject) => {
			if (typeof amount !== 'number' || amount < 1000)
            throw new Error('Transaction\'s amount must be a number and equal/greater than 1000');
        else if (typeof callback !== 'string' || callback.length < 5)
            throw new Error('Callback (redirect) URL must be a string.');
        else if (callback.slice(0, 4) != 'http')
            throw new Error('Callback URL must start with http/https');
			axios({
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': this.api_key,
					'X-SANDBOX': this.sandbox,
				},
				url: 'https://api.idpay.ir/v1.1/payment',
				data: {
					order_id: String(order_id),
					amount: parseInt(amount),
					name: name,
					phone: phone,
					mail: mail,
					desc: desc,
					callback: callback,
					reseller: null,
				},
			})
				.then(response => {
					return resolve(response.data);
				})
				.catch(err => {
					return reject(err.response.data);
				});
		});

	validate = (order_id, token) =>
		new Promise((resolve, reject) => {
			axios({
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': this.api_key,
					'X-SANDBOX': this.sandbox,
				},
				url: 'https://api.idpay.ir/v1.1/payment/verify',
				data: {
					id: token,
					order_id: order_id,
				},
			})
				.then(response => {
					return resolve(response.data);
				})
				.catch(err => {
					return reject(err.response.data);
				});
		});
}

module.exports = (api_key, sandbox) => new idpay(api_key, sandbox);
