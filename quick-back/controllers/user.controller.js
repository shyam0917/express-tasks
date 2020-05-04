const User = require('../models/registration.entity');
const Hotel = require('../models/hotel.entity');
const Booking = require('../models/booking.entity');
const nodemailer = require("nodemailer");
const userModel = require('../models/registration.entity');
const config = require('../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
  },

  getMyHotels: (data1) => {
    return new Promise((resolve, reject) => {
      Booking.find({ email: data1 }, (err, data) => {
        if (err) {
          return reject({
            success: false,
            msg: err
          })
        }
        let myHotelArr = [];
        data.forEach((item, index) => {
          let room_Id = mongoose.Types.ObjectId(item.roomId);
          Booking.aggregate([
            { $match: { "roomId": item.roomId } },
            {
              $lookup:
              {
                from: "hotels",
                localField: "hotel",
                foreignField: "_id",
                as: "hotel"
              }
            },
            { "$unwind": "$hotel" },
            { "$unwind": "$hotel.noOfRooms" },
            { "$match": { "hotel.noOfRooms._id": room_Id } },

          ]).then(dat => {
            myHotelArr.push(dat[0]);
            if (index == data.length - 1) {
              return resolve({
                success: true,
                data: myHotelArr
              })
            }
          })

        })


      })
    })
  },

  afterBooking: (bookingDetails, hotelId) => {
    return new Promise((resolve, reject) => {
  Hotel.findOne({ _id: hotelId }).then(data=>{
    data.update({ "noOfRooms": {$elemMatch :{categoryType : bookingDetails.categoryType}} }, { $pop: { "noOfRooms.$.availableRooms": 1 } }, (err, hotel) => {
      if (err) {
        reject({
          success: false,
          msg: err
        });
      }

      console.log("Gggg",hotel);
    })
  });
    return;
      hotl.update({ "noOfRooms.categoryType": bookingDetails.categoryType }, { $pop: { "noOfRooms.$.availableRooms": 1 } }, (err, data) => {
        if (err) {
          reject({
            success: false,
            msg: err
          });
        }
      })

      console.log("Ggg",data);
 
      // const booking = new Booking({
      //   email: bookingDetails.email,
      //   hotel: hotelId,
      //   roomId: bookingDetails.roomId,
      //   role: bookingDetails.role
      // })


      // booking.save().then(data => {
      //   resolve({
      //     success: true,
      //     msg: "Booking Done Successfully",
      //   })
      // }).catch(err => {
      //   reject({
      //     success: false,
      //     msg: err
      //   })
      // })

    })
  },

  // get all hotels
  getAllHotels: () => {
    return new Promise((resolve, reject) => {

      Hotel.find().then(data=>{
        resolve({
          success: true,
          msg: "Data get Successfully",
          data: data
        })
      }).catch(err=>{
              reject({
          success: false,
          msg: err
        })  
      })
      // Hotel.aggregate([
      //   {
      //     $project: {
      //       "address": 1,
      //       "name": 1,
      //       "city": 1,
      //       noOfRooms: {
      //         $filter: {
      //           input: "$noOfRooms",
      //           as: "noOfRooms",
      //           cond: { $eq: ["$$noOfRooms.isBooked", false] }
      //         }
      //       }
      //     }
      //   }
      // ]).then(data => {
      //   resolve({
      //     success: true,
      //     msg: "Data get Successfully",
      //     data: data
      //   })
      // }, err => {
      //   reject({
      //     success: false,
      //     msg: err
      //   })
      // })
    })
  },

  // get filtered hotels by facilities
  getFilteredHotels: (request) => {
    return new Promise((resolve, reject) => {
      let Faciliti = request.query.facilities;
      Hotel.aggregate([{ $unwind: "$noOfRooms" },
      {
        $match: {
          "$and": [{ "noOfRooms.isBooked": false },
          { "noOfRooms.facilities": { $all: JSON.parse(Faciliti) } }]
        }
      },
      {
        $group: {
          "_id": "$_id",
          "address": { "$first": "$address" },
          "city": { "$first": "$city" },
          "name": { "$first": "$name" },
          "noOfRooms": {
            "$push": "$noOfRooms"
          }
        }
      }
      ]).then(data => {
        resolve({
          success: true,
          msg: "Data get Successfully",
          data: data
        })
      }, err => {
        reject({
          success: false,
          msg: err
        })
      })


      // Elem Match the mongoose way
      // Hotel.find().elemMatch("noOfRooms", function (elem) {
      //   if (Faciliti.length) {
      //     console.log(elem.where('facilities').in(JSON.parse(f)));
      //   }

      // }).then(data => {
      //   if (data) {
      //     console.log("ff", data);
      //   }

      // })

      // Hotel.aggregate([{
      //  $filter: { "noOfRooms": { $elemMatch: { facilities: { $all: JSON.parse(Faciliti) } } } } 
      // }]).then(data=>{
      //   console.log("Fff",data);
      // })



      // Hotel.find({ "noOfRooms": { $elemMatch: { facilities: { $all: JSON.parse(Faciliti) } } } }, (err, data) => {
      //   if (err) {
      //     reject({
      //       success: false,
      //       msg: err
      //     })
      //   }
      //   if (data) {
      //     resolve({
      //       success: true,
      //       msg: "Data get Successfully",
      //       data: data
      //     })
      //   }


      // })

    })

  }


}


