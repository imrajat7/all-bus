const express = require('express');
const router = express.Router();

router.get('',(req,res,next)=>{
    res.status(200).json({
        message: "Hello Welcome to the all-bus api"
    })
})

module.exports = router;