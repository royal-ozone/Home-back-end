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
        else throw new Error('not Authorized')
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
         } else throw new Error('not Authorized')
    } catch (error) {
        throw new Error(error.message)
    }
};

exports.module = {profileView,productComment}
 
