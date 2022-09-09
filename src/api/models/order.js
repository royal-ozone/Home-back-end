"use strict";
const client = require("../../db");
const { calculation } = require("../controllers/helper");
const orderId = require('order-id')('key');
var parse = require('postgres-interval')
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
    let SQL = "SELECT neo.*, a.first_name, a.last_name FROM new_order neo inner join address a ON neo.address_id = a.id WHERE neo.id =$1;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
   throw new Error(error.message);
  }
};

const getProductPictureByProductId = async (id) =>{
  try {
    let SQL = "SELECT product_picture from product_picture where product_id=$1;"
    let query = await client.query(SQL, [id])
    return query.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
const addOrderItemModel = async (data) => {
  try {
    const {order_id, product_id, store_id,price, quantity, discount ,price_after, profile_id,date_after_day,last_update, size, color} = data;

    let SQL =
      "INSERT INTO order_item(order_id,product_id,store_id,price,quantity,discount,price_after, profile_id,date_after_day,last_update, size, color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING * ;";
    let safeValue = [order_id, product_id,store_id, price, quantity, discount,price_after, profile_id,date_after_day,last_update,size,color];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    let response = {
      message: error.message,
    };
   throw new Error(response);
  }
};
const updateOrderStatusModel = async (data) => {
  try {
    let {status ,id}= data
    let SQL = "UPDATE new_order SET status=$1, updated=$3 WHERE id=$2 RETURNING *;";
    let safeValue = [status, id, new Date()];
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
    let SQL2  ='SELECT count(*) FROM order_item WHERE profile_id=$1'
    let result = await client.query(SQL, [id,limit,offset]);
    let {rows} = await client.query(SQL2, [id])
    return {data: result.rows,count: rows[0].count}
  } catch (error) {
    throw new Error(error.message)
  }
}
const updateOrderItemStatusModel = async (data,dateTimeNow) => {
  try {
    let {id,order_id,product_id,status, cancellation_reason} = data;
    let SQL = 'UPDATE order_item SET status=$1,last_update=$5, cancellation_reason=$6 WHERE id=$2 OR (order_id=$3 AND product_id=$4)  RETURNING *;';
    let result = await client.query(SQL,[status,id,order_id,product_id,dateTimeNow,cancellation_reason]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
}

const getOrderItemsByOrderId = async id => {
  try {
    let SQL = 'select oi.*, p.entitle , p.artitle, p.price as p_price from order_item oi inner join product p on p.id =oi.product_id where oi.order_id =$1 ;';
    let result = await client.query(SQL, [id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message)
  }
}
const getNotOrderItemsByOrderId = async ({id, store_id}) => {
  try {
    let SQL = 'select oi.*, p.entitle , p.artitle, p.price as p_price from order_item oi inner join product p on p.id =oi.product_id where oi.order_id =$1 and oi.status!=$2 and oi.store_id=$3 ;'
    // let SQL = 'SELECT * FROM order_item WHERE order_id=$1 AND status!=$2;';
    let result = await client.query(SQL, [id,'pending',store_id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message)
  }
}
const getOrderItemsByOrderIdAndStatus = async ({status, id}) =>{
  try {
       let SQL = 'SELECT * FROM order_item WHERE order_id=$1 AND status=$2;';
       let safeValues = [id, status];
       let {rows} = await client.query(SQL, safeValues)
       return rows
  } catch (error) {
    throw new Error(error.message)
  }
}

const getPendingOrderItemsByOrderId = async ({id, store_id}) => {
  try {
    let SQL = 'select oi.*, p.entitle ,p.artitle, p.price as p_price from order_item oi inner join product p on p.id =oi.product_id where oi.order_id =$1 and oi.status=$2 and oi.store_id=$3;';
    let result = await client.query(SQL, [id,'pending', store_id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message)
  }
}
const getOrdersByPendingOrderItems = async data => {
  try {
    let {id,limit,offset} = data
    let SQL = 'SELECT DISTINCT order_id FROM order_item WHERE store_id=$1 AND status=$2 LIMIT $3 OFFSET $4;';
    let SQL2 = 'SELECT count(DISTINCT order_id) FROM order_item WHERE store_id=$1 AND status=$2;';
    let result = await client.query(SQL, [id,'pending',limit,offset]);
    let result2 = await client.query(SQL2, [id,'pending']);
    return{ orders: result.rows, count: result2.rows[0].count};
  } catch (error) {
    throw new Error(error.message)
  }
}

const getOrdersByNotPendingOrderItems = async data => {
  try {
    let {id,status,limit,offset,order_id} = data
     let SQL = `SELECT DISTINCT oi.order_id FROM order_item oi inner join new_order neo on neo.id = oi.order_id WHERE oi.store_id=$1 ${status ? ` AND neo.status=$4`: ` AND neo.status!=$4`} ${order_id ? ` and neo.customer_order_id like $4`: ''} LIMIT $2 OFFSET $3;`
    let SQL2 = `SELECT count(DISTINCT order_id) FROM order_item oi inner join new_order neo on neo.id=oi.order_id WHERE oi .store_id=$1  ${status ? ` AND neo.status=$2`: ` AND neo.status!=$2`} ${order_id ? ` and neo.customer_order_id like $2`: ''}`
    let safeValues = [id, limit,offset]
    let safeValues2 = [id]
    order_id && safeValues.push(`%${order_id}%`) && safeValues2.push(`%${order_id}%`)
    status && safeValues.push(status) && safeValues2.push(status)
    !status && !order_id && safeValues.push('pending') && safeValues2.push('pending')
    let result = await client.query(SQL, safeValues);
    let result2 = await client.query(SQL2, safeValues2);
    
    return {orders:result.rows, count:result2.rows[0].count};
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
const getAllOrderItemByStoreId = async storeId => {
  try {
    let SQL = 'SELECT * FROM order_item WHERE store_id=$1;';
    let result = await client.query(SQL, [storeId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message)
  }
}
const getOrdersByStatus = async (status) => {
  try {
    let SQL = 'SELECT * FROM new_order WHERE status=$1';
    let result = await client.query(SQL, [status]);
    return result.rows
  } catch (error) {
    throw new Error(error.message)
  }
}

const toBeReleasedItems = async ()=>{
  try {
    let SQL = `select oi.*, bt.status as t_status   from order_item oi inner join new_order no2 on no2.id = oi.order_id left join business_transaction bt ON bt.order_item_id = oi.id where oi.status = $1 and no2.updated <  now() -  $2 * interval '1 day' and  no2.status = $3  and oi.id not in (select order_item_id from business_transaction bt2 where status = $4)`
    let safeValues = ['accepted', 1, 'delivered', 'released' ]
    let result = await client.query(SQL,safeValues)
    return result.rows
  } catch (error) {
    throw new Error(error.message)
  }
}
const updateOrderLog= async ()=>{
  try {
    let response = await getAllOrderModel(10000000, 0)
     response.map( async order =>{
     let SQL = 'insert into order_log (order_id,status, at) values($1,$2,$3) returning *'
     let safeValues = [order.id, order.status, order.updated]
     let result = await client.query(SQL, safeValues)
     console.log("🚀 ~ file: order.js ~ line 221 ~ updateOrderLog ~ result", result.rows[0])
    })

  } catch (error) {
    throw new Error(error.message)
  }
}

const updateOrderLog2= async ()=>{
  try {
    let response = await getAllOrderModel(10000000, 0)
     response.map( async order =>{
     let SQL = 'insert into order_log (order_id,status, at) values($1,$2,$3) returning *'
     let safeValues = [order.id, 'pending', order.created_at]
     let result = await client.query(SQL, safeValues)
     console.log("🚀 ~ file: order.js ~ line 221 ~ updateOrderLog ~ result", result.rows[0])
    })

  } catch (error) {
    throw new Error(error.message)
  }
}
// updateOrderLog()
console.log("🚀 ~ file: order.js ~ line 246 ~ process.env.dev", process.env.dev)

!process.env.dev && updateOrderLog() && updateOrderLog2()
module.exports = {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
  getAllOrderProfileIdModel,
  updateOrderItemStatusModel,
  getOrderItemsByOrderId,
  getOrderItemByProductId,
  getAllOrderItemByStoreId,
  getOrdersByPendingOrderItems,getPendingOrderItemsByOrderId,
  getNotOrderItemsByOrderId,getOrdersByNotPendingOrderItems,
  getProductPictureByProductId,
  getOrdersByStatus,
  getOrderItemsByOrderIdAndStatus,
  toBeReleasedItems
};
