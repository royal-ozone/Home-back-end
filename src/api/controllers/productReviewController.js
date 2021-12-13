const events = require('../../socket/event');
const {addProductReview,getProductReview, deleteProductReview,updateProductReview} = require('../models/productReview');
const {addProductRating, updateProductRating,getProductRating,deleteProductRating,deleteProductRatingByProductId} = require('../models/productRating')

const addProductReviewHandler = async (req, res) => {
    try {
        const result = await addProductReview({profile_id:req.user.profile_id,...req.body});
        if (result.id){
            const result2 = await getProductRating(req.body.product_id)
            let x = await getProductReview(req.body.product_id)
            let sum = 0;
            x.forEach(val=>{
                sum += Number(val.rate);
            })
            let rating = (sum/x.length).toFixed(2)
            if(result2){
                await updateProductRating({product_id: req.body.product_id, rating: rating, votes: x.length}) 
            } else{
               await addProductRating({product_id: req.body.product_id, rating: rating, votes: x.length})
            }
            events.emit('productReview', result);
            res.status(201).json(result);
        } else{
            res.status(403).send('something went wrong while adding product review');
        }
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
        let result = await deleteProductReview(req.body)
        if(result.length > 0) {
            let x = await getProductReview(result[0].product_id)
            let sum = 0;
            x.forEach(val=>{
                sum += Number(val.rate);
            })
            let rating = (sum/x.length).toFixed(2)
            await updateProductRating({product_id: result[0].product_id, rating: rating, votes: x.length}) 
            res.status(200).json({message: 'it has been deleted',result})
        } else{
            res.status(403).send('something went wrong')
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
}

const updateProductReviewHandler = async (req, res) => {
    try {
        let result = await updateProductReview(req.body)
        if(result.id){
            let x = await getProductReview(result.product_id)
            let sum = 0;
            x.forEach(val=>{
                sum += Number(val.rate);
            })
            let rating = (sum/x.length).toFixed(2)
            await updateProductRating({product_id: result.product_id, rating: rating, votes: x.length}) 
            res.status(200).json({message: 'Review has been updated',...result})
        } else {
            res.status(403).send('something went wrong while updating product review')
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
}
 

module.exports = {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler}