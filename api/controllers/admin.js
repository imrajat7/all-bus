const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.users_get_all = (req,res,next)=>{
    if(req.userData.isAdmin != '1'){
        res.status(401).json({
            message: 'Auth Failed Not an admin'
        })
    }else{
        User.find()
        .select('name email booking _id')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                users: docs.map(doc=>{
                    return {
                        _id: doc._id,
                        name: doc.name,
                        email: doc.email,
                        booking: doc.bookings,
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

exports.users_get_user = (req,res,next)=>{
    if(req.userData.isAdmin!=1){
        res.status(401).json({
            message: 'Auth Failed'
        })
    }else{
        const id = req.params.userId;
        User.findById(id)
        .select('name email _id')
        .exec()
        .then(doc=>{
            if(doc){
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4000/admin/"
                    }
                });
            }else{
                res.status(404).json({
                    message: 'No valid entry'
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
    }
}

exports.users_delete_user = (req,res,next)=>{
    if(req.userData.isAdmin!=1){
        res.status(401).json({
            message: 'Auth Failed'
        })
    }else{
        const id = req.params.userId;
        User.remove( { _id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/user/signup',
                    body: { name: 'String', email: 'String', password: 'String'}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
    }
}

