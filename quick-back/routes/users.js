var express = require('express');
const register = require('../controllers/registration.controller.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//  Register the User
router.post('/register', register.onRegister);
router.post('/login', (req, res, next) => {

})

module.exports = router;
