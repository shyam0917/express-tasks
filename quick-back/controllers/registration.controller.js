const User = require('../models/registration.entity');
const nodemailer = require("nodemailer");

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
  }
}
