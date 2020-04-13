var express = require('express');
const userController = require('../controllers/user.controller.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//  Register the User
router.post('/register', userController.onRegister);

// Login the User
router.post('/login', (req, res, next) => {
  try {
    let userData = req.body;
    console.log("tt", req.body);
    if (!userData) {
      throw new Error("Credentials not valid");
    }
    userController.authenticate(userData).then(result => {
      return res.status(200).send(result);
    }, err => {
      return res.status(400).send(err);
    })

  } catch (err) {
    return res.status(500).send({
      success: false,
      msg: err
    });
  }
})

router.post('/bookHotel/:hotelId',(req,res)=>{
  try{
let hotel_Id = req.params.hotelId;
let userDetails = req.body;
userController.afterBooking(userDetails,hotel_Id).then(res=>{
  return res.status(200).send(res);
},err=>{
  return res.status(400).send(err);
})
  }catch(err){
    return res.status(500).send({
      success: false,
      msg: err
    })
  }
})

module.exports = router;
