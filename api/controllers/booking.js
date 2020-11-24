const mongoose = require('mongoose');
const Booking = require('../models/booking');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'rajat110898@gmail.com',
    from: 'bookings@allbus.com',
    subject: 'allBus Ticket',
    text: 'Congratulations!!! Your Ticket is Booked',
    html: '<p>Congratulations!!! Your Ticket is Booked</p>',
};

exports.booking_create_booking = (req,res,next)=>{
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        busId: req.body.busId,
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        contactNo: req.body.contactNo,
        address: req.body.address,
        numOfSeats: req.body.numOfSeats,
        payment: 'done'
    });
    booking.save()
    .then(result=>{
        console.log(result);

        msg.to = result.email;
        msg.html = '<img src="https://i.ibb.co/9ggf93X/logo.png" alt="allBus Logo" style="width:150px"><h3 style="font-size: 18px">Congratulations! Your ticket is booked</h3><h4 style="font-size: 16px">Ticket Details:</h4><span style="font-weight:700,font-size: 14px" >Booking Id:</span><p style="font-size: 14px">' + booking._id + '</p><br></br><span style="font-weight:700,font-size: 14px" >Bus Name:</span><p style="font-size: 14px">' + result.name + '</p><br></br><span style="font-weight:700,font-size: 14px" >Bus Id:</span><p style="font-size: 14px">' + result.busId + '</p><br></br><p style="font-size: 14px">You can check status your ticket PNR Status with booking Id <a href="https://all-bus-frontend.now.sh/checkpnrstatus">here</a></p><p style="font-size: 14px">Thanks for booking with us.</p><br></br><p style="font-weight: 600,font-size:14px"> In case of any queries<p><span style="font-weight:500,font-size:14px">Contact:</span> +917006903831<br></br><br></br>Visit website <a href="https://all-bus-frontend.now.sh">here</a>';
        sgMail.send(msg);

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
        .select('_id date name busId userId email payment')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                bookings: docs.map(doc=>{
                    return {
                        _id: doc.id,
                        date: doc.date,
                        name: doc.name,
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

exports.bookings_get_booking_by_name = (req,res,next)=>{
    const name = req.params.name;
    Booking.find({name})
    .select('_id date busId name email payment')
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