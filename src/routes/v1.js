'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');
const {checkAdmin,checkMod,checkAuth,checkStoreAuth} = require ('../auth/middleware/acl')
const {
  getAllStoreRequestHandler,
  createStoreRequestHandler,
  // updateStoreRequestHandler,
  // deleteStoreRequestHandler,
  createStoreHandler,
  updateStoreHandler,
  deleteStoreHandler
} = require('../api/controllers/storesController');

// Global middleware
router.use(bearer);


// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});

router.get('/store/request',checkAuth, getAllStoreRequestHandler); //tested
// router.get('/store/request/:storeId', getOneStoreRequestHandler);
router.post('/store/request', createStoreRequestHandler);
// router.put('/store/request', updateStoreRequestHandler);
// router.delete('/store/request/:storeId', deleteStoreRequestHandler);

router.post('/store',checkAuth, createStoreHandler);
router.put('/store',checkStoreAuth,updateStoreHandler);
router.delete('/store/:storeId', deleteStoreHandler);




module.exports = router;
