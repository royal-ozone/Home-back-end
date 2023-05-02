const client = require('../../db')

const getPendingAmounts = async (id) => {
    try {
        return await getOrdersAmount({ id: id, status: 'pending' }) - await getOrdersAmount({ id: id, status: 'canceled' }) - await getOrdersAmount({ id: id, status: 'released' }) - await getOrdersAmount({ id: id, status: 'refunded' })
        // let SQL = `select sum(oi.price * oi.quantity) from order_item oi inner join new_order neo on oi.order_id = neo.id where oi.store_id =$1 and (not neo.status = $2 and neo.status != null or neo.status =$3 and neo.updated > now() - interval '1 day'  ) and oi.status  in ( $4 , $5 ,$6)`
        // let safeValues = [id, 'canceled', 'delivered', 'accepted', 'returned', 'pending']
        // let result = await client.query(SQL,safeValues)
        // return result.rows[0].sum ?? 0
    } catch (error) {
        throw new Error(error.message)
    }
}

const getReleasedAmounts = async id => {
    try {
        // let SQL = 'select sum(oi.price * oi.quantity) from order_item oi left join new_order neo on oi.order_id = neo.id where oi.store_id =$1 and oi.status = $2 and neo.status = $3;';
        // let safeValues = [id, 'accepted', 'delivered']
        // let result = await client.query(SQL,safeValues)
        // return result.rows[0].sum ?? 0
        await getOrdersAmount({ id: id, status: 'released' }) - await getOrdersAmount({ id: id, status: 'refunded' })
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

const addBTransaction = async ({ store_id, courier_id, amount, order_id, order_item_id, status, type, withdrawal_id, description }) => {
    try {
        let SQL = "INSERT INTO business_transaction (store_id, courier_id, amount, order_id, order_item_id, status, type,withdrawal_id, description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;";
        let safeValues = [store_id, courier_id, amount, order_id, order_item_id, status, type, withdrawal_id, description]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getSellerBTransactions = async (data) => {
    try {

        let { limit, offset } = data
        let safeValues = [limit, offset]
        let _safeValues = []
        delete data.offset
        delete data.limit

        const search = (params, array) => {
            let x = ['bt.store_id is null and bt.courier_id is null'];
            Object.entries(params).forEach(([param, value]) => {

                if (["store_id", 'courier_id'].includes(param) && value) {
                    x.shift()
                    let i = array.push(value);
                    x.push(`bt.${param} = $${i}`);
                } else if (["status", 'type', 'description'].includes(param)) {
                    let i = array.push(value);
                    x.push(`bt.${param} = $${i}`);
                } else if (param === 'duration' && value) {
                    let [from, to] = value.split('&')
                    let i = array.push(from);
                    let _i = array.push(to)
                    x.push(`bt.created_at::date between $${i} and $${_i}`)
                }  else if (param === 'customer_order_id') {
                    let i = array.push(value);
                    x.push(`neo.${param} = $${i}`);
                }

            });
            if (x.length) {
                return ` where ${x.join(" and ")}`;
            } else return "";
        };
        let SQL = `select bt.*, neo.customer_order_id, p.artitle, p.entitle from business_transaction bt left join new_order neo on bt.order_id = neo.id left join order_item oi on oi.id=bt.order_item_id left join product p on p.id = oi.product_id ${search(data, safeValues)} order by created_at desc limit $1 offset $2;`
        let SQL2 = `select count(bt.*) from business_transaction bt left join new_order neo on bt.order_id = neo.id left join order_item oi on oi.id=bt.order_item_id left join product p on p.id = oi.product_id ${search(data, _safeValues)} ;`
        let { rows } = await client.query(SQL, safeValues);
        if (limit && offset) {
            let { rows: _rows } = await client.query(SQL2, _safeValues);
            return { data: rows, count: Number(_rows[0]?.count) ?? 0 };
        } else {
            return { data: rows };
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreReleasedAmount = async id => {
    try {
        let SQL = 'select sum(amount) from business_transaction where store_id=$1 AND status=$2;'
        let { rows } = await client.query(SQL, [id, 'released'])
        let { rows: rows2 } = await client.query(SQL, [id, 'transferred'])

        return rows[0].sum
    } catch (error) {
        throw new Error(error.message)
    }
}

const getOrdersAmount = async ({ id, status }) => {
    try {
        let SQL = 'select sum(amount) from business_transaction where status=$1 and store_id=$2 and withdrawal_id is null '
        let safeValues = [status, id]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]?.sum ?? 0
    } catch (error) {
        throw new Error(error)
    }
}
const getAmount = async ({ id, status }) => {
    try {
        let SQL = 'select sum(amount) from business_transaction where withdrawal_id is not null and status=$1 and store_id=$2 '
        let safeValues = [status, id]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]?.sum ?? 0
    } catch (error) {
        throw new Error(error)
    }
}


const getWithdrawnAmount = async id => {
    return await getAmount({ id: id, status: 'pending' })
}
const getTransferredAmount = async id => {
    return await getAmount({ id: id, status: 'transferred' })
}

const getCanceledWithdrawnAmount = async id => {
    return await getAmount({ id: id, status: 'canceled' })
}

module.exports = {
    getPendingAmounts,
    getReleasedAmounts,
    getRefundedAmounts,
    addBTransaction,
    getSellerBTransactions,
    getStoreReleasedAmount,
    getWithdrawnAmount,
    getTransferredAmount,
    getCanceledWithdrawnAmount
}