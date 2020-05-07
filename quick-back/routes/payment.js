var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Insta = require('instamojo-nodejs');
const Booking = require('../models/booking.entity');
const Hotel = require('../models/hotel.entity');
var url = require('url');
var SS;

router.post('/pay', (req, res) => {
	Insta.setKeys('test_2037bf62d44e3395ce3b4210554', 'test_1d5ff1011b78ad53d4c9df706d6');
	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);
	data.purpose = req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name = req.body.buyer_name;
	data.redirect_url = req.body.redirect_url;
	data.email = req.body.email;
	data.phone = req.body.phone;
	data.send_email = true;
	data.webhook = 'http://www.example.com/webhook/';
	data.send_sms = false;
	data.allow_repeated_payments = false;
	SS = req.body.bookingDetails;
	Insta.createPayment(data, function (error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse(response);
			const redirectUrl = responseData.payment_request.longurl;

			res.status(200).json(redirectUrl);
		}
	});

});

router.get('/callback', (req, res) => {
	let urlParts = url.parse(req.url, true);
	let responseData = urlParts.query;
	if (responseData.payment_id) {
		const booking = new Booking({
			userId: SS.userId,
			hotel: SS.hotelId,
			roomNo: SS.roomNo,
			categoryId: SS.roomId,
			categoryType: SS.categoryType
		})

		booking.save().then(hotelData => {
			if (hotelData) {
				let room_Id = mongoose.Types.ObjectId(hotelData.categoryId);
				Hotel.update({ "noOfRooms._id": room_Id }, { $pop: { "noOfRooms.$.availableRooms": 1 } }).then(data => {

					if (data) {
						return res.redirect('http://localhost:4200');
					}

				}).catch(err => {
					return res.send({ success: false, msg: err })
				})
			}
		}).catch(err => {
			return res.send({ success: false, msg: err })
		})



	}
})




module.exports = router;
