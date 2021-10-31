'use strict';
const client = require('../../db')
const addCartModel =async (idAddress,data)=> {
    try {
        let SQL = 'INSERT INTO cart(profile_id,address_id,first_name,last_name,mobile) VALUES($1,$2,$3,$4,$5) RETURNING *;';
        const {id,first_name,last_name,mobile} = data;
        let safeValue = [id,idAddress,first_name,last_name,mobile];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
    } catch (error) {
        let response ={
            message: error.message,
        }
        return response;
    }
}
const addCartItemModel =async (id,data)=> {
    try {
        let SQL ='INSERT INTO cart_item(cart_id,product_id,price,discount,quantity) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
        const {product_id,price,discount,quantity}= data;
        let safeValue = [id,product_id,price,discount,quantity];
       
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        let response ={
            message: error.message,
        }
        return response;
    }
}
const getCartByProfileId =async (id)=>{
try {
    let SQL = 'SELECT * FROM cart WHERE profile_id =$1;';
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
    
} catch (error) {
    let response ={
        message: error.message,
    }
    return response;
}
}

module.exports = {addCartModel,addCartItemModel,getCartByProfileId};