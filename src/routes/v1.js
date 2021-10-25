'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');
const {
  createStoreHandler,
  updateStoreHandler
} = require('../api/controllers/storesController');

// Global middleware
router.use(bearer);


// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});


router.post('/store', createStoreHandler);
router.put('/store', updateStoreHandler);




module.exports = router;
