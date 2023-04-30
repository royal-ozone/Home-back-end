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

const updateWithdrawal = async ({ status, document, id, rejection_reason }) => {
    console.log("🚀 ~ file: withdraw.js:16 ~ updateWithdrawal ~ rejection_reason:", rejection_reason)
    try {
        let SQL = 'update withdrawal set status=$1, document=$2, updated=$4, rejection_reason=$5 where id=$3   returning *'
        let safeValues = [status, document, id, new Date(),rejection_reason]
        let { rows } = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getWithdrawals = async (data) => {
    try {
        let { limit, offset } = data
        let safeValues = [ offset,limit]
        let _safeValues = []
        delete data.offset
        delete data.limit
    
        const search = (params, array) => {
          let x = [];
          Object.entries(params).forEach(([key,value]) => {
            if (key === "id"  && value) {
              let i = array.push(value);
              x.push(`w.store_id =$${i} or w.courier_id=$${i}`);
            } else if (key === 'duration' && value){
                let [from, to] = value.split('&')
                let i = array.push(from)
                let _i =  array.push(to)
                x.push(`w.created_at::date between $${i} and $${_i}`)
            } else if ((key === 'store_id' ||key === 'courier_id'  )&& value){
                let i = array.push(value)
                x.push(`w.${key} = $${i}`)
            }
          });
          if (x.length) {
            return ` where ${x.join(" and ")}`;
          } else return "";
        };
    
        let SQL = `select w.*, a.title, a.type as account_type  ,a.reference from withdrawal w inner join account a on w.account_id = a.id ${search(data,safeValues)} order by w.created_at desc offset $1 limit $2 `
        let SQL2 = `select count(*) from withdrawal w ${search(data,_safeValues )}`
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