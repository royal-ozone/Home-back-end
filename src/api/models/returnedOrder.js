const client = require('../../db')


const createReturnRequest = async data => {
console.log("🚀 ~ file: returnedOrder.js ~ line 5 ~ data", data)
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

module.exports = {
    createReturnRequest,
    getAllReturnRequests,
    updateReturnRequestStatus
}