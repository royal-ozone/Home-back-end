const express = require('express');
const v1Router = express.Router();

const {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler} = require('./controllers/productControllers')
const {addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler} = require('./controllers/tagController')
const {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler} = require('./controllers/productTagController')
const {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler} = require('./controllers/productReviewController')
const {addProductRatingHandler, getProductRatingHandler, deleteProductRatingHandler, updateProductRatingHandler} = require('./controllers/productRating')

v1Router.post('/tag',addTagHandler)
v1Router.get('/tag/:id',getTagHandler)
v1Router.delete('/tag/:id',deleteTagHandler)
v1Router.put('/tag/:id', updateTagHandler)
v1Router.get('/tag', getAllTagsHandler)

v1Router.post('/product', addProductHandler)
v1Router.get('/product', getAllProductHandler)
v1Router.get('/product/:id', getProductHandler)
v1Router.put('/product/:id', updateProductHandler)
v1Router.put('/product/status/:id', updateProductStatusHandler)
v1Router.delete('/product/:id', deleteProductHandler)

v1Router.post('/product/tag',addProductTagHandler)
v1Router.get('/product/tag/:id', getProductTagsHandler)
v1Router.delete('/product/tag/:id', deleteProductTagHandler)
v1Router.put('/product/tag/:id', updateProductTagsHandler)

v1Router.post('/product/review',addProductReviewHandler)
v1Router.get('/product/review/:id', getProductReviewHandler)
v1Router.delete('/product/review/:id', deleteProductReviewHandler)
v1Router.put('/product/review/:id', updateProductReviewHandler)

v1Router.post('/product/rating',addProductRatingHandler)
v1Router.get('/product/rating/:id', getProductRatingHandler)
v1Router.delete('/product/rating/:id', deleteProductRatingHandler)
v1Router.put('/product/rating/:id', updateProductRatingHandler)

module.exports = v1Router