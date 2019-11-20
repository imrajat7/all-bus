const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/user');

router.post('/signup',UserController.user_signup);

router.get('/signup',(req,res,next)=>{
    res.status(200).json({
        message: 'I am here!!!!!'
    })
})

router.post('/login', UserController.user_login);

module.exports = router;