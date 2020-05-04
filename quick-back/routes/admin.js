var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller');

/* Add hotel Data */
router.post('/addHotel', (req, res, next) => {
  if (req.body) {
    let hotelData = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      rating: req.body.rating,
      description: req.body.description,
      checkinDetails: req.body.checkinDetails,
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
  }).catch(error => {
    return res.status(500).send({
      success: false,
      msg: "Internal Error Occured"
    });
  })
})

router.post('/addHotelRoom/:hotelId',(req,res)=>{
  try{
let hotelId = req.params.hotelId;
let roomDetails = req.body;
  adminController.addRoom(hotelId,roomDetails).then(result=>{
    return res.status(200).send(result);
  },err=>{
    return res.status(400).send(err);
  })
}catch(error){
    return res.status(500).send({
      success: false,
      msg: "Internal Error Occured"
    });
  }
})



module.exports = router;



// {
//   "_id" : ObjectId("5e8b11f945023b1f7010556c"),
//   "name" : "Hotel Samrat",
//   "address" : "East Rohini",
//   "city" : "Gurgaon",
//   "noOfRooms" : [ 
//       {
//           "facilities" : [ 
//               "Fully AC", 
//               "Free Breakfast", 
//               "Laundary"
//           ],
//           "_id" : ObjectId("5e8b11f945023b1f7010556d"),
//           "roomNo" : 101,
//           "noOfPersons" : 1,
//           "isBooked" : true
//       }, 
//       {
//           "facilities" : [ 
//               "Fully AC", 
//               "Free Breakfast", 
//               "Laundary"
//           ],
//           "_id" : ObjectId("5e99627f4df75e3b147bac4a"),
//           "roomNo" : 102,
//           "noOfPersons" : 4,
//           "isBooked" : true
//       }, 
//       {
//           "facilities" : [ 
//               "Fully AC", 
//               "Free Breakfast", 
//               "Laundary", 
//               "Car Parking"
//           ],
//           "_id" : ObjectId("5ea434e38f46a6059cd387c9"),
//           "roomNo" : 202,
//           "noOfPersons" : 2,
//           "isBooked" : false
//       }
//   ],
//   "image_Url" : "",
//   "__v" : 2
// }