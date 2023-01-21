"use strict";
const {
  createDiscountCodeModel,
  getDiscountCodeById,
  updateActiveDiscountCodeByIdModel,
  updateDiscountModel,
  removeDisconnectModel,
  getAllDiscountModel,
  checkCodeModel,
  updateCounterDiscountCode,
  addPromoModel,
  updateCounterPromoModel,
  getAllPromoModel,
  getPromoByProfileIdModel,
  getPromoByDiscountId,
} = require("../models/discountCode");
const { updateDiscountCart } = require("../models/cart");
const { myTimer, timer } = require("./helper");

const createDiscountCodeHandler = async (req, res) => {
  try {

    let data = await createDiscountCodeModel(req.body);
    res.send({status: 200, data: data});
  } catch (error) {
    res.send({ status: 403, message: error });
  }
};
const updateActiveDiscountCodeHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let oldData = getDiscountCodeById(id);
    if (oldData) {
      let result = await updateActiveDiscountCodeByIdModel(req.body, id);
     
     res.send({status: 200, data: result});
    }
  } catch (error) {
  
    res.send({ status: 403, message: error });DiscountCode}
};
const updateDiscountCodeHandler = async (req, res, next) => {
  try {
    let result = await updateDiscountModel(req.body);
   
   res.send({status: 200, data: result});
  
  } catch (error) {
 
    res.send({ status: 403, message: error });
  }
};
const removeDiscountHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let oldData = getDiscountCodeById(id);
    if (oldData) {
      let result = await removeDisconnectModel(id);
    
     res.send({status: 200, data: result});
    }
  } catch (error) {
   
    res.send({ status: 403, message: error });
  }
};
const getAllDiscountHandlers = async (req, res, next) => {
  try {
    let result = await getAllDiscountModel(req.query);
   res.send({status: 200, data: result});
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.send({ status: 403, message: error });
  }
};
const checkCodeHandler = async (req, res, next) => {
  try {
    let profileId = req.user.profile_id;
    let result = await checkCodeModel(req.body);
    let { count } = await getPromoByDiscountId(result?.id, profileId);
    if (result) {
      if (new Date() > new Date(result.expiry_date)) {
        res.send({ status: 403, message: " code is expired" });
      } else if (Number(count) === result.number_of_time) {
        res.send({
          status: 403,
          message: " you reached the maximum usage limit",
        });
      } else if (Number(result.counter) >= Number(result.max_counter)) {
        res.send({ status: 403, message: "maximum uses reached" });
      } else if (req.body.order_amount < result.min_order_amount) {
        res.send({
          status: 403,
          message: "your order is not eligible for the discount",
        });
      } else {
        // let updateCounterPromo = await updateCounterPromoModel({id:promoByDiscountId.id,counter:promoByDiscountId.counter});
        let cart = await updateDiscountCart({
          cart_id: req.user.cart_id,
          discount_id: result.id,
        });
        res.send({ status: 200, message: "discount applied", result: result });
      }
    } else {
      res.send({ message: "promo code not found", status: 403 });
    }
  } catch (error) {
    res.send({message: error.message, status: 403});
   
  }
};
const getAllPromoHandler = async (req, res, next) => {
  try {
    let result = await getAllPromoModel();
    let response = {
      message: "SUCCESSFULLY get all promo",
      data_all: result,
    };
   res.send({status: 200, data: response});
  } catch (error) {
    res.send({message: error.message, status: 403});
  }
};
const getPromoHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await getPromoByProfileIdModel(id);
   res.send({status: 200, data: result});
  } catch (error) {
    res.send({message: error.message, status: 403});
  }
};

const routes = [
  {
  fn: getAllDiscountHandlers,
  auth: true,
  path: '/promo',
  method: 'get',
  type: 'admin'
},
{
  fn: updateDiscountCodeHandler,
  auth: true,
  path: '/promo',
  method: 'put',
  type: 'admin'
},
{
  fn: createDiscountCodeHandler,
  auth: true,
  path: '/promo',
  method: 'post',
  type: 'admin'
},
]
module.exports = {
  createDiscountCodeHandler,
  updateActiveDiscountCodeHandler,
  updateDiscountCodeHandler,
  removeDiscountHandler,
  getAllDiscountHandlers,
  checkCodeHandler,
  getAllPromoHandler,
  getPromoHandler,
  routes
};
