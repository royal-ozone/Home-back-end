const client = require('../../db')

const getAmounts = async ({duration}) => {
    try {
        let safeValues = []
        let search = () =>{
            const [from, to] = duration?.split('&')
            return duration ? `where bt.created_at::date between $${safeValues.push(from)} and $${safeValues.push(to)} ` : ''
        }
        let SQL = `select type, status, description,sum(amount) from business_transaction bt ${search()} group by status, type, description`
        let { rows } = await client.query(SQL, safeValues)
        return rows
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAmounts
}