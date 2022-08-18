"use strict";


const { addDeliveryTask } = require('../models/deliveryTask');
const { getStoreProducts } = require('../models/products');
const { addOrderNotificationHandler } = require('./orderNotificationController');
const { getOrderNotificationByOrderId } = require('../models/orderNotifications');

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
  getOrderItemByProductId,
  getAllOrderItemByStoreId,
  getOrdersByPendingOrderItems, getPendingOrderItemsByOrderId,
  getNotOrderItemsByOrderId,
  getOrdersByNotPendingOrderItems,
  getProductPictureByProductId
} = require("../models/order");
const {
  getAddressById
} = require("../models/address");
const {
  updateCounterDiscountCode,
  updateCounterPromoModel,
  getPromoByDiscountId,
  checkCodeModel,
  addPromoModel
} = require("../models/discountCode");

const {
  dateTimeNow,
  dateTimeTomorrow,
  differentBetweenDate,
  currentDateDiffByDay,
  twoDatesDiffByDay
} = require("./helper");

const {
  updateStoreReview,
  updateStoreReview2,
  getStoreReview2ByStoreId,
  addStoreReview2
} = require("../models/stores");

const { decreaseSizeQuantity, increaseSizeQuantity } = require("../models/products")
const addOrderHandler = async (req, res, next) => {
  try {
    const { address_id, discount_id } = req.body
    let profile_id = req.user.profile_id;
    // let cartData = await getCartByProfileIdModel(profile_id);
    let cartItems = await getALLCartItemByCartId(req.user.cart_id)
    if (cartItems.length > 0) {
      let data = await addOrderModel({ profile_id: profile_id, ...req.body });
      if (data.id) {

        let productArray = await cartItems.map(async (cartItem) => {
          let result = await addOrderItemModel({ ...cartItem, order_id: data.id, profile_id: req.user.profile_id, date_after_day: dateTimeTomorrow(), last_update: dateTimeNow() });
          await decreaseSizeQuantity({ id: cartItem.product_id, quantity: cartItem.quantity, size: cartItem.size, color: cartItem.color })
          // if(cartItem.size){

          // }
          return result;
        });
        if (productArray) {
          let updateCounterPromo;
          let updateData;
          if (discount_id) {
            let result = await checkCodeModel({ id: discount_id });
            // let promoByDiscountId = await getPromoByDiscountId(discount_id, profile_id);
            updateCounterPromo = await addPromoModel(req.user.profile_id, { id: discount_id, order_id: data.id });
            updateData = await updateCounterDiscountCode(result);
          }
          let obj = {
            message: 'Order has been placed successfully',
            order: data,
            order_items: await Promise.all(productArray),
            updateCounterPromo: updateCounterPromo,
            updateData: updateData,
            status: 200,
          }
          await removeCartItemModelByCartId(req.user.cart_id);
          await updateCart({ id: req.user.cart_id });

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
    let data = await updateOrderStatusModel(req.body);
    let notificationObj;

    if (data.status === 'accepted') {
      let check = await getOrderNotificationByOrderId(data.id);
      if (!check) {
        let storeArray = [];
        let allDataOrderItem = await getOrderItemsByOrderId(data.id);

        allDataOrderItem.map(async (orderItem) => {
          storeArray.push(orderItem.store_id);
        });
        let filtered = storeArray.filter((item, i, ar) => ar.indexOf(item) === i);


        filtered.map(async (id) => {

          let x = await addOrderNotificationHandler({ receiver_id: id, order_id: data.id, message: 'you have order please prepare order ' });

        });
        notificationObj = {
          stores_id: await Promise.all(filtered)
        }

      }

    }
    if (data.status === 'ready to be shipped') {
      await addDeliveryTask({ order_id: data.id, address_id: data.address_id });
    }

    if (data.status === 'canceled') {
      let a = await getOrderItemsByOrderId(data.id)
      let pendingOrderItems = a.filter(val => val.status !== 'canceled')
      await pendingOrderItems.map(async item => {
        await updateOrderItemStatusModel({ ...item, status: 'canceled' }, dateTimeNow());
        await increaseSizeQuantity({ id: item.product_id, quantity: item.quantity, size: item.size, color: item.color })
      })
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
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    let data = await getAllOrderModel(limit, offset);
    let response = {
      message: "successfully get all orders ",
      all_order: data,
    };
    req.orders = data
    next()
    // res.status(200).send(response);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
const getAllOrderProfileIdHandler = async (req, res, next) => {
  try {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    let data = await getAllOrderProfileIdModel(req.user.profile_id, limit, offset);
    let orderArray = data.map(async order => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      order['items'] = orderItems
      return order
    })
    req.orders = await Promise.all(orderArray)
    next()
    // res.status(200).json({orders: await Promise.all(orderArray)});
  } catch (error) {
    res.status(403).send('you do not have any orders before');
  }
}
const updateOrderItemStatusHandler = async (req, res) => {
  try {

    let data = await updateOrderItemStatusModel(req.body, dateTimeNow());
    let { fulfilled_orders, ontime_orders, overall_orders } = await getStoreReview2ByStoreId(data.store_id);


    if (data.status === 'accepted') {
      // let day = differentBetweenDate(data.last_update, data.date_after_day);
      let day =  currentDateDiffByDay(data.created_at)

      if (day > 1) {
        fulfilled_orders++;
        overall_orders++;
        let updateOnTimeShipmentRate = await updateStoreReview2(data.store_id, { fulfilled_orders, ontime_orders, overall_orders, last_update: dateTimeNow() });
      }
      else {
        fulfilled_orders++;
        overall_orders++;
        ontime_orders++;

        let updateOnTimeShipmentRate = await updateStoreReview2(data.store_id, { fulfilled_orders, ontime_orders, overall_orders, last_update: dateTimeNow() });

      }
    }
    if (data.status === 'canceled') {
      await increaseSizeQuantity({ id: data.product_id, size: data.size, color:data.color, quantity: data.quantity })
      overall_orders++;
      let updateOnTimeShipmentRate = await updateStoreReview2(data.store_id, { fulfilled_orders, ontime_orders, overall_orders, last_update: dateTimeNow() });
    }
    let orderItems = await getOrderItemsByOrderId(data.order_id);

    let pending = orderItems.filter(item => item.status === 'pending');
    let accepted = orderItems.filter(item => item.status === 'accepted');
    let canceled = orderItems.filter(item => item.status === 'canceled');

    if (pending.length === 0 && accepted.length !== 0) {
     
     await updateOrderStatusModel({ id: data.order_id, status: 'accepted' })
    } else if (pending.length === 0 && accepted.length === 0 && canceled.length !== 0) {
      await updateOrderStatusModel( {id: data.order_id, status: 'canceled' })
    }
    res.json({ status: 200, message: 'Successfully update status order item', result: {...req.body,...data} });
  } catch (error) {
    res.send({ status: 403, message: error.message });
  }
}

const getOrderByStoreIdHandler = async (req, res) => {
  try {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    let products = await getStoreProducts(req.user.store_id, limit, offset);

    let productsArray = products.map((product) => {
      return product.id
    })
    let orders = await getAllOrderModel()
    let orderArray = orders.map(async (order) => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      let itemsArray = orderItems.filter((item) => productsArray.includes(item.product_id))
      order['items'] = itemsArray
      return order
    })
    let final = await Promise.all(orderArray)
    let filtered = final.filter(order => order.items.length > 0)

    res.status(200).json({ orders: filtered })
  } catch (error) {
    res.status(403).send(error.message)
  }
}

const getOrderByStoreIdHandlerTwo = async (req, res) => {
  try {
    let allOrder = await getAllOrderModel();
    let orders = allOrder.map(async (order) => {
      let orderItems = await getOrderItemsByOrderId(order.id);
      let profile = await getAddressById(order.address_id);
      let items = orderItems.filter((item) => item.store_id === req.user.store_id)
      if (items.length > 0) {
        order['full name'] = profile.first_name + ' ' + profile.last_name;
        order['items'] = items;
        return order
      }

    });
    let final = await Promise.all(orders);
    let filtered = final.filter(items => items);
    res.status(200).json({ orders: await Promise.all(filtered) })
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
}

const getSellerOrdersByPendingStatus = async (req, res) => {
  try {
    let limit = req.query.limit || 5;
    let offset = req.query.offset || 0;
    let {orders, count} = await getOrdersByPendingOrderItems({ id: req.user.store_id, status: req.body.status, limit: limit, offset: offset })
    let sellerOrders = await orders.map(async ({ order_id }) => {
      let detailedOrder = await getOrderByIdModel(order_id)
      let items = await getPendingOrderItemsByOrderId(order_id)
      let itemsWithPicture = await items.map(async value => {
        let pic = await getProductPictureByProductId(value.product_id)
        return { ...value, picture: pic?.product_picture }
      })
      detailedOrder['items'] = await Promise.all(itemsWithPicture)
      return detailedOrder
    })
    res.json({ orders: await Promise.all(sellerOrders), count: count })
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
}

const getSellerOrdersByNotPendingStatus = async (req, res) => {
  try {
    let limit = req.query.limit || 5;
    let offset = req.query.offset || 0;
    let {orders, count} = await getOrdersByNotPendingOrderItems({ id: req.user.store_id, status: req.query.status, limit: limit, offset: offset, order_id: req.query.order_id })
    let sellerOrders = orders.map(async ({ order_id }) => {
      let detailedOrder = await getOrderByIdModel(order_id)
      let items = await getNotOrderItemsByOrderId(order_id)
      let itemsWithPicture = await items.map(async value => {
        let pic = await getProductPictureByProductId(value.product_id)
        return { ...value, picture: pic?.product_picture }
      })
      detailedOrder['items'] = await Promise.all(itemsWithPicture)
      return detailedOrder
    })
    res.json({ orders: await Promise.all(sellerOrders), count: count })
  } catch (error) {
    res.json({ status: 403, message: error });
  }
}

module.exports = {
  addOrderHandler,
  updateOrderStatusHandler,
  getAllOrderHandler,
  getAllOrderProfileIdHandler,
  updateOrderItemStatusHandler,
  getOrderByStoreIdHandler,
  getOrderByStoreIdHandlerTwo,
  getSellerOrdersByPendingStatus,
  getSellerOrdersByNotPendingStatus
};
