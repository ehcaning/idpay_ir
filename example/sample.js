const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const idpay = require('../app')('6a7f99eb-7c20-4412-a972-6dfb7cd253a4', true);

//you can use it when install module
//const idpay = require('idpay_ir')(your-merchant-id, sandbox);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    idpay.create('order-id',1000, 'http://localhost:'+port+'/verify')
            .then(response => res.redirect(response.link))
            .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
});
app.post('/verify', function(req, res){
    // Pass POST Data Payload (Request Body) to verify transaction
    const order_id = req.body.order_id;
    const token = req.body.id;
    
    idpay.validate(order_id,token)
        .then((data) => {
           console.log(data);
        })
        .catch((error) =>{
            console.log(error);          
        });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});