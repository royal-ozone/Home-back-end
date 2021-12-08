'use strict';
const client = require('../../db')
const addCartModel =async (profile_id,idAddress = null)=> {
    try {
        let SQL = 'INSERT INTO cart(profile_id,address_id) VALUES($1,$2) RETURNING *;';
        let safeValue = [profile_id,idAddress];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
    } catch (error) {
        let response ={
            message: error.message,
        }
        return response;
    }
}
const updateCart = async data =>{
    try {
        let {id, address_id} = data;
        let SQL = 'UPDATE cart SET address_id=$2 WHERE id=$1 RETURNING *;';
        let safeValues = [id, address_id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const addCartItemModel =async (id,data)=> {
    try {
        const {price,discount,quantity,product_id}= data;
        const price_after = (price * quantity)-( price * discount * quantity) ;
        let SQL ='INSERT INTO cart_item(cart_id,product_id,price,discount,quantity,price_after) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;';
        let safeValue = [id,product_id,price,discount,quantity,price_after];
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
const removeCartItemModelByCartId = async(id) =>{
try {
    let SQL = 'DELETE from cart_item WHERE cart_id=$1';
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows;
} catch (error) {
    throw new Error(error.message);
}
}

const removeCartItemById = async(id) =>{
    try {
        let SQL = 'DELETE from cart_item where id=$1 or product_id=$1 RETURNING *;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
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
        let SQL = 'SELECT * FROM cart_item WHERE cart_id=$1;';
        let result = await client.query(SQL,[id])
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
const updateCartItemQuantity = async data =>{
    try {
        let {id, quantity} = data;
        let SQL = 'UPDATE cart_item SET quantity=$2 WHERE id=$1 OR product_id=$1 RETURNING *;';
        let safeValues = [id, quantity];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {addCartModel,addCartItemModel,getCartByProfileId,removeCartItemModelByCartId,getCartItemByIdModel,getAllCartItemModel,getAllCartModel,getCartByProfileIdModel,getCartItemByProductId,getALLCartItemByCartId,updateCart,updateCartItemQuantity,removeCartItemById};