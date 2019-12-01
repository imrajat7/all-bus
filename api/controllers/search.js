var mongoose = require('mongoose');

var Bus = require('../models/bus');

exports.buses_get_bus = (req,res,next)=>{
    Bus.find({
        source: req.body.source.toLowerCase(),
        destination: req.body.destination.toLowerCase(),
        // date: req.body.date
    })
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            buses: docs.map(doc=>{
                return {
                    _id: doc._id,
                    name: doc.name,
                    date: doc.date,
                    source: doc.source,
                    destination: doc.destination,
                    seats: doc.seats,
                    price: doc.price,
                    departure: doc.departure,
                    arrival: doc.arrival,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:4000/bus/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}