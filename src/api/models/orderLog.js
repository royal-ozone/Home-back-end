const client = require('../../db')

const addOrderLog = async ({ id, status, at }) => {
    try {
        let SQL = 'insert into order_log (order_id,status, at) values($1,$2,$3) returning *'
        let safeValues = [id, status, at]
        let result = await client.query(SQL, safeValues)
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getOrderLog = async (id) => {
    try {
        let SQL = 'select * from order_log where id =$1 or order_id =$1;'
        let result = await client.query(SQL, [id])
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    addOrderLog,
    getOrderLog
}