"use strict";


const {addDeliveryTask} = require('../models/deliveryTask');
const {getStoreProducts} = require('../models/products');
const {addOrderNotificationHandler} =require('./orderNotificationController');
const {getOrderNotificationByOrderId} = require('../models/orderNotifications');
const {
  getCartByProfileIdModel,
  getCartItemByProductId,
  removeCartItemModelByCartId,
  getALLCartItemByCartId,
  updateCart,
} = require("../models/cart");
const {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
  updateOrderModelById,
  getAllOrderProfileIdModel,
  updateOrderItemStatusModel,
  getOrderItemsByOrderId,
  getOrderItemByProductId
} = require("../models/order");
const {
  getAddressById
} = require("../models/address");
const {
  updateCounterDiscountCode,
  updateCounterPromoModel,
  getPromoByDiscountId,
  checkCodeModel
}= require("../models/discountCode");
const addOrderHandler = async (req, res, next) => {
  try {
    let profile_id =req.user.profile_id;
    let cartData = await getCartByProfileIdModel(profile_id);
    let cartItems = await getALLCartItemByCartId(req.user.cart_id)
    if(cartItems.length > 0) {
      let data = await addOrderModel({...cartData,profile_id:profile_id,...req.body});
      if(data.id){
    
        let productArray = await cartItems.map(async (cartItem) => {
          let result = await addOrderItemModel({...cartItem,order_id: data.id, profile_id:req.user.profile_id});
          return result;
        });   
        if (productArray) {
            let updateCounterPromo ;
            let updateData ;
          if(cartData.discount_id){
            let result = await checkCodeModel({id:cartData.discount_id});
            let promoByDiscountId = await getPromoByDiscountId(cartData.discount_id,profile_id);
             updateCounterPromo = await updateCounterPromoModel({id:promoByDiscountId.id,counter:promoByDiscountId.counter});
             updateData = await updateCounterDiscountCode(result);
          }
            let obj ={
              message: 'Order has been placed successfully',
              order: data,
              order_items: await Promise.all(productArray),
              updateCounterPromo:updateCounterPromo,
              updateData: updateData
            }
            await removeCartItemModelByCartId(req.user.cart_id);
            await updateCart({id:req.user.cart_id});
            
            return res.status(200).json(obj);
        } 
      }
      res.status(403).send(data)
    }
    res.status(403).send('there`s no item in your cart')
  } catch (error) {
    res.status(403).send(error.message);
  }
};
const updateOrderStatusHandler = async (req, res, next) => {
  try {
    let id = req.body.id || req.body;
    let data = await updateOrderStatusModel(id,req.body);
    let notificationObj;
    
    if(data.status === 'accept') {
      let check = await getOrderNotificationByOrderId(data.id);
       if(!check){
        let storeArray =[];
        let allDataOrderItem = await getOrderItemsByOrderId(data.id);
        
        allDataOrderItem.map(async (orderItem) => {
          storeArray.push(orderItem.store_id);
        });
         let filtered = storeArray.filter((item, i, ar) => ar.indexOf(item) === i);
        //[...new Set(storeArray)];
        
         filtered.map( async (id) =>{
        
          let x =  await addOrderNotificationHandler({receiver_id:id, order_id :data.id, message: 'you have order please prepare order '});
          
          });
           notificationObj = {
            stores_id: await Promise.all(filtered)
          } 
          
              
      }
      
    }
    if(data.status === 'ready to be shipped') {
      await addDeliveryTask({order_id: data.id,address_id:data.address_id});
    }
    
    let response = {
      message: `Successfully update status order to ${data.status}`,
      dataOrder: data,
      notification: notificationObj,
    };
    res.status(200).json(response);
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
    res.status(403).send(error.message);
  }
};
const getAllOrderProfileIdHandler = async (req, res)=>{
  try {
    let data = await getAllOrderProfileIdModel(req.user.profile_id);
    let orderArray = data.map(async order => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      order['items'] = orderItems
      return order
    })
    res.status(200).json({orders: await Promise.all(orderArray)});
  } catch (error) {
    res.status(404).send('you do not have any orders before');
  }
}
const updateOrderItemStatusHandler = async (req,res) => {
  try {
    let data = await updateOrderItemStatusModel(req.body);
    let orderItems = await getOrderItemsByOrderId(data.order_id);
    let pending = orderItems.filter(item => item.status === 'pending');
    let accepted = orderItems.filter(item => item.status === 'accepted');
    let canceled = orderItems.filter(item => item.status === 'canceled');
    if(pending.length === 0 && accepted.length !== 0) {
      await updateOrderStatusModel(data.order_id, {status: 'accepted'})
    } else if (pending.length === 0 && accepted.length === 0  && canceled.length !== 0) {
      await updateOrderStatusModel(data.order_id, {status: 'canceled'})
    }
    res.status(200).json({message:'Successfully update status order item',data});
  } catch (error) {
    res.status(403).send('something went wrong');
  }
}

const getOrderByStoreIdHandler = async (req, res) =>{
  try {
    let products = await getStoreProducts(req.user.store_id);
    
    let productsArray = products.map((product) => {
      return product.id
    })
    let orders = await getAllOrderModel()
    let orderArray = orders.map( async(order) => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      let itemsArray = orderItems.filter((item) => productsArray.includes(item.product_id))
      order['items'] = itemsArray
      return order
    })
    let final = await Promise.all(orderArray)
    let filtered = final.filter(order => order.items.length > 0)

    res.status(200).json({orders: filtered })
  } catch (error) {
    res.status(403).send(error.message)
  }
}

const getOrderByStoreIdHandlerTwo = async (req, res) => {
  try {    
    let allOrder = await getAllOrderModel();
    let orders = allOrder.map( async (order) => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      let profile = await getAddressById(order.address_id);
      let items =  orderItems.filter((item) => item.store_id === req.user.store_id)
       if(items.length >0){
         order['full name'] =profile.first_name + ' ' + profile.last_name;
         order['items']= items;
        return order
      }
      
    });
    let final = await Promise.all(orders);
    let filtered = final.filter(items => items);
    res.status(200).json({orders:await Promise.all(filtered)})    
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}

module.exports = {
  addOrderHandler,
  updateOrderStatusHandler,
  getAllOrderHandler,
  getAllOrderProfileIdHandler,
  updateOrderItemStatusHandler,
  getOrderByStoreIdHandler,
  getOrderByStoreIdHandlerTwo
};
