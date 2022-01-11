"use strict";
const client = require("../../db");
const { calculation } = require("../controllers/helper");
const orderId = require('order-id')('key');
const addOrderModel = async (data) => {
  try {
    const id = orderId.generate();

    let {profile_id, address_id, tax,shipping,discount_id,sub_total,grand_total} =data 
    let SQL =
      "INSERT INTO new_order(profile_id,address_id,tax,shipping,discount_id,sub_total,grand_total,customer_order_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ;";
    let safeValue = [
      profile_id,
      address_id,tax,shipping,discount_id,sub_total,grand_total,orderId.getTime(id)
    ];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
};
const getOrderByIdModel = async (id) => {
  try {
    let SQL = "SELECT * FROM new_order WHERE id =$1;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
   throw new Error(error.message);
  }
};
const addOrderItemModel = async (data) => {
  try {
    const {order_id, product_id, store_id,price, quantity, discount ,price_after, profile_id} = data;

    let SQL =
      "INSERT INTO order_item(order_id,product_id,store_id,price,quantity,discount,price_after, profile_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ;";
    let safeValue = [order_id, product_id,store_id, price, quantity, discount,price_after, profile_id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
   throw new Error(response);
  }
};
const updateOrderStatusModel = async (id,data) => {
  try {
    let SQL = "UPDATE new_order SET status=$1 WHERE id=$2 RETURNING *;";
    let safeValue = [data.status, id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
   throw new Error(error.message);
  }
};
const getAllOrderModel = async (limit,offset) => {
  try {
    let SQL = "SELECT * FROM new_order LIMIT $1 OFFSET $2;";
    let result = await client.query(SQL, [limit,offset]);
    return result.rows;
  } catch (error) {
    let response = {
      message: error.message,
    };
   throw new Error(response);
  }
};

const getAllOrderProfileIdModel =async (id,limit,offset)=> {
  try {
    let SQL ='SELECT * FROM new_order WHERE profile_id=$1 LIMIT $2 OFFSET $3;';
    let result = await client.query(SQL, [id,limit,offset]);
    return result.rows
  } catch (error) {
    throw new Error(error.message)
  }
}
const updateOrderItemStatusModel = async (data) => {
  try {
    let {id,order_id,product_id,status} = data;
    let SQL = 'UPDATE order_item SET status=$1 WHERE id=$2 OR (order_id=$3 AND product_id=$4)  RETURNING *;';
    let result = await client.query(SQL,[status,id,order_id,product_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
}

const getOrderItemsByOrderId = async id => {
  try {
    let SQL = 'SELECT * FROM order_item WHERE order_id=$1;';
    let result = await client.query(SQL, [id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message)
  }
}

const getOrderItemByProductId = async id => {
  try {
    let SQL = 'SELECT * FROM order_item WHERE product_id=$1;';
    let result = await client.query(SQL, [id]);
    return result.rows;
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
  getAllOrderProfileIdModel,
  updateOrderItemStatusModel,
  getOrderItemsByOrderId,
  getOrderItemByProductId
};
