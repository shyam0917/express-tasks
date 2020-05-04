var express = require('express');
var router = express.Router();
var Insta = require('instamojo-nodejs');
var url = require('url');


router.post('/pay',(req,res)=>{
    Insta.setKeys('test_2037bf62d44e3395ce3b4210554', 'test_1d5ff1011b78ad53d4c9df706d6');
    const data = new Insta.PaymentData();
    Insta.isSandboxMode(true);
    data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  req.body.buyer_name;
	data.redirect_url =  req.body.redirect_url;
	data.email =  req.body.email;
	data.phone =  req.body.phone;
	data.send_email =  true;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json( redirectUrl );
		}
	});

} );

router.get('/callback',(req,res)=>{
	let urlParts = url.parse(req.url,true);
	let responseData = url_parts.query;
	if(responseData.payment_id){
		return res.redirect('http://localhost:4200/myHotels' );
	}
})




module.exports = router;
