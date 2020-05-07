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

// Book hotel
router.post('/bookHotel/:hotelId',(req,res)=>{
  try{
let hotel_Id = req.params.hotelId;
let userDetails = req.body;
console.log("Ttt",userDetails);
userController.afterBooking(userDetails,hotel_Id).then(resp=>{
  return res.status(200).send(resp);
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

// get Hotels booked by user
router.get('/getHotels/:userId',(req,res)=>{
  try{
let userId = req.params.userId;
userController.getMyHotels(userId).then(resp=>{
  return res.status(200).send(resp);
},err=>{
  return res.status(400).send(err);
})
  }catch(error){
    return res.status(500).send({
      success: false,
      msg: error
    })
  }
})

// get Hotels based on query Facilities
router.get('/getHotelsbyFilter',(req,res)=>{
  try{
userController.getFilteredHotels(req).then(resp=>{
  return res.status(200).send(resp);
},err=>{
  return res.status(400).send(err);
})
  }catch(error){
    return res.status(500).send({
      success: false,
      msg: error
    })
  }
})

// get All Hotels 
router.get('/allHotels',(req,res)=>{
  try{
    userController.getAllHotels(req).then(resp=>{
      return res.status(200).send(resp);
    },err=>{
      return res.status(400).send(err);
    })
      }catch(error){
        return res.status(500).send({
          success: false,
          msg: error
        })
      }
})


// add user comments 
router.post('/addComment',(req,res)=>{
  try{
    let userFeedback = req.body;
    userController.userFeedback(userFeedback).then(resp=>{
      return res.status(200).send(resp);
    },err=>{
      return res.status(400).send(err);
    })
      }catch(error){
        return res.status(500).send({
          success: false,
          msg: 'Internal Error Occured'
        })
      }
})


module.exports = router;
