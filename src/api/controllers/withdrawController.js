const {
    addWithdrawal,
    updateWithdrawal,
    getWithdrawal,
    getWithdrawals,
    deleteWithdrawal
} = require('../models/withdraw')
const { addBTransaction } = require('../models/storeAmounts')


const addWithdrawalHandler = async (req,res, user_type, type) => {
    try {
        let result = await addWithdrawal({...req.body,courier_id: user_type === 'courier' ? req.user.courier_id: null, store_id: user_type === 'store' ? req.user.store_id: null,type:type})
        res.send({ status: 200, data: result})
        return result
    } catch (error) {
        res.send({ status: 403, message: error.message})
    }
}

const getWithdrawalsHandler = async (req, res, user_type) => {
    try {
        let id = user_type === 'store' ? req.user.store_id : req.user.courier_id
        let result = await getWithdrawals({id: id,... req.query})
        res.send({ status: 200, data: result})
    } catch (error) {
        res.send({ status: 403, message: error.message })
    }
}

const addStoreWithdrawalHandler = async (req, res) => {
     let result = await addWithdrawalHandler(req, res, 'store', 'debit')
     await addBTransaction({store_id: req.user.store_id, withdrawal_id: result.id, type: 'debit', amount: result.amount, status: 'pending'})
}

const addCourierWithdrawalHandler = async (req, res) => {
    return  addWithdrawalHandler(req, res, 'courier', 'debit')
}

const addAdminWithdrawalHandler = async (req, res) => {
    return addWithdrawalHandler(req, res, 'admin',req.body.type?? 'debit')
}

const getStoreWithdrawalsHandler = async (req, res) =>{
    return getWithdrawalsHandler(req, res, 'store')
}

const getCourierWithdrawalsHandler = async (req, res) => {
    return getWithdrawalsHandler(req, res, 'courier')
}

const getAdminWithdrawalsHandler = async (req, res) =>{
    return getWithdrawalsHandler(req, res, 'admin')
}

const updateWithdrawalHandler = async (req, res) =>{
     try {
        let result = await updateWithdrawal({...req.body, document: req.file?.location})
        await addBTransaction({...result, withdrawal_id: result.id})
        res.send({ status:200, data:result})
    } catch (error) {
        res.send({ status: 403, message: error.message})
    }
}

const getWithdrawalHandler =async (req, res) =>{
    try {
        let result = await getWithdrawal(req.body)
        res.send({ status: 200, data: result})
    } catch (error) {
        res.send({ status: 403, message: error.message })
    }
}
const deleteWithdrawalHandler = async (req, res) => {
    try {
        let result = await deleteWithdrawal(req.body)
        res.send({ status: 200, data: result})
    } catch (error) {
        res.send({ status: 403, message: error.message })
    }
}

module.exports = routes = [
    {
        fn: getStoreWithdrawalsHandler,
        type: 'store',
        auth: true,
        storeStatus: true,
        method: 'get',
        path: '/withdrawal/store'
    },
    {
        fn: getCourierWithdrawalsHandler,
        type: 'courier',
        auth: true,
        courierStatus: true,
        method: 'get',
        path: '/withdrawal/courier'
    },
    {
        fn: getAdminWithdrawalsHandler,
        type: 'admin',
        auth: true,
        method: 'get',
        path: '/withdrawal/admin'
    },
    {
        fn: addStoreWithdrawalHandler,
        type: 'store',
        auth: true,
        storeStatus: true,
        method: 'post',
        path: '/withdrawal/store'
    },
    {
        fn: addCourierWithdrawalHandler,
        type: 'courier',
        auth: true,
        courier: true,
        method: 'post',
        path: '/withdrawal/courier'
    },
    {
        fn: addAdminWithdrawalHandler,
        type: 'admin',
        auth: true,
        method: 'post',
        path: '/withdrawal/admin'
    },
    {
        fn: updateWithdrawalHandler,
        type: 'admin',
        auth: true,
        method: 'put',
        path: '/withdrawal/admin',
        isUpload: true,
        uploadType: 'single',
        uploadParams : 'document'
    },
    {
        fn: deleteWithdrawalHandler,
        type: 'admin',
        auth: true,
        method: 'delete',
        path: '/withdrawal/admin',
       
    },
    {
        fn: getWithdrawalHandler,
        type: 'user',
        auth: true,
        method: 'get',
        path: '/withdrawal'
    }
]