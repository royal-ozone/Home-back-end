const {getAmounts} = require('../models/amounts')
const { getSellerBTransactions } = require('../models/storeAmounts')

const getAmountsHandler = async (req,res) =>{
    try {
        let data = await getAmounts(req.query)
        res.send({status: 200, data: data})
    } catch (error) {
        res.send({status: 403, message: error.message})
    }
}

const getTransactions = async (req,res) =>{
    try {
        let result =await getSellerBTransactions(req.query)
        res.send({status: 200, data: result})
    } catch (error) {
        res.send({status: 403, message: error.message})
    }
}
const routes =[
    {
        path: '/amounts',
        method: 'get',
        fn: getAmountsHandler,
        type: 'admin',
    },
    {
        path: '/transactions',
        method: 'get',
        fn: getTransactions,
        type: 'admin',
    }
]

module.exports = {
    routes,
}