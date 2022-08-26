const { getPendingAmounts,
    getReleasedAmounts,
    getRefundedAmounts,
    getSellerBTransactions,
    getStoreReleasedAmount
} = require('../models/storeAmounts')

 const body = async (req, res, action) => {
    try {
        let result = await action(req.user.store_id)
        res.send({ status: 200, amount: Number(result).toFixed(2) })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
 }
const getPendingAmountsHandler = async (req, res) => {
    return body( req,res,getPendingAmounts )
    
}

const getReleasedAmountsHandler = async (req, res) => {
    return body( req,res,getReleasedAmounts )
   
}

const getRefundedAmountsHandler = async (req, res) => {
    return body( req,res,getRefundedAmounts )
}

const getSellerBTransactionsHandler = async (req, res) => { 
    try {
        let {result, count} = await getSellerBTransactions(req.user.store_id, req.query.limit?? 20, req.query.offset?? 0)
        res.send({status: 200, result: result, count: count})
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const getStoreReleasedAmountHandler = async (req, res) => {
    return body(req,res, getStoreReleasedAmount)
}


module.exports = {
    getPendingAmountsHandler,
    getReleasedAmountsHandler,
    getRefundedAmountsHandler ,
    getSellerBTransactionsHandler,
    getStoreReleasedAmountHandler
}