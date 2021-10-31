'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');


const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');

const {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler} = require('../api/controllers/addressControllers')
const {addCartHandler,addCartItemHandler} = require('../api/controllers/cartControllers');


const {checkAdmin,checkMod,checkAuth,checkStoreAuth,checkBan} = require ('../auth/middleware/acl')
const {
  createStoreRequestHandler,
  // updateStoreRequestHandler,
  // deleteStoreRequestHandler,
  createStoreHandler,
  updateStoreHandler,
  deleteStoreHandler
} = require('../api/controllers/storesController');


// Global middleware
router.use(bearer);

router.post('/add/PG',bearer,checkAdmin,addParentCategory);
router.delete('/remove/PG/:idPG',bearer,checkAdmin,removeParentCategory);
router.put('/update/PG/:idPG',bearer,checkAuth,updateParentCategory);
router.get('/get/PG/:idPG',bearer,checkAuth,getParentCategoryById);
router.get('/getAll/PG',bearer,getAllParentCategory);
router.get('/search/title/PG',bearer,getParentCategoryByTitle);


router.post('/add/CG',bearer,checkAuth,addChildCategory);
router.delete('/remove/CG/:idCG',bearer,checkAuth,removeChildCategory);
router.put('/update/CG/:idCG',bearer,checkAuth,updateChildCategory);
router.get('/get/CG/:idCG',bearer,checkAuth,getChildCategoryById);
router.get('/getAll/CG',bearer,getAllChildCategory);
router.get('/search/title/CG',bearer,getChildCategoryByTitle);


router.post('/add/GCG',bearer,checkAuth,addGrandChildCategory);
router.delete('/remove/GCG/:idGCG',bearer,checkAuth,removeGrandChildCategory);
router.put('/update/GCG/:idGCG',bearer,checkAuth,updateGrandChildCategory);
router.get('/get/GCG/:idGCG',bearer,checkAuth,getGrandChildCategoryById);
router.get('/getAll/GCG',bearer,getAllGrandChildCategory);
router.get('/search/title/GCG',bearer,getGrandChildCategoryByTitle);


router.post('/add/address',bearer,addAddressHandler);
router.delete('/remove/address/:id',bearer,removeAddressHandler);
router.put('/update/address/:id',bearer,updateAddressHandler);
router.get('/getAll/address',bearer,getAllAddressHandler);

router.post('/add/cart',bearer,addCartHandler);
router.post('/add/cart_item',bearer,addCartItemHandler);


// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});

// router.get('/store/request',checkAuth, getAllStoreRequestHandler);
// router.get('/store/request/:storeId', getOneStoreRequestHandler);
router.post('/store/request', createStoreRequestHandler);
// router.put('/store/request', updateStoreRequestHandler);
// router.delete('/store/request/:storeId', deleteStoreRequestHandler);

router.post('/store',checkAuth, createStoreHandler);
router.put('/store',checkStoreAuth,updateStoreHandler);
router.delete('/store/:storeId', deleteStoreHandler);




module.exports = router;
