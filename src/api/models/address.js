'use strict' ;
const client = require('../../db')
const addAddressModel = async(data)=>{
    try {
        let SQL = 'INSERT INTO address(profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number,store_id,is_default,store_address,region) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING * ;';
        const {profile_id, country, street_name,building_number,apartment_number,city,first_name,last_name,mobile,store_id, is_default, store_address,region} =data ;
        let safeValue = [profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number,store_id,is_default,store_address,region];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        let response ={
            message: error.message,
        }
        return response;
    }
}
const removeAddressModel = async (id)=>{
    try {
        let SQL = 'UPDATE address SET display=$1 where id =$2 RETURNING * ;';
        let safeValue = [false,id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const updateAddressModel = async (data) => {
    try {
        let SQL ='UPDATE address SET country = $1,city =$2,mobile=$3,street_name =$4,building_number=$5,apartment_number=$6,first_name=$8, last_name=$9, is_default=$10, region=$11  WHERE id =$7 RETURNING * ;';
      
        const {country,city,mobile,street_name,building_number,apartment_number,id,first_name, last_name, is_default,region} = data;
        let safeValue = [country,city,mobile,street_name,building_number,apartment_number, id,first_name, last_name,is_default,region];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getAllAddressModel = async ()=>{
    try {
        let SQL ='SELECT * FROM address ;';
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getAddressByProfileIdModel = async (id)=>{
    try {
        let SQL ='SELECT * FROM address WHERE profile_id= $1 AND display=$2;';
        let safeValue = [id,true];
        let result = await client.query(SQL, safeValue)
        return result.rows;
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getStoreAddress = async (id)=>{
    try {
        let SQL = 'SELECT * from address WHERE profile_id=$1 AND store_address=$2 AND display=$2;'
        let safeValue = [id,true];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        let response = {
            message: error.message,
        }
        return response;
    }
}
const getAddressById = async (id)=>{
    try {
        let SQL ='SELECT * FROM address WHERE id= $1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    addAddressModel,removeAddressModel,updateAddressModel,getAllAddressModel,getAddressByProfileIdModel,getAddressById,getStoreAddress
}