"use strict";


const {addDeliveryTask} = require('../models/deliveryTask');

const {
  getCartByProfileIdModel,
  getCartItemByProductId,
  removeCartItemModelByCartId,
  getALLCartItemByCartId,
} = require("../models/cart");
const {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
  updateOrderModelById,
  getAllOrderProfileIdModel,
  updateOrderItemCancelModel
} = require("../models/order");
const { getProfileByUserId } = require("../../auth/models/user");
const { getProduct } = require("../models/products");
const { calculation } = require("./helper");

const addOrderHandler = async (req, res, next) => {
  try {
    let profile_id =req.user.profile_id;
    let cartData = await getCartByProfileIdModel(profile_id);
    // let profileData = await getProfileByUserId(req.user.id);

    ////////////// I want all these in update order //////////////////
    
  

    let data = await addOrderModel(cartData,profile_id);
    let response = {
      message: "successfully add new order",
      new_order: data,
    };
    
    res.status(200).json(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const addOrderItemHandler = async (req, res) => {
  try {
    let order_id = req.body.order_id;
    let checkOrder = await getOrderByIdModel(order_id);
    if(checkOrder.sub_total === 0){
      
      // let cartData = await getCartByProfileIdModel(req.user.profile_id);
      let allCartItem = await getALLCartItemByCartId(req.user.cart_id);
      let sub_total = 0;
  
      let productArray = await allCartItem.map(async (cartItem) => {
        let result = await addOrderItemModel(cartItem,order_id);
        sub_total += cartItem.price_after
        return result;
      });
  
      if (productArray) {
  
        let response = {
          message: "successfully add order item ",
          order_item: await Promise.all(productArray),
          sub_total:sub_total,
  
        };
        await removeCartItemModelByCartId(req.user.cart_id);
       let orderData= await updateOrderModelById(req.body,sub_total);
        // await removeCartByProfileId(req.user.profile_id);
        let obj ={
          response,
          orderData
        }
        return res.status(200).json(obj);
      }
    }
   let response = {
     message:"added order before",
     your_order: checkOrder
   }
    res.status(403).send(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const updateOrderStatusHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let data = await updateOrderStatusModel(id,req.body);
    if(data.status === 'approved' || data.status === 'accepted') {
      await addDeliveryTask({order_id: data.id,address_id:data.address_id});
    }
    let response = {
      message: `Successfully update status order to ${data.status}`,
      dataOrder: data,
    };
    res.status(200).send(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const getAllOrderHandler = async (req, res, next) => {
  try {
    let data = await getAllOrderModel();
    let response = {
      message: "successfully get all orders ",
      all_order: data,
    };
    res.status(200).send(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const getAllOrderProfileIdHandler = async (req, res)=>{
  try {
    let data = await getAllOrderProfileIdModel(req.user.profile_id);
    res.status(200).json({message:'Successfully get your orders',your_order:data});
  } catch (error) {
    res.status(404).send('you do not have any orders before');
  }
}
const updateOrderItemCancelHandler =async (req,res) => {
  try {
    let data = await updateOrderItemCancelModel(req.body);
    res.status(200).json({message:'Successfully update status order item',data});
  } catch (error) {
    res.status(403).send('something went wrong');
  }
}
module.exports = {
  addOrderHandler,
  addOrderItemHandler,
  updateOrderStatusHandler,
  getAllOrderHandler,
  getAllOrderProfileIdHandler,
  updateOrderItemCancelHandler
};
