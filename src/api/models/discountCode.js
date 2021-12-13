'use strict';
const client = require('../../db')
const createDiscountCodeModel =async (data)=>{
try {
    let {discount_code,year,month,day,hour,minute,second,max_counter,discount,max_discount,number_of_time} = data;
    let SQL ='INSERT INTO discount_code(discount_code,year,month,day,hour,minute,second,max_counter,discount,max_discount,number_of_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;';
    let safeValue = [discount_code,year,month,day,hour,minute,second,max_counter,discount,max_discount,number_of_time];
    let result = await client.query(SQL,safeValue);
    return result.rows[0];
} catch (error) {
    return error.message;
}
}

const getDiscountCodeById =async (id) => {
    try {
        let SQl ='SELECT * FROM discount_code WHERE id =$1;';
        let safeValue = [id];
        let result = await client.query(SQl, safeValue)
        return result.rows[0];
    } catch (error) {
        return error.message
    }
}
const updateActiveDiscountCodeByIdModel =async (bool,id) => {
    try {
        let SQL = "UPDATE discount_code SET active = $1 WHERE id=$2  RETURNING *;";
        let safeValues = [bool.bool,id];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        return error.message
    }
}
const updateDisconnectModel = async (data) =>{
    try {
        let SQL ='UPDATE discount_code SET discount_code=$1,year=$2,month=$3,day=$4,hour=$5,minute=$6,second=$7,max_counter=$8,discount=$9,max_discount=$13,active=$10,number_of_time=$11 WHERE id=$12 RETURNING *;';
        
        const {discount_code,year,month,day,hour,minute,second,max_counter,discount,active,number_of_time,id,max_discount} = data;
        let safeValues = [discount_code,year,month,day,hour,minute,second,max_counter,discount,active,number_of_time,id,max_discount];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}
const removeDisconnectModel = async (id) => {
    try {
        let SQL ='DELETE FROM discount_code WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}
const getAllDiscountModel = async ()=>{
    try {
        let SQL ='SELECT * FROM discount_code ;';
        let result = await client.query(SQL);
        return result.rows;
    } catch (error) {
        return error.message;
    }
}
const checkCodeModel = async (data) => {
    try {
        let {discount_code,id}= data;
        let SQL = 'SELECT * FROM discount_code WHERE discount_code=$1 OR id =$2;';
        let safeValue = [discount_code,id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}
const updateCounterDiscountCode = async (data) => {
    try {
        let {counter,id}=data;
        counter++;   
        let SQL ='UPDATE discount_code SET counter=$1 WHERE id=$2 RETURNING *;';
        let safeValue = [counter,id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}
const addPromoModel =async (profile_id, data) => {
    try {
        let {id,discount_code} = data;
        let SQL = 'INSERT INTO promo(profile_id,discount_id,discount_name) VALUES($1,$2,$3) RETURNING *;';
        let safeValue = [profile_id,id,discount_code];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message
    }
}
const updateCounterPromoModel = async (data) =>{
    try {
        let {counter,id}= data;
        counter++;
        let SQL = 'UPDATE promo SET counter=$1 WHERE id=$2 RETURNING *;';
        let safeValue = [counter,id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message
    }
}
const getAllPromoModel = async ()=>{
    try {
        let SQL = 'SELECT * FROM promo ;';
        let result = await client.query(SQL);
        return result.rows;
    } catch (error) {
        return error.message
    }
}
const getPromoByProfileIdModel = async (id)=>{
    try {
        let SQL = 'SELECT * FROM promo WHERE profile_id=$1 ;';
        let safeValue = [id]
        let result = await client.query(SQL, safeValue);
        return result.rows;
    } catch (error) {
        return error.message
    }
}
const getPromoByDiscountId = async (id,profile_id)=> {
    try {
        let SQL = 'SELECT * FROM promo WHERE profile_id =$2 AND discount_id = $1;';
        let response = await client.query(SQL,[id,profile_id]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    createDiscountCodeModel,
    getDiscountCodeById,
    updateActiveDiscountCodeByIdModel,
    updateDisconnectModel,
    removeDisconnectModel,
    getAllDiscountModel,
    checkCodeModel,
    updateCounterDiscountCode,
    addPromoModel,
    updateCounterPromoModel,
    getAllPromoModel,
    getPromoByProfileIdModel,
    getPromoByDiscountId
}