var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller');

/* Add hotel Data */
router.post('/addHotel', (req, res, next) => {
  if (req.body) {
    console.log("tt", req.body);
    let hotelData = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      noOfRooms: req.body.noOfRooms,
      image_Url: req.body.image_Url
    }

    adminController.addHotel(hotelData).then(result => {
      return res.status(201).send(result);
    }, err => {
      return res.status(400).send(err);
    }).catch(err => {
      return res.status(500).send({
        success: false,
        msg: err
      });
    })

  } else {
    return res.status(400).send({
      success: false,
      msg: "Invalid Data"
    });
  }
});

router.get('/getHotels', (req, res) => {
  adminController.getHotels().then(result => {
    return res.status(200).send(result);
  }, err => {
    return res.status(400).send(err);
  }).catch(err => {
    return res.status(500).send({
      success: false,
      msg: "Internal Error Occured"
    });
  })
})



module.exports = router;
