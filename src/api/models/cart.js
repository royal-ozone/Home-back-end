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
const addCartItemModel =async (id,data,product_id)=> {
    try {
        let SQL ='INSERT INTO cart_item(cart_id,product_id,price,discount,quantity) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
        const {price,discount,quantity}= data;
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
const removeCartItemModel = async(id) =>{
try {
    let SQL = 'DELETE from cart_item WHERE cart_id =$1';
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
} catch (error) {
    let response = {
        message: error.message,
    }
    return response;
}
}
const getCartItemByIdModel =async id => {
    try {
        let SQL = 'SELECT * FROM cart_item WHERE id=$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getAllCartItemModel = async id => {
    try {
        let SQL = 'SELECT * FROM cart_item ;';
        let result = await client.query(SQL)
        return result.rows;
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getCartByProfileIdModel = async id => {
    try {
        let SQL = 'SELECT * FROM cart WHERE profile_id = $1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getAllCartModel = async id => {
    try {
        let SQL = 'SELECT * FROM cart ;';
        let result = await client.query(SQL)
        return result.rows;
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getCartItemByProductId = async id => {
    try {
        let SQL = 'SELECT * FROM cart_item WHERE product_id =$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue)
        return result.rows[0];
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getALLCartItemByCartId = async id =>{
    try {
        let SQL = 'SELECT * FROM cart_item WHERE cart_id =$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue)
        return result.rows;
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const removeCartByProfileId = async(id) => {
    try {
        let SQL = 'DELETE from cart WHERE profile_id =$1';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}

module.exports = {addCartModel,addCartItemModel,getCartByProfileId,removeCartItemModel,getCartItemByIdModel,getAllCartItemModel,getAllCartModel,getCartByProfileIdModel,getCartItemByProductId,getALLCartItemByCartId,removeCartByProfileId};