const {addProductRating, updateProductRating,getProductRating,deleteProductRating} = require('../models/productRating');

const addProductRatingHandler = async (req, res) =>{
    try {
        let result = await addProductRating(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(403).send(error.message)
    }
};

const getProductRatingHandler = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await getProductRating(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteProductRatingHandler = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await deleteProductRating(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateProductRatingHandler = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await updateProductRating(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = {addProductRatingHandler, getProductRatingHandler, deleteProductRatingHandler, updateProductRatingHandler}