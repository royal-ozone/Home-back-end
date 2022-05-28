const client = require('../../db')
const { getProfileByUserId, activateAccount } = require('../models/user')
const axios = require('axios')
const {getCourierCompanyByCompanyId} = require('../../api/models/courierCompany');
const {getCourierById} = require('../../api/models/courier');
const {getStore} =require('../../api/models/stores');
const {getOrderByIdModel} = require('../../api/models/order')
const {getReturnRequestByProductAndOrder} = require('../../api/models/returnedOrder')
// comment on product

let productComment = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM order_item WHERE product_id=$1 AND profile_id=$2;`;
        let safeValues = [req.body.product_id, req.user.profile_id]
        let result = await client.query(SQL, safeValues)
        if (result.rows[0]) {
            next()
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
}

let profileView = async (req, res, next) => {
    try {
        let SQL = `SELECT * FROM PROFILE WHERE id=$1;`;
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
        res.send(error.message)
    }
};



let checkAdmin = async (req, res, next) => {
    try {
      
        if (req.employee.role === 'admin') {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

let checkSupervisor = async (req, res, next) => {
    try {
        let auth = ['admin', 'supervisor']
       
        if (auth.includes(req.employee.role)) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};
let checkMod = async (req, res, next) => {
    try {
        let auth = ['admin', 'supervisor', 'moderator']
       
        if (auth.includes(req.employee.role)) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

let checkAuth = async (req, res, next) => {
    try {
        // let SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        // let SQL2 = `SELECT * FROM MODERATOR WHERE user_id=$1;`;
        // let safeValue = [req.user.id];
        // let result = await client.query(SQL, safeValue);
        // let result2 = await client.query(SQL2, safeValue);
        let auth = ['admin', 'supervisor', 'moderator', 'advisor']

        if (auth.includes(req.employee?.role)) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

let checkStoreOwner = async (profile_id) => {
    try {
       

        let SQL = `SELECT * FROM STORE WHERE profile_id=$1;`;
        let safeValue = [profile_id];

        let result = await client.query(SQL, safeValue);
        return result;
    } catch (error) {
        res.send(error.message)
    }
};

let checkStoreAuth = async (req, res, next) => {
    try {
        
        let auth = ['admin', 'supervisor', 'moderator', 'advisor']
        if (auth.includes(req.employee?req.employee.role: false ) || req.user.store_id) {
            next();
        } else {
            res.json({
                status: 403,
                message: 'User unauthorized, access denied!',
            });
        }
    } catch (error) {
        res.send(error.message)
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
        res.send(error.message)
    }
};

const checkActive = async (req, res, next) =>{
    try {
        if(req.user.status === 'active'){
            next()
        } else if (req.user.status === 'deactivated'){
            res.send({status:'403',message:'Your account is deactivated, sign in again to activate it!'});
            await activateAccount(req.user.id)
            next();
        }
    } catch (error) {
        res.send(error.message);
    }
}

const checkCourierCompany = async (req, res, next) =>{
    try {
        // let SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        // let SQL2 = `SELECT * FROM MODERATOR WHERE user_id=$1;`;
        // let safeValue = [req.user.id];
        // let result = await client.query(SQL, safeValue);
        // let result2 = await client.query(SQL2, safeValue);
        let auth = ['admin', 'supervisor', 'moderator', 'advisor']
        if(req.user.courier_company_id || auth.includes(req.employee?req.employee.role: false )){
            next();
        } else{
            res.status(403).send('your are not a courier company')
        }
    } catch (error) {
        res.send(error.message);
    }
}

const checkCourier = async (req, res, next) =>{
    try {
        if(req.user.courier_id){
            next()
        } else {
            res.status(403).send('your are not a courier')
        }
    } catch (error) {
        res.send(error.message);
    }
}

const checkCourierCompanyStatus = async (req, res, next) =>{
    try {
        let result = await getCourierCompanyByCompanyId(req.user.courier_company_id)
        if(result.status === 'approved'){
            next()
        } else if(result.status === 'pending'){
            res.status(403).send('your account status still pending')
        } else if(result.status === 'rejected') {
            res.status(403).send('your account status is rejected, please check rejection reason')
        }  else {
            res.status(403).send('please check your account status')
        }
    } catch (error) {
        res.send(error.message);
    }
}

const checkCourierStatus = async (req, res, next) =>{
    try {
        let result = await getCourierById(req.user.courier_id);
        if(result.status === 'approved'){
            next()
        } if(result.status === 'pending'){
            res.status(403).send('your account status still pending,please approve the courier company request' )
        } else {
            res.status(403).send('please check your account status')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const checkStoreStatus = async (req, res, next) =>{
    try {
        let result = await getStore(req.user.profile_id)
        if(result.status === 'approved'){
            next()
        } else if(result.status === 'pending'){
            res.status(403).send('your account status still pending')
        } else if(result.status === 'rejected') {
            res.status(403).send('your account status is rejected, please check rejection reason')
        }  else {
            res.status(403).send('please check your account status')
        }
    } catch (error) {
        res.send(error.message);
    }
}

const checkOrderStatusForReturn = async (req, res, next) =>{
    try {
        let result = await getOrderByIdModel(req.body.order_id)
        let result2 = await getReturnRequestByProductAndOrder(req.body)
        if(result.status !== 'delivered') {
            res.status(403).send('your order status is not delivered yet');
        } else if(result2.id){
            res.status(403).send('your product is already returned');
        }
        else {
            next();
        }
    } catch (error) {
        res.send(error.message); 
    }
}



module.exports = { profileView, productComment, checkAdmin, checkMod, checkAuth, checkStoreAuth, checkBan, checkActive,checkCourierCompany, checkCourier, checkCourierCompanyStatus, checkCourierStatus ,checkStoreStatus,checkOrderStatusForReturn,checkSupervisor};