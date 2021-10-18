'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');


// Global middleware
// router.use(bearer);


// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
