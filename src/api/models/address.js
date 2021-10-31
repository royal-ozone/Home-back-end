'use strict' ;
const client = require('../../db')
const addAddressModel = async(data,oldData,profileId)=>{
    try {
        let SQL = 'INSERT INTO address(profile_id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ;';
        const {street_name,building_number,apartment_number} =data ;
        const {country,city,first_name,last_name,mobile} =oldData;
        let safeValue = [profileId.id,country,city,first_name,last_name,mobile,street_name,building_number,apartment_number];
        let result = await client.query(SQL,safeValue);
        console.log("🚀 ~ file: address.js ~ line 10 ~ addAddressModel ~ result", result)
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
        let SQL = 'DELETE from address where id =$1;';
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
const updateAddressModel = async (id,oldData,data) => {
    try {
        let SQL ='UPDATE address SET country = $1,city =$2,mobile=$3,street_name =$4,building_number=$5,apartment_number=$6 WHERE id =$7 RETURNING * ;';
      
        const {country,city,mobile,street_name,building_number,apartment_number} = data;
        let safeValue = [country?country:oldData.country ,city?city:oldData.city,mobile?mobile:oldData.mobile,street_name?street_name:oldData.street_name,building_number?building_number:oldData.building_number,apartment_number?apartment_number:oldData.apartment_number,id];
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
        let SQL ='SELECT * FROM address WHERE profile_id= $1;';
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
module.exports = {
    addAddressModel,removeAddressModel,updateAddressModel,getAllAddressModel,getAddressByProfileIdModel
}