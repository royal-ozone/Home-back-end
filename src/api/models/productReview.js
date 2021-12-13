const client = require('../../db')


const addProductReview = async data => {
    try {
        let {profile_id, product_id,review,rate,votes} = data;
        let SQL = 'INSERT INTO product_review (profile_id,product_id,review,rate,votes) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
        let safeValues = [profile_id, product_id,review,rate,votes];
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};


const getProductReview = async id => {
    try {
        let SQL = 'SELECT * FROM product_review WHERE id=$1 OR product_id=$1;';
        let result = await client.query(SQL,[id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductReview = async data => {
    try {
        let {product_id, id} = data;
        let SQL = 'DELETE FROM product_review WHERE id=$2 OR Product_id=$1 RETURNING *;';
        let result = await client.query(SQL,[product_id, id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductReviewByProductId = async product_id => {
    try {
        let SQL = 'DELETE FROM product_review WHERE product_id=$1 RETURNING *;';
        let result = await client.query(SQL,[product_id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductReview = async (data) =>{
    try {
        let {review,rate,id} = data;
        let SQL = `UPDATE product_review SET review=$1,rate=$2 WHERE id=$3 RETURNING *;`;
        let safeValues = [review,rate,id];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
        
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addProductReview,getProductReview, deleteProductReview,updateProductReview,deleteProductReviewByProductId}