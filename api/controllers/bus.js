const mongoose = require('mongoose');

const Bus = require('../models/bus');

exports.buses_create_bus = (req,res,next)=>{
    if(req.userData.role!='admin'){
        res.status(401).json({
            message: 'Auth failed & not an admin'
        });
    }else{
        const bus = new Bus({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            drivernum: req.body.drivernum,
            date: req.body.date,
            source: req.body.source,
            destination: req.body.destination,
            seats: req.body.seats,
            price: req.body.price,
            departure: req.body.departure,
            arrival: req.body.arrival
        });
        bus.save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'Bus created'
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    }
}

exports.buses_get_all = (req,res,next)=>{
    if(req.userData.role!='admin'){
        res.status(401).json({
            message: 'Auth Failed Not an Admin'
        })
    }else{
        Bus.find()
        .select('_id name source destination departure date')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                buses: docs.map(doc=>{
                    return {
                        _id: doc._id,
                        name: doc.name,
                        source: doc.source,
                        destination: doc.destination,
                        date: doc.date,
                        departure: doc.departure,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:4000/bus/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    }
}

exports.buses_get_bus = (req,res,next)=>{
    const id = req.params.busId;
    Bus.findById(id)
    .select('_id name source destination departure arrival')
    .exec()
    .then(doc=>{
        console.log('From Database' ,doc);
        if(doc){
            res.status(200).json({
                bus: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/bus'
                }
            });
        }else{
            res.status(404).json({
                message: 'No Valid entry found for provided id'
            })
        }
    })
    .catch(err=>{
        console.log(err);
        err.status(500).json({
            error:err
        });
    });
}

exports.buses_delete_bus = (req,res,next)=>{
    const id = req.params.busId;
    if(req.userData.role!='admin'){
        res.status(401).json({
            message: 'Auth Failed & not an Admin'
        })
    }else{
        const id = req.params.busId;
        Bus.remove({ _id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Bus Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/bus',
                    body: { name: 'String', drivernum: 'String', source: 'String', destination: 'String', seats: 'Number', price: 'String', departure: 'String', arrival: 'String'}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    }
}