"use strict";


const {addDeliveryTask} = require('../models/deliveryTask');

const {
  getCartByProfileIdModel,
  getCartItemByProductId,
  removeCartItemModel,
  getALLCartItemByCartId,
  removeCartByProfileId,
} = require("../models/cart");
const {
  addOrderModel,
  addOrderItemModel,
  getOrderByIdModel,
  updateOrderStatusModel,
  getAllOrderModel,
} = require("../models/order");
const { getProfileByUserId } = require("../../auth/models/user");
const { getProduct } = require("../models/products");
const { calculation } = require("./helper");

const addOrderHandler = async (req, res, next) => {
  try {
    let cartData = await getCartByProfileIdModel(req.user.profile_id);
    let profileData = await getProfileByUserId(req.user.id);
    const { tax, discount, shipping, sub_total } = req.body;

    let grand_total = calculation(tax, discount, shipping, sub_total);
    let data = await addOrderModel(req.body, profileData, grand_total);
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
const addOrderItemHandler = async (req, res, next) => {
  try {
    let order_id = req.query.order_id;
    let cartData = await getCartByProfileIdModel(req.user.profile_id);
    let allCartItem = await getALLCartItemByCartId(cartData.id);

    let productArray = await allCartItem.map(async (cartItem) => {
      let result = await addOrderItemModel(cartItem, order_id);

      return result;
    });

    if (productArray) {
      let response = {
        message: "successfully add order item ",
        order_item: await Promise.all(productArray),
      };
      await removeCartItemModel(cartData.id);
      await removeCartByProfileId(req.user.profile_id);
      return res.status(200).json(response);
    }
    res.status(403).send("can not add order item");
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const updateOrderStatusHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await updateOrderStatusModel(id, req.body);
    if(data.status === 'approved' || data.status === 'accepted') {
      await addDeliveryTask({order_id: data.id})
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

module.exports = {
  addOrderHandler,
  addOrderItemHandler,
  updateOrderStatusHandler,
  getAllOrderHandler,
};
