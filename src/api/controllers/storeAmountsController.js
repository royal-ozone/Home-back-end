const { getPendingAmounts,
    getReleasedAmounts,
    getRefundedAmounts,
    getSellerBTransactions,
    getStoreReleasedAmount,
    getWithdrawnAmount,
    getTransferredAmount,
    getCanceledWithdrawnAmount
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
    return body(req, res, getPendingAmounts)

}

const getReleasedAmountsHandler = async (req, res) => {
    return body(req, res, getReleasedAmounts)

}

const getRefundedAmountsHandler = async (req, res) => {
    return body(req, res, getRefundedAmounts)
}

const getSellerBTransactionsHandler = async (req, res) => {
    try {
        let { result, count } = await getSellerBTransactions({store_id: req.user?.store_id,...req.query})
        res.send({ status: 200, result: result, count: count })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const getStoreReleasedAmountHandler = async (req, res) => {
    return body(req, res, getStoreReleasedAmount)
}

const getWithdrawnAmountHandler = async (req, res) => {
    try {
        let amount = await getWithdrawnAmount(req.user.store_id)
        res.send({ status: 200,amount: Number(amount) })
    } catch (error) {
        res.send({ status: 403, message: error})
    }
}
const getTransferredAmountHandler = async (req, res) => {
    try {
        let amount = await getTransferredAmount(req.user.store_id)
        res.send({ status: 200,amount: amount })
    } catch (error) {
        res.send({ status: 403, message: error})
    }
}
const getCanceledWithdrawnAmountHandler = async (req, res) => {
    try {
        let amount = await getCanceledWithdrawnAmount(req.user.store_id)
        res.send({ status: 200,amount: amount })
    } catch (error) {
        res.send({ status: 403, message: error})
    }
}

const routes = [
    {
        path: '/store/withdrawn',
        fn:getWithdrawnAmountHandler,
        auth: true,
        type: 'store',
        method: 'get'
    },
    {
        path: '/store/transferred',
        fn:getTransferredAmountHandler,
        auth: true,
        type: 'store',
        method: 'get'
    },
    {
        path: '/store/wCanceled',
        fn:getCanceledWithdrawnAmountHandler,
        auth: true,
        type: 'store',
        method: 'get'
    }
]


module.exports = {
    getPendingAmountsHandler,
    getReleasedAmountsHandler,
    getRefundedAmountsHandler,
    getSellerBTransactionsHandler,
    getStoreReleasedAmountHandler,
    routes
}