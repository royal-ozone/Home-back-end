const events = require('../../socket/event');
const { addProductReview, getProductReview, deleteProductReview, updateProductReview, updateOrderItemRate, getProductReviews } = require('../models/productReview');
const { addProductRating, updateProductRating, getProductRating, deleteProductRating, deleteProductRatingByProductId } = require('../models/productRating');
const { reset } = require('nodemon');

const addProductReviewHandler = async (req, res) => {
    try {
        let result = await addProductReview(req.body)
        if (result) {
            let orderItem = await updateOrderItemRate(result.order_item_id);
            res.send({ status: 200, data: orderItem });
        } else {
            res.send({ status: 403, message: result })
        }
    } catch (error) {
        res.send({ status: 403, message: error });
    }
};

const getProductReviewHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getProductReview(id);
        res.status(200).json(result)
    } catch (error) {
        res.send({ status: 403, message: error });
    }
}

const deleteProductReviewHandler = async (req, res) => {
    try {
        let result = await deleteProductReview(req.body)
        if (result.length > 0) {
            let x = await getProductReview(result[0].product_id)
            let sum = 0;
            x.forEach(val => {
                sum += Number(val.rate);
            })
            let rating = (sum / x.length).toFixed(2)
            await updateProductRating({ product_id: result[0].product_id, rating: rating, votes: x.length })
            res.status(200).json({ message: 'it has been deleted', result })
        } else {
            res.status(403).send('something went wrong')
        }
    } catch (error) {
        res.send({ status: 403, message: error });
    }
}

const updateProductReviewHandler = async (req, res) => {
    try {
        let result = await updateProductReview(req.body)
        if (result.id) {
            let x = await getProductReview(result.product_id)
            let sum = 0;
            x.forEach(val => {
                sum += Number(val.rate);
            })
            let rating = (sum / x.length).toFixed(2)
            await updateProductRating({ product_id: result.product_id, rating: rating, votes: x.length })
            res.status(200).json({ message: 'Review has been updated', ...result })
        } else {
            res.status(403).send('something went wrong while updating product review')
        }
    } catch (error) {
        res.send({ status: 403, message: error });
    }
}

const getProductReviewsHandler = async (req, res) => {
    try {
        let result = await getProductReviews({ id: req.params.id, ...req.query })
        console.log("🚀 ~ file: productReviewController.js:73 ~ getProductReviewsHandler ~ result:", result)
        res.send({ status: 200, data: result })
    } catch (error) {
        res.send({ status: 403, message: error });
    }
}

const routes = [
    {
        path: '/product/reviews/:id',
        method: 'get',
        auth: false,
        fn: getProductReviewsHandler,
        type: 'user'
    },
    {
        path: '/product/reviews/:id',
        method: 'get',
        fn: getProductReviewsHandler,
        type: 'admin'
    },
    {
        path: '/product/review',
        method: 'post',
        auth: true,
        fn: addProductReviewHandler,
        type: 'user'
    },

]
module.exports = {
    addProductReviewHandler,
    getProductReviewHandler,
    deleteProductReviewHandler,
    updateProductReviewHandler,
    getProductReviewsHandler,
    routes
}