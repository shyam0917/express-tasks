var express = require('express');
const register = require('../controllers/registration.controller.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//  Register the User
router.post('/register', register.onRegister);

// Login the User
router.post('/login', (req, res, next) => {
  try {
    let userData = req.body;
    console.log("tt", req.body);
    if (!userData) {
      throw new Error("Credentials not valid");
    }
    register.authenticate(userData).then(result => {
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

module.exports = router;
