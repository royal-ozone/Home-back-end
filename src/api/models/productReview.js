const client = require('../../db')


const addProductReview = async data => {
    try {
        let { order_item_id, review, rate } = data;
        let SQL = 'INSERT INTO product_review (order_item_id,review,rate) VALUES ($1,$2,$3) RETURNING *;';
        let safeValues = [order_item_id, review, rate];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};


const getProductReview = async id => {
    try {
        let SQL = 'SELECT * FROM product_review WHERE id=$1 OR product_id=$1;';
        let result = await client.query(SQL, [id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductReview = async data => {
    try {
        let { order_item_id, id } = data;
        let SQL = 'DELETE FROM product_review WHERE id=$2 OR order_item_id=$1 RETURNING *;';
        let result = await client.query(SQL, [order_item_id, id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductReviewByProductId = async product_id => {
    try {
        let SQL = 'DELETE FROM product_review WHERE product_id=$1 RETURNING *;';
        let result = await client.query(SQL, [product_id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductReview = async (data) => {
    try {
        let { review, rate, id } = data;
        let SQL = `UPDATE product_review SET review=$1,rate=$2 WHERE id=$3 RETURNING *;`;
        let safeValues = [review, rate, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message)
    }
}

const updateOrderItemRate = async (id) => {
    try {
        let SQL = ' update order_item set rated=$1 where id=$2 returning *'
        let safeValues = [true, id];
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getProductReviews = async ({ id, offset = 0, limit = 10 }) => {
    try {
        let SQL = `select pr.*, p.first_name , p.last_name , p.profile_picture  from product_review pr inner join order_item oi  on pr.order_item_id = oi.id inner join profile p on oi.profile_id = p.id where oi.product_id = $1 order by pr.created_at desc limit $2 offset $3`
        let { rows } = await client.query(SQL, [id, limit, offset])
        return rows
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addProductReview,
    getProductReview,
    deleteProductReview,
    updateProductReview,
    deleteProductReviewByProductId,
    updateOrderItemRate,
    getProductReviews
}