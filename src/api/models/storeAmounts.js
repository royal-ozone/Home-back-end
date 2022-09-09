const client = require('../../db')

const getPendingAmounts = async (id) => {
    try {
        let SQL = `select sum(oi.price * oi.quantity) from order_item oi inner join new_order neo on oi.order_id = neo.id where oi.store_id =$1 and (not neo.status = $2 and neo.status != null or neo.status =$3 and neo.updated > now() - interval '1 day'  ) and ( oi.status =$4 or  oi.status = $5 or oi.status=$6)`
        let safeValues = [id, 'canceled', 'delivered', 'accepted', 'returned', 'pending']
        let result = await client.query(SQL,safeValues)
        return result.rows[0].sum ?? 0
    } catch (error) {
        throw new Error(error.message)
    }
}

const getReleasedAmounts = async id => {
    try {
        let SQL = 'select sum(oi.price * oi.quantity) from order_item oi inner join new_order neo on oi.order_id = neo.id where oi.store_id =$1 and oi.status = $2 and neo.status = $3;';
        let safeValues = [id, 'accepted', 'delivered']
        let result = await client.query(SQL,safeValues)
        return result.rows[0].sum ?? 0
    } catch (error) {
        throw new Error(error.message)
    }
}

const getRefundedAmounts = async id => {
    try {
        let SQL = 'select sum(oi.price * oi.quantity) from order_item oi where oi.store_id=$1 and oi.status = $2;';
        let result = await client.query(SQL, [id, 'refunded'])
        return result.rows[0].sum ?? 0
    } catch (error) {
        throw new Error(error.message)
    }
}

const addBTransaction = async ({store_id, courier_id, amount, order_id, order_item_id, status, type}) => {
    try {
        let SQL = "INSERT INTO business_transaction (store_id, courier_id, amount, order_id, order_item_id, status, type) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;";
        let safeValues = [store_id, courier_id, amount, order_id, order_item_id, status, type]
        let {rows} = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getSellerBTransactions = async (id, limit, offset) => {
    try {
        let SQL = 'select bt.*, neo.customer_order_id, p.artitle, p.entitle from business_transaction bt inner join new_order neo on bt.order_id = neo.id inner join order_item oi on oi.id=bt.order_item_id inner join product p on p.id = oi.product_id where bt.store_id = $1 limit $2 offset $3;';
        let SQL2 = 'select count(bt.*) from business_transaction bt inner join new_order neo on bt.order_id = neo.id inner join order_item oi on oi.id=bt.order_item_id inner join product p on p.id = oi.product_id where bt.store_id = $1 ;';
        let {rows} = await client.query(SQL, [id, limit,offset])
        let {rows: rows2} = await client.query(SQL2, [id])
        return {result: rows, count: rows2[0].count}
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreReleasedAmount = async id => {
    try {
        let SQL = 'select sum(amount) from business_transaction where store_id=$1 AND status=$2;'
        let {rows} = await client.query(SQL, [id, 'released'])
        let {rows: rows2} = await client.query(SQL, [id, 'withdrawn'])
        return rows[0].sum - rows2[0].sum
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getPendingAmounts,
    getReleasedAmounts,
    getRefundedAmounts,
    addBTransaction,
    getSellerBTransactions,
    getStoreReleasedAmount
}