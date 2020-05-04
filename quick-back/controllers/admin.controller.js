const Hotel = require('../models/hotel.entity');


module.exports = {

  addHotel: (hotelData) => {
    return new Promise((resolve, reject) => {
      if (!hotelData) {
        return reject({
          success: false,
          msg: "Invalid Data"
        })
      }
      const hotel = new Hotel(hotelData);
      hotel.save().then(data => {
        return resolve({
          success: true,
          msg: "Hotel Added Successfully"
        });
      }).catch(err => {
        return reject({
          success: false,
          msg: err
        })
      })
    })
  },

  addRoom: (hotelId, roomDetails)=>{
return new Promise((resolve,reject) =>{
Hotel.findById(hotelId).then(doc=>{
  doc.noOfRooms.push(roomDetails);
  doc.save().then(data=>{
    return resolve({
      success: true,
      msg: "Room Added Successfully"
    })
  })

}).catch(err=>{
  return reject({
    success: false,
    msg: err
  })
})

})
  },

  getHotels: () => {
    return new Promise((resolve, reject) => {
      Hotel.find().then(res => {

        if (!res) {
          return resolve({
            success: true,
            data: "No Data Available"
          })
        }
        return resolve({
          success: true,
          data: res
        });
      }, err => {
        return reject({
          success: false,
          msg: err
        })
      }).catch(err => {
        return reject({
          success: false,
          msg: err
        })
      })
    })
  }

}
