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
         let SQL = `SELECT * FROM ADMINS WHERE user_id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         if(result.rows[0]){
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
         if(result.rows[0]){
             next();
         } else throw new Error('User unauthorized, access denied!');
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkAuth = async (req, res, next) => {
    try {
        // console.log("check id ", req.user.id)
         let SQL = `SELECT * FROM ADMINS WHERE user_id=$1;`;
         let SQL2 = `SELECT * FROM MODS WHERE user_id=$1;`;
         let safeValue = [req.user.id];
        //  console.log("🚀 ~ file: acl.js ~ line 67 ~ checkAuth ~ safeValue", safeValue)
         let result = await client.query(SQL,safeValue);
         let result2 = await client.query(SQL2,safeValue);
        //  console.log("check result ", result.rows[0])
        //  console.log("check result2 ", result2.rows[0])
         if(result.rows[0] || result2.rows[0]){
             next();
         } else throw new Error('User unauthorized, access denied!');
    } catch (error) {
        throw new Error(error.message)
    }
};

let checkBan = async (req, res, next) => {
    try {
         let SQL = `SELECT * FROM banned_users WHERE user_id=$1;`;
         let safeValue = [req.user.id];
         let result = await client.query(SQL,safeValue);
         if(result.rows[0]){
            throw new Error('User has been banned!');
         } else next();
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = {profileView,productComment,checkAdmin,checkMod,checkAuth,checkBan};
 
