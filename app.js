const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const busRoutes = require('./api/routes/bus');
const bookingRoutes = require('./api/routes/booking');
const searchRoutes = require('./api/routes/search');

mongoose.connect(
    "mongodb+srv://all-bus:" + 
    process.env.MONGO_ATLAS_PW + 
    "@all-bus-luhf5.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
);

let db = mongoose.connection;

db.once('open',()=>{
    console.log('Db connected sucessfully');
});

db.on('error',(err)=>{
    console.log(err);
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Handling Routes
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/bus',busRoutes);
app.use('/booking',bookingRoutes);
app.use('/search',searchRoutes);


app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;