'use strict';
const client = require('../../db')
const createDiscountCodeModel =async (data)=>{
try {
    let {discount_code,expiry_date, min_order_amount ,max_counter,discount,max_discount = 0,number_of_time} = data;
    let SQL ='INSERT INTO discount_code(discount_code,expiry_date, min_order_amount,max_counter,discount,max_discount,number_of_time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
    let safeValue = [discount_code,expiry_date, min_order_amount,max_counter,discount,max_discount,number_of_time];
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
const updateDiscountModel = async (data) =>{
    try {
        let SQL ='UPDATE discount_code SET discount_code=$1,expiry_date=$2, min_order_amount=$3,max_counter=$4,discount=$5,max_discount=$9,active=$6,number_of_time=$7 WHERE id=$8 RETURNING *;';
        
        const {discount_code,expiry_date, min_order_amount,max_counter,discount,active,number_of_time,id,max_discount} = data;
        let safeValues = [discount_code,expiry_date, min_order_amount,max_counter,discount,active,number_of_time,id,max_discount];
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
const getAllDiscountModel = async (data)=>{
    try {
        let { limit, offset } = data;
        let safeValues = [limit, offset];
        let _safeValues = [];
        delete data.limit;
        delete data.offset;
        const search = (params, array) => {
          let x = [];
          Object.keys(params).forEach((param) => {
            if (param === "discount_code") {
              let i = array.push(`%${params[param].trim().toLowerCase()}%`);
              x.push(
                `lower(discount_code) like $${i}`
              );
            } else if (param === 'active') {
              let i = array.push(params[param]);
            
              x.push(`active = $${i}`);
            } else if( param === 'expiry_date') {
                 let i = array.push(params[param]);
                 x.push(`expiry_date < $${i}`)
            }
          });
          if (x.length) {
            return ` where ${x.join(" and ")}`;
          } else return "";
        };
        let SQL = `SELECT * FROM discount_code  ${search(data,safeValues)} order by created_at desc limit $1 offset $2 ;`;
        let SQL2 = `SELECT count(*) FROM discount_code ${search(data,_safeValues)} ;`
        let { rows } = await client.query(SQL, safeValues);
        if (limit && offset) {
          let { rows: rows2 } = await client.query(SQL2, _safeValues);
          return { data: rows, count: Number(rows2[0]?.count) ?? 0 };
        } else {
          return { data: rows };
        }
       
      
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
        let {id, order_id} = data;
        let SQL = 'INSERT INTO promo(profile_id,discount_id, order_id) VALUES($1,$2,$3) RETURNING *;';
        let safeValue = [profile_id,id,order_id];
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
        let SQL = 'SELECT count(*) FROM promo WHERE profile_id =$2 AND discount_id = $1;';
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
    updateDiscountModel,
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