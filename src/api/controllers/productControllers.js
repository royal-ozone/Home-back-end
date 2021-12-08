const {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct} = require('../models/products');


const addProductHandler = async(req, res, next) => {
    try {
        let result = await addProduct(req.body)
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllProductHandler = async(req, res, next) => {
    try {
        let result = await getAllProduct()
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await getProduct(id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await updateProduct(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await deleteProduct(id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductStatusHandler = async(req, res, next) => {
    try {
        let id = req.params.id;
        let result = await updateProductStatus(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler}