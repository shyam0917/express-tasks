const User = require('../models/registration.entity');
const nodemailer = require("nodemailer");
const userModel = require('../models/registration.entity');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {

  onRegister: (req, res, next) => {
    if (req.body && req.body.name) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      user.save().then(data => {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
          }
        });

        var mailOptions = {
          from: process.env.NODEMAILER_USER,
          to: req.body.email,
          subject: `Contact name: ${req.body.name}`,
          html: `<h1>Thanks For Registration in Our QuickBook</h1>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            })
          } else {
            return res.status(200).json({
              success: true,
              message: 'Sent Successfully'
            })
          }
        });
      }).catch(err => {
        res.status(500).json({
          message: err.message,
          status: err.statusCode
        })
      })
    }
  },
  authenticate: (userData) => {
    return new Promise((resolve, reject) => {
      userModel.findOne({
        "email": userData.email
      }, (err, data) => {
        if (err) {
          reject({
            success: false,
            msg: err
          });
        } else if (!data) {
          reject({
            success: false,
            msg: "Invalid Credentials"
          });
        } else {
          data.comparePassword(userData.password, (err, isMatch) => {
            if (err) {
              reject({
                success: false,
                msg: err
              })
            } else {
              if (!isMatch) {
                reject({
                  success: false,
                  msg: "Invalid Credentials"
                });
              }
              let userDetails = {
                username: data.name,
                email: data.email,
                userId: data._id,
                role: data.role,
              }
              let userToken;
              userToken = jwt.sign(userDetails, config.secret, {
                expiresIn: 80 * 80
              })
              let userInfo = {
                authToken: userToken,
                email: data.email,
                name: data.name,
                _id: data._id,
                role: data.role,
              }
              resolve({
                success: true,
                msg: "User LoggedIn Successfully",
                data: userInfo
              });
            }
          })
        }

      })
    })
  }
}
