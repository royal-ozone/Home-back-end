const {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getAccounts
} = require('../models/account')

const addStoreAccountHandler = async (req, res) => {

    try {
        let result = await addAccount({store_id: req.user.store_id, ...req.body })
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error})
    }
}

const addCourierAccountHandler = async (req, res) => {
    try {
        let result = await addAccount({courier_id: req.user.courier_id, ...req.body })
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error})
    }
}

const addAdminAccount = async(req, res) => {
    try {
        let result = await addAccount({profile_id: req.user.profile_id, ...req.body })
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error})
    }
}

const updateAccountHandler = async (req, res) => {
    try {
        let result = await updateAccount(req.body)
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error})
    }
}

const deleteAccountHandler = async (req, res) => {
    try {
        let result = await deleteAccount(req.body)
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error})
    }
}

const getAccountHandler = async (req, res) => {
try {
    let result = await getAccount(req.params.id)
    res.send({ status: 200, result: result})
} catch (error) {
    res.send({ status: 403, message: error.message})
}

}

const getAccountsHandler = async (id, res) => {
    try {
        let result = await getAccounts(id)
        res.send({ status: 200, result: result})
    } catch (error) {
        res.send({ status: 403, message:error.message})
    }
}

const getStoreAccounts = async (req, res) => {
    return getAccountsHandler(req.user.store_id, res)
}

const getCourierAccounts = async (req, res) => {
    return getAccountsHandler(req.user.courier_id, res)
}

const getAdminAccounts = async (req, res) => {
    return getAccountsHandler(req.user.profile_id, res)
}


module.exports = {
    addCourierAccountHandler,
    addAdminAccount,
    addStoreAccountHandler,
    updateAccountHandler,
    deleteAccountHandler, 
    getStoreAccounts,
    getCourierAccounts,
    getAdminAccounts,
    getAccountHandler
}