'use strict';
const client = require('../../db');
const addOfferModule = async (data)=> {
    try {
        let {store_id,entitle,artitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount_rate,price,currency,brand_name,description,quantity,age,size} = data;
        let SQL = 'INSERT INTO offer (store_id,entitle,artitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount_rate,price,currency,brand_name,description,quantity,age,size) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;';
        let safeValue = [store_id,entitle,artitle,metaTitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount_rate,price,currency,brand_name,description,quantity,age,size];
        let result =await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
const displayOfferModule = async (data)=> {
    try {
        let {display,id} = data;
        let SQL = 'UPDATE offer SET display=$1 WHERE id =$2 RETURNING *;';
        let safeValue = [display,id];
        let result =await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
const updateOfferModule = async (data)=> {
    try {
        let {entitle,artitle,metatitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount_rate,price,currency,brand_name,description,quantity,age,size,id} = data;
        let SQL = 'UPDATE offer SET entitle=$1,artitle=$2,metatitle=$3,sku=$4,parent_category_id=$5,child_category_id=$6,grandchild_category_id=$7,discount_rate=$8,price=$9,currency=$10,brand_name=$11,description=$12,quantity=$13,age=$14,size=$15 WHERE id =$16 RETURNING *;';
        let safeValue = [entitle,artitle,metatitle,sku,parent_category_id,child_category_id,grandchild_category_id,discount_rate,price,currency,brand_name,description,quantity,age,size,id];
        let result =await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateStatusOfferModule = async (data)=> {
    try {
        let {status,id} = data;
        let SQL = 'UPDATE offer SET status=$1 WHERE id =$2 RETURNING *;';
        let safeValue = [status,id];
        let result =await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const getOfferByStoreIdModule = async (store_id)=> {
    try {
        let SQL ='SELECT * FROM offer WHERE store_id=$1 ;';
        let safeValue = [store_id];
        let result = await client.query(SQL,safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getAllOfferModule = async ()=> {
    try {
        let SQL ='SELECT * FROM offer WHERE display=$1 AND status=$2; ';
        let safeValue = [true,'accepted']
        let result = await client.query(SQL,safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getALLOfferStatusModule = async (data)=> {
    try {
        let {status}= data;
        let SQL ='SELECT * FROM offer WHERE status=$1 ;';
        let safeValue = [status];
        let result = await client.query(SQL,safeValue);
        console.log("🚀 ~ file: offer.js ~ line 74 ~ getALLOfferStatusModule ~ result", result)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getALLOfferDisplayModule = async (data)=> {
    try {
        let {display}= data;
        let SQL ='SELECT * FROM offer WHERE display=$1 ;';
        let safeValue = [display];
        let result = await client.query(SQL,safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getOfferById =async (id)=> {
    try {
        
        let SQL ='SELECT * FROM offer WHERE id=$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const getStatusAcceptedOfferModule = async (data)=>{
    try {
        let {id}= data;
        let SQL ='SELECT * FROM offer WHERE id=$1  ;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const getCityStoreModule = async (store_id) => {
    try {
        let SQL = 'SELECT * FROM store WHERE id=$1 ;';
        let result = await client.query(SQL,[store_id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports={
    addOfferModule,
    displayOfferModule,
    updateOfferModule,
    updateStatusOfferModule,
    getOfferByStoreIdModule,
    getAllOfferModule,
    getALLOfferStatusModule,
    getALLOfferDisplayModule,
    getOfferById,
    getStatusAcceptedOfferModule,
    getCityStoreModule,
}