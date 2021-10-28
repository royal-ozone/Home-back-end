const express = require('express');
const v1Router = express.Router();

const {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler} = require('./controllers/productControllers')
const { addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler} = require('./controllers/tagController')
const {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler} = require('./controllers/productTagController')

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

v1Router.post('/product/tag',addProductTagHandler )
v1Router.get('/product/tag/:id', getProductTagsHandler)
v1Router.delete('/product/tag/:id', deleteProductTagHandler)
v1Router.put('/product/tag/:id', updateProductTagsHandler)


module.exports = v1Router