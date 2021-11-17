"use strict";
const client = require("../../db");
const addOrderModel = async (data,cartData,profile_id, grand_total) => {
  try {
    const { status, tax, shipping, discount, sub_total } = data;
    
    let SQL =
      "INSERT INTO new_order(profile_id,address_id,tax,shipping,discount,sub_total,grand_total) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING * ;";
    let safeValue = [
      profile_id,
      cartData.address_id,
      tax,
      shipping,
      discount,
      sub_total,
      grand_total,
    
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
    const { product_id, price, quantity, discount } = cartItemData;

    let SQL =
      "INSERT INTO order_item(order_id,product_id,price,quantity,discount) VALUES ($1,$2,$3,$4,$5) RETURNING * ;";
    let safeValue = [order_id, product_id, price, quantity, discount];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
    return response;
  }
};
const updateOrderStatusModel = async (id, data) => {
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
module.exports = {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
};
