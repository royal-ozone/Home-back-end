const {addProductReview,getProductReview, deleteProductReview,updateProductReview} = require('../models/productReview');


const addProductReviewHandler = async (req, res) => {
    try {
        const result = await addProductReview(req.body)
        res.status(201).json(result)
        
    } catch (error) {
        res.status(403).send(error.message);
    }
};

const getProductReviewHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getProductReview(id);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).send(error.message);
    }
}

const deleteProductReviewHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await deleteProductReview(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(403).send(error.message);
    }
}

const updateProductReviewHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await updateProductReview(id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(403).send(error.message);
    }
}
 

module.exports = {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler}