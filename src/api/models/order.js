"use strict";
const client = require("../../db");
const { calculation } = require("../controllers/helper");
const addOrderModel = async (cartData,profile_id) => {
  try {
    // const {tax, shipping, discount, sub_total } = data;
    
    let SQL =
      "INSERT INTO new_order(profile_id,address_id) VALUES ($1,$2) RETURNING * ;";
    let safeValue = [
      profile_id,
      cartData.address_id,
    ];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const getOrderByIdModel = async (id) => {
  try {
    let SQL = "SELECT * FROM new_order WHERE id =$1;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const addOrderItemModel = async (cartItemData, order_id) => {
  try {
    const { product_id, price, quantity, discount ,price_after} = cartItemData;

    let SQL =
      "INSERT INTO order_item(order_id,product_id,price,quantity,discount,price_after) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ;";
    let safeValue = [order_id, product_id, price, quantity, discount,price_after];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const updateOrderStatusModel = async (id,data) => {
  try {
    let SQL = "UPDATE new_order SET status=$1 WHERE id=$2 RETURNING *;";
    let safeValue = [data.status, id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const getAllOrderModel = async () => {
  try {
    let SQL = "SELECT * FROM new_order ;";
    let result = await client.query(SQL);
    return result.rows;
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const updateOrderModelById =async (data,sub_total)=>{
  try {
    const {order_id,tax,shipping,discount}= data;
   let grand_total =  calculation(tax, discount, shipping, sub_total);
    let SQL = 'UPDATE new_order SET sub_total=$1 ,tax=$2,shipping=$3,discount=$4,grand_total=$5 WHERE id=$6 RETURNING *;';
    let safeValue = [sub_total,tax,shipping,discount,grand_total,order_id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
}
const getAllOrderProfileIdModel =async (id)=> {
  try {
    let SQL ='SELECT * FROM new_order WHERE profile_id=$1;';
    let result = await client.query(SQL, [id]);
    return result.rows
  } catch (error) {
    throw new Error(error.message)
  }
}
const updateOrderItemCancelModel = async (data) => {
  try {
    let {id,status} = data;
    let SQL = 'UPDATE order_item SET status=$1 WHERE id=$2  RETURNING *;';
    let result = await client.query(SQL,[status,id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
}
module.exports = {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
  updateOrderModelById,
  getAllOrderProfileIdModel,
  updateOrderItemCancelModel
};
