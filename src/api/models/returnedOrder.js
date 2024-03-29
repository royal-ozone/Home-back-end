const client = require('../../db')


const createReturnRequest = async data => {
    try {
        const {profile_id,store_id,order_id,product_id,message} = data;
        let SQL = 'INSERT INTO return_request (profile_id,store_id,order_id,product_id,message) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
        let safeValues = [profile_id, store_id, order_id, product_id, message];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllReturnRequests = async () => {
    try {
        let SQL = 'SELECT * FROM return_request;'
        let result = await client.query(SQL);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateReturnRequestStatus = async (data) => {
    try {
        let {status, id} = data
        let SQL = 'UPDATE return_request SET status=$1 WHERE id=$2 RETURNING *;';
        let safeValues = [status, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }

}

const getReturnOrderById = async data =>{
    try {
        let {id, profile_id} = data;
        let SQL = 'SELECT * FROM return_request WHERE id=$1 OR profile_id=$2;'
        let safeValues = [id, profile_id];
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getReturnRequestByProductAndOrder = async data => {
    try {
        let {product_id, order_id} = data;
        let SQL = 'SELECT * FROM return_request WHERE order_id=$2 AND product_id=$1;'
        let safeValues = [product_id, order_id]
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createReturnRequest,
    getAllReturnRequests,
    updateReturnRequestStatus,
    getReturnOrderById,getReturnRequestByProductAndOrder
}