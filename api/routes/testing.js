const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const msg = {
  to: 'rajat110898@gmail.com',
  from: 'bookings@allbus.com',
  subject: 'allBus Ticket',
  text: 'Congratulations!!! Your Ticket is Booked',
  html: '<img src="https://i.ibb.co/9ggf93X/logo.png" alt="allBus Logo" style="width:200px, display: flex, align-items:center,justify-content:center"><h3 style="font-size: 18px">Congratulations! Your ticket is booked</h3><h4 style="font-size: 16px">Ticket Details:</h4><span style="font-weight:700,font-size: 14px" >Booking Id:</span><p style="font-size: 14px">' + '</p><br></br><span style="font-weight:700,font-size: 14px" >Bus Name:</span><p style="font-size: 14px"></p><br></br><span style="font-weight:700,font-size: 14px" >Bus Id:</span><p style="font-size: 14px"></p><br></br><p style="font-size: 14px">You can check status your ticket PNR Status with booking Id <a href="https://all-bus-frontend.now.sh/checkpnrstatus">here</a></p><p style="font-size: 14px">Thanks for booking with us.</p><br></br><p style="font-weight: 600,font-size:14px"> In case of any queries<p><span style="font-weight:500,font-size:14px">Contact:</span> +917006903831<br></br><br></br>Visit website <a href="https://all-bus-frontend.now.sh">here</a>',
};

router.get('/',(req,res)=>{
  sgMail.send(msg);
  res.status(300).json('Mail sent');
})

module.exports = router;