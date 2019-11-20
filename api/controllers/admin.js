const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.admin_listall = (req,res,next)=>{
    if(req.userData.isAdmin != '1'){
        res.status(401).json({
            message: 'Auth Failed'
        })
    }else{
        User.find()
        .select('name email booking status')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                users: docs.map(doc=>{
                    return {
                        name: doc.name,
                        email: doc.email,
                        booking: doc.bookings,
                        _id: doc._id,
                        request: {
                            type: 'GET'
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
        })
    }
}