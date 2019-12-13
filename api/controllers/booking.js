const mongoose = require('mongoose');
const Booking = require('../models/booking');

exports.booking_create_booking = (req,res,next)=>{
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        busId: req.body.busId,
        userId: req.body.userId,
        email: req.body.email,
        contactNo: req.body.contactNo,
        numOfSeats: req.body.numOfSeats,
        payment: 'done'
    });
    booking.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            bookingId: result._id,
            message: 'Booking Done'
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.bookings_get_all = (req,res,next)=>{
    if(req.userData.role!='admin'){
        res.status(401).json({
            message: 'You are not the right person to access this'
        });
    }else{
        Booking.find()
        .select('_id date busId userId email payment')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                bookings: docs.map(doc=>{
                    return {
                        _id: doc.id,
                        date: doc.date,
                        busId: doc.busId,
                        userId: doc.userId,
                        email: doc.email,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:4000/booking/' + doc._id
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
            });
        });
    }
}

exports.bookings_get_booking = (req,res,next)=>{
    const bookingId = req.params.bookingId;
    Booking.findById(bookingId)
    .select('_id date busId userId email payment')
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                booking: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/booking/'
                }
            })
        }else{
            res.status(404).json({
                message: 'No valid entry for provided booking id'
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });   
}

exports.bookings_delete_booking = (req,res,next)=>{
    if(req.userData.role!='admin'){
        req.status(401).json({
            message: 'Auth Failed & you are not an admin'
        })
    }else{
        const id = req.params.bookingId;
        Booking.remove({ _id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Booking Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/booking',
                    body: { busId: 'String', numOfSeats: 'Number'}
                }
            })
        })
        .catch(err=>{
            consolr.log(err);
            res.status(500).json({
                error: err
            })
        });
    }
}