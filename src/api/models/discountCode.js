'use strict';
const client = require('../../db')
const createDiscountCodeModel =async (data)=>{
try {
    let {discount_code,year,month,day,hour,minute,second,Counter} = data;
    let SQL ='INSERT INTO discount_code(discount_code,year,month,day,hour,minute,second,Counter) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
    let safeValue = [discount_code,year,month,day,hour,minute,second,Counter];
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
        let SQL ='UPDATE discount_code SET discount_code=$1,year=$2,month=$3,day=$4,hour=$5,minute=$6,second=$7,max_counter=$8,discount=$9,active=$10 WHERE id=$11 RETURNING *;';
        let oldData = await getDiscountCodeById(id);
        const {discount_code,year,month,day,hour,minute,second,max_counter,discount,active} = oldData;
        const {newDiscount_code,newYear,newMonth,newDay,newHour,newMinute,newSecond,newMax_counter,newDiscount,newActive} = data;
        let safeValues = [newDiscount_code?newDiscount_code:discount_code,newYear?newYear:year,newMonth?newMonth:month,newDay?newDay:day,newHour?newHour:hour,newMinute?newMinute:minute,newSecond?newSecond:second,newMax_counter?newMax_counter:max_counter,newDiscount?newDiscount:discount,newActive?newActive:active,id];
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
module.exports = {
    createDiscountCodeModel,
    getDiscountCodeById,
    updateActiveDiscountCodeByIdModel,
    updateDisconnectModel,
    removeDisconnectModel,
    getAllDiscountModel,
    checkCodeModel,
    updateCounterDiscountCode
}