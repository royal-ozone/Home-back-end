const client = require('../../db')


// comment on product

let productComment = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM order_item WHERE product_id=$1 AND profile_id=$2;`;
        let safeValues = [req.params.id, req.user.profile_id]
        let result = await client.query(SQL,safeValues)
        if (result){
            next()
        }
        else throw new Error('not Authorized');
    } catch (error) {
        throw new Error(error.message)
    }
}

let profileView = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM profiles WHERE id=$1;`;
         let safeValue = [req.params.id];
         let result = await client.query(SQL,safeValue);
         if(req.user.profile_id === result.rows[0].id){
             next();
         } else throw new Error('not Authorized');
    } catch (error) {
        throw new Error(error.message)
    }
};



let checkAdmin = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM ADMINS WHERE id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         if(result){
             next();
         } else throw new Error('User unauthorized, access denied!');
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkMod = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM MODS WHERE id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         if(result){
             next();
         } else throw new Error('User unauthorized, access denied!');
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkAuth = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM ADMINS WHERE id=$1;`;
         let SQL2 = `SELECT * FROM MODS WHERE id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         let result2 = await client.query(SQL2,safeValue);
         if(result || result2){
             next();
         } else throw new Error('User unauthorized, access denied!');
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkBan = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM MODS WHERE id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         if(result){
            throw new Error('User unauthorized, access denied!');
         } else next();
    } catch (error) {
        throw new Error(error.message)
    }
};

exports.module = {profileView,productComment,checkAdmin,checkMod,checkAuth,checkBan}
 
