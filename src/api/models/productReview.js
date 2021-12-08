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
        let SQL = 'SELECT * FROM product_review WHERE product_id=$1;';
        let result = await client.query(SQL,[id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductReview = async id => {
    try {
        let SQL = 'DELETE FROM product_review WHERE id=$1;';
        let result = await client.query(SQL,[id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductReview = async (id, data) => {
    try {
        let {review,rate,votes} = data;
        let SQL = `UPDATE product_review SET review=$1,rate=$2, votes=$3 WHERE id=$4 RETURNING *;`;
        let safeValues = [review,rate,votes, id];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
        
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addProductReview,getProductReview, deleteProductReview,updateProductReview}