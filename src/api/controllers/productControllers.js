const {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct} = require('../models/products');
const {deleteProductReviewByProductId} = require('../models/productReview')
const {deleteProductTagByProductId} = require('../models/productTag')
const {deleteProductRatingByProductId} = require('../models/productRating')


const addProductHandler = async(req, res, next) => {
    try {
        let result = await addProduct({store_id: req.user.store_id,...req.body})
        res.status(201).json(result)
    } catch (error) {
      res.send(error.message)
    }
};

const getAllProductHandler = async(req, res, next) => {
    try {
        let result = await getAllProduct()
        res.status(200).json(result)
    } catch (error) {
      res.send(error.message)
    }
}

const getProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await getProduct(id);
        res.status(200).json(result);
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await updateProduct(id, {store_id: req.user.store_id,...req.body});
        res.status(200).json(result);
    } catch (error) {
      res.send(error.message)
    }
}

const deleteProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        await deleteProductReviewByProductId(id);
        await deleteProductTagByProductId(id);
        await deleteProductRatingByProductId(id);
        let result = await deleteProduct(id);
        res.status(200).json(result);
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductStatusHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await updateProductStatus(id, req.body);
        res.status(200).json(result);
    } catch (error) {
      res.send(error.message)
    }
}

module.exports = {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler}