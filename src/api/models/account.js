const client = require('../../db')

const addAccount = async ({ store_id, courier_id, profile_id, reference, title, type }) => {
    try {
        let SQL = 'insert into account (store_id, courier_id, profile_id, reference, title,type) values($1,$2,$3,$4,$5,$6) RETURNING *;';
        let safeValues = [store_id, courier_id, profile_id, reference, title, type];
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateAccount = async ({ id, reference, title }) => {
    try {
        let SQL = ' update account SET reference= $1, title= $2 where id=$3 RETURNING *;';
        let safeValues = [reference, title, id]
        let {rows} = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const updateAccountDisplay = async (id) => {
    try {
        let SQL = 'update account set display=$1 where id=$2 RETURNING *;'
        let safeValues = [false,id]
        let { rows} = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const deleteAccount = async id => {
    try {
        tr
        let SQL = ' delete from account where id =$1 returning *;'
        let { rows} = await client.query(SQL, [id])
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAccount = async id => {
    try {
        let SQL = 'select * from account where id =$1'
        let { rows} = await client.query(SQL,[id])
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAccounts = async id => {
    try {
        let SQL = 'select * from account where (store_id = $1 or courier_id = $1) and display=$2;'
        let {rows} = await client.query(SQL,[id,true]) 
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCashAccount = async () =>{
    try {
        let SQL = 'select * from account where profile_id isnull'
        let { rows} = await client.query(SQL)
        return rows[0] ??{}
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getAccounts,
    getCashAccount,
    updateAccountDisplay
}