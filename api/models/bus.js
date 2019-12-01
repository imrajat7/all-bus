const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required:true },
    drivernum: { type: String},
    date: { type: Date},
    source: { type: String, required: true },
    destination: { type: String, required: true},
    seats: { type: Number},
    price: { type: String},
    departure: { type: String},
    arrival: { type: String}
});

module.exports = mongoose.model('Bus', busSchema);