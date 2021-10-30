const client = require('../../db')


const addProductRating = async data => {
    try {
        let {product_id,profile_id,rating} = data;
        let SQL = 'INSERT INTO product_rating product_id, profile_id, rating, VALUES($1,$2,$3) RETURNING *;';
        let safeValues = [product_id,profile_id,rating];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getProductRating = async id => {
    try {
        let SQL = 'SELECT * FROM product_rating WHERE product_id=$1;';
        let result = await client.query(SQL, [id]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductRating = async id => {
    try {
        let SQL = 'DELETE FROM product_rating WHERE id=$1 RETURNING *;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductRating = async (id,data) => {
    try {
        let {rating} = data;
        let SQL = 'UPDATE product_rating SET rating=$1 WHERE id-$2 RETURNING *;';
        let safeValues = [rating, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addProductRating, updateProductRating,getProductRating,deleteProductRating}