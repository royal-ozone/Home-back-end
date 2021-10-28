const client = require('../../db')
const { getProfileByUserId } = require('../models/user')

// comment on product

let productComment = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM order_item WHERE product_id=$1 AND profile_id=$2;`;
        let safeValues = [req.params.id, req.user.profile_id]
        let result = await client.query(SQL, safeValues)
        if (result) {
            next()
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

let profileView = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM profiles WHERE id=$1;`;
        let safeValue = [req.params.id];
        let result = await client.query(SQL, safeValue);
        if (req.user.profile_id === result.rows[0].id) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
};



let checkAdmin = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        let safeValue = [req.user.id];
        let result = await client.query(SQL, safeValue);
        if (result.rows[0]) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkMod = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM MODERATOR WHERE id=$1;`;
        let safeValue = [req.user.id];
        let result = await client.query(SQL, safeValue);
        if (result.rows[0]) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkAuth = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        let SQL2 = `SELECT * FROM MODERATOR WHERE user_id=$1;`;
        let safeValue = [req.user.id];
        let result = await client.query(SQL, safeValue);
        let result2 = await client.query(SQL2, safeValue);
        if (result.rows[0] || result2.rows[0]) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkStoreOwner = async (userId) => {
    try {
        let profileId = await getProfileByUserId(userId);

        let SQL = `SELECT * FROM STORE WHERE profile_id=$1;`;
        let safeValue = [profileId];

        let result = await client.query(SQL, safeValue);
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkStoreAuth = async (req, res, next) => {
    try {
        let storeOwner = await checkStoreOwner(req.user.id)
        let SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        let SQL2 = `SELECT * FROM MODERATOR WHERE user_id=$1;`;
        let safeValue = [req.user.id];
        let result = await client.query(SQL, safeValue);
        let result2 = await client.query(SQL2, safeValue);

        if (result.rows[0] || result2.rows[0] || storeOwner.rows[0]) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkBan = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM BANNED_USER WHERE user_id=$1;`;
        let safeValue = [req.user.id];
        let result = await client.query(SQL, safeValue);
        if (result.rows[0]) {
            res.status(403).json({
                status: 403,
                message: 'User has been banned!',
            });
        } else next();
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = { profileView, productComment, checkAdmin, checkMod, checkAuth, checkStoreAuth, checkBan };

