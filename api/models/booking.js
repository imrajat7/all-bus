const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    busId: {type:String},
    userId: { type: String },
    email: { type: String },
    contactNo: { type: String},
    numOfSeats: { type: Number },
    date: { type: String,
        default:Date().substr(0,24) 
    },
    payment: { type: String },
})

module.exports = mongoose.model('Booking', bookingSchema);