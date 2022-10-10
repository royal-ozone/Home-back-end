const {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getAccounts,
    getCashAccount,
    updateAccountDisplay
} = require('../models/account')

const addStoreAccountHandler = async (req, res) => {

    try {
        let result = await addAccount({ store_id: req.user.store_id, ...req.body })
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const addCourierAccountHandler = async (req, res) => {
    try {
        let result = await addAccount({ courier_id: req.user.courier_id, ...req.body })
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const addAdminAccount = async (req, res) => {
    try {
        let result = await addAccount({ profile_id: req.user.profile_id, ...req.body })
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const updateAccountHandler = async (req, res) => {
    try {
        let result = await updateAccount(req.body)
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const deleteAccountHandler = async (req, res) => {
    try {
        let result
        try {
            result = await deleteAccount(req.body.id)

        } catch (e) {
            result = await updateAccountDisplay(req.body.id)
        }

        result.id ? res.send({ status: 200, result: result }) : res.send({ status: 403, message: result })
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}

const getAccountHandler = async (req, res) => {
    try {
        let result = await getAccount(req.params.id)
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error.message })
    }

}

const getAccountsHandler = async (id, res) => {
    try {
        let result = await getAccounts(id)
        res.send({ status: 200, result: result })
    } catch (error) {
        res.send({ status: 403, message: error.message })
    }
}

const getCashAccountHandler = async (req, res) => {
    try {
        let result = await getCashAccount()
        res.send({ status: 200, data: result })
    } catch (error) {
        res.send({ status: 403, message: error })
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

const routes = [
    {
        fn: getCashAccountHandler,
        auth: false,
        isUpload: false,
        path: '/account/cash',
        method: 'get',
    }
]
module.exports = {
    addCourierAccountHandler,
    addAdminAccount,
    addStoreAccountHandler,
    updateAccountHandler,
    deleteAccountHandler,
    getStoreAccounts,
    getCourierAccounts,
    getAdminAccounts,
    getAccountHandler,
    routes
}