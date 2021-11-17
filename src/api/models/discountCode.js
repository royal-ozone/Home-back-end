'use strict';
const client = require('../../db')
const createDiscountCodeModel =async (data)=>{
try {
    let {discount_code,year,month,day,hour,minute,second,max_counter,discount,number_of_time} = data;
    let SQL ='INSERT INTO discount_code(discount_code,year,month,day,hour,minute,second,max_counter,discount,number_of_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;';
    let safeValue = [discount_code,year,month,day,hour,minute,second,max_counter,discount,number_of_time];
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
const updateDisconnectModel = async (data,id) =>{
    try {
        let SQL ='UPDATE discount_code SET discount_code=$1,year=$2,month=$3,day=$4,hour=$5,minute=$6,second=$7,max_counter=$8,discount=$9,active=$10,number_of_time=$11 WHERE id=$12 RETURNING *;';
        let oldData = await getDiscountCodeById(id);
        const {discount_code,year,month,day,hour,minute,second,max_counter,discount,active,number_of_time} = oldData;
        const {newDiscount_code,newYear,newMonth,newDay,newHour,newMinute,newSecond,newMax_counter,newDiscount,newActive,newNumber_of_time} = data;
        let safeValues = [newDiscount_code?newDiscount_code:discount_code,newYear?newYear:year,newMonth?newMonth:month,newDay?newDay:day,newHour?newHour:hour,newMinute?newMinute:minute,newSecond?newSecond:second,newMax_counter?newMax_counter:max_counter,newDiscount?newDiscount:discount,newActive?newActive:active,newNumber_of_time?newNumber_of_time:number_of_time,id];
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
        let SQL = 'SELECT * FROM discount_code WHERE discount_code=$1;';
        let safeValue = [data.discount_code];
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
        let {id,discount_code,counter} = data;
        let SQL = 'INSERT INTO promo(profile_id,discount_id,discount_name,counter) VALUES($1,$2,$3,$4) RETURNING *;';
        let safeValue = [profile_id,id,discount_code,counter];
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
    getPromoByProfileIdModel
}