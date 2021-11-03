'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');


const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');


const {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler} = require('../api/controllers/addressControllers')
const {addCartHandler,addCartItemHandler,removeCartItemHandler,getAllCartItemHandler,getAllCartHandler} = require('../api/controllers/cartControllers');
const {addOrderHandler} = require('../api/controllers/orderControllers');



const {checkAdmin,checkMod,checkAuth,checkStoreAuth,checkBan} = require ('../auth/middleware/acl')
const {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler} = require('../api/controllers/productControllers')
const {addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler} = require('../api/controllers/tagController')
const {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler} = require('../api/controllers/productTagController')
const {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler} = require('../api/controllers/productReviewController')
const {addProductRatingHandler, getProductRatingHandler, deleteProductRatingHandler, updateProductRatingHandler} = require('../api/controllers/productRating')
const  {createStoreHandler,getStoreHandler,deleteStoreHandler,updateStoreHandler,updateStoreNameHandler,getAllStoresHandler,getStoreByStatusHandler,updateStoreStatusHandler,getStoreByNameHandler,getAllStoreReviewHandler,getStoreReviewHandler,createStoreReviewHandler,updateStoreReviewHandler,deleteStoreReviewHandler} = require('../api/controllers/storesController')

// Global middleware
router.use(bearer);


router.post('/store', createStoreHandler);
router.put('/store',checkStoreAuth,updateStoreHandler);
router.delete('/store',checkStoreAuth, deleteStoreHandler);
router.get('/store', getStoreHandler);
router.put('/store/name',checkStoreAuth, updateStoreNameHandler);
router.put('/store/status',checkAuth, updateStoreStatusHandler);
router.get('/store/all', getAllStoresHandler)
router.get('/store/status/:status',checkAuth, getStoreByStatusHandler)
router.get('/store/name/:name', getStoreByNameHandler)

router.get('/store/review', getAllStoreReviewHandler)
router.get('/store/review/:id', getStoreReviewHandler)
router.post('/store/review',createStoreReviewHandler)
router.put('/store/review/:id', updateStoreReviewHandler)
router.delete('/store/review/:id', deleteStoreReviewHandler)

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
router.delete('/remove/cart_item',bearer,removeCartItemHandler);
router.get('/getAll/cart_item',bearer,getAllCartItemHandler);
router.get('/getAll/cart',bearer,getAllCartHandler); 

router.post('/add/order',bearer,addOrderHandler);



router.post('/tag',addTagHandler)
router.get('/tag/:id',getTagHandler)
router.delete('/tag/:id',deleteTagHandler)
router.put('/tag/:id', updateTagHandler)
router.get('/tag', getAllTagsHandler)

router.post('/product', addProductHandler)
router.get('/product', getAllProductHandler)
router.get('/product/:id', getProductHandler)
router.put('/product/:id', updateProductHandler)
router.put('/product/status/:id', updateProductStatusHandler)
router.delete('/product/:id', deleteProductHandler)

router.post('/product/tag',addProductTagHandler)
router.get('/product/tag/:id', getProductTagsHandler)
router.delete('/product/tag/:id', deleteProductTagHandler)
router.put('/product/tag/:id', updateProductTagsHandler)

router.post('/product/review',addProductReviewHandler)
router.get('/product/review/:id', getProductReviewHandler)
router.delete('/product/review/:id', deleteProductReviewHandler)
router.put('/product/review/:id', updateProductReviewHandler)

router.post('/product/rating',addProductRatingHandler)
router.get('/product/rating/:id', getProductRatingHandler)
router.delete('/product/rating/:id', deleteProductRatingHandler)
router.put('/product/rating/:id', updateProductRatingHandler)



// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});


module.exports = router;
