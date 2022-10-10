const client = require('../../db')


const addWithdrawal = async ({ account_id, courier_id, store_id, amount, type }) => {
    try {
        let SQL = 'insert into withdrawal (account_id,courier_id,store_id,  amount, type) values ($1,$2,$3,$4,$5) returning *'
        let safeValues = [account_id, courier_id, store_id, amount, type]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateWithdrawal = async ({ status, document, id }) => {
    try {
        let SQL = 'update withdrawal set status=$1, document=$2, updated=$4 where id=$3  returning *'
        let safeValues = [status, document, id, new Date()]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getWithdrawals = async ({ id, offset =0 , limit =10 }) => {
    try {
        let SQL = 'select w.*, a.title from withdrawal w inner join account a on w.account_id = a.id where w.store_id =$1 or w.courier_id=$1 order by w.created_at desc offset $2 limit $3 '
        let SQL2 = 'select count(*) from withdrawal where store_id =$1 or courier_id=$1'
        let safeValues = [id, offset, limit]
        let { rows } = await client.query(SQL, safeValues)
        let { rows: row2} = await client.query( SQL2, [id])
        return {data: rows, count: Number(row2[0].count)}
    } catch (error) {
        throw new Error(error.message)
    }
}

const getWithdrawal = async ({ id }) => {
    try {
        let SQL = 'select * from withdrawal where id =$1 returning *'
        let { rows } = await client.query(SQL, [id])
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteWithdrawal = async ({ id }) => {
    try {
        let SQL = 'delete from withdrawal where id =$1 returning *'
        let { rows } = await client.query(SQL, [id])
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    addWithdrawal,
    updateWithdrawal,
    getWithdrawal,
    getWithdrawals,
    deleteWithdrawal
}