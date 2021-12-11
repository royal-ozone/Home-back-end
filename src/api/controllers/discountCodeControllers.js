"use strict";
const {
  createDiscountCodeModel,
  getDiscountCodeById,
  updateActiveDiscountCodeByIdModel,
  updateDisconnectModel,
  removeDisconnectModel,
  getAllDiscountModel,
  checkCodeModel,
  updateCounterDiscountCode,
  addPromoModel,
  updateCounterPromoModel,
  getAllPromoModel,
  getPromoByProfileIdModel,
  getPromoByDiscountId
} = require("../models/discountCode");
const {
  updateDiscountCart
} = require("../models/cart")
const { myTimer, timer } = require("./helper");

const createDiscountCodeHandler = async (req, res) => {
  try {
    // let data= await getDiscountCodeById(id)

    let data = await createDiscountCodeModel(req.body);

    let response = {
      message: " successfully create discount code ",
      discountData: data,
    };
    res.status(200).send(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const updateActiveDiscountCodeHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let oldData = getDiscountCodeById(id);
    if (oldData) {
      let result = await updateActiveDiscountCodeByIdModel(req.body, id);
      let response = {
        message: `Successfully update Active discount code to ${result.active}`,
        updateData: result,
      };
      res.status(200).send(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const updateDisconnectHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let oldData = await getDiscountCodeById(id);
    if (oldData) {
      let result = await updateDisconnectModel({...oldData,...req.body});
      let response = {
        message: `Successfully update discount code who called (${result.discount_code})`,
        updateData: result,
      };
      res.status(200).send(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const removeDiscountHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let oldData = getDiscountCodeById(id);
    if (oldData) {
      let result = await removeDisconnectModel(id);
      let response = {
        message: `Successfully delete discount code `,
        updateData: result,
      };
      res.status(200).send(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const getAllDiscountHandlers = async (req, res, next) => {
  try {
    let result = await getAllDiscountModel();
    let response = {
      message: "Successfully get all discount code ",
      getAllData: result,
    };
    res.status(200).send(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(403).send(response);
  }
};
const checkCodeHandler = async (req, res, next) => {
  try {
    let profileId = req.user.profile_id;
    let result = await checkCodeModel(req.body);
    if (result) {
      if ( result.active == true && Number(result.counter) < Number(result.max_counter)) {

        let promoByDiscountId = await getPromoByDiscountId(result.id,profileId);
       
         
          if(promoByDiscountId){
            if (
              Number(promoByDiscountId.counter) < Number(result.number_of_time)
              ) {
              // let updateCounterPromo = await updateCounterPromoModel({id:promoByDiscountId.id,counter:promoByDiscountId.counter});
              // let updateData = await updateCounterDiscountCode(result);
              let cart = await updateDiscountCart({cart_id:req.user.cart_id,discount_id:result.id});
              let response = {
                message: " the discount code is activate ",
                data: result,
                promoData:promoByDiscountId,
                cart:cart
              };
              return res.status(200).send(response);
            }
          }
        
       else{
          let promoResult = await addPromoModel(profileId, result);
          if (promoResult) {
            if (
              Number(promoResult.counter) < Number(result.number_of_time)
              ) {
              // let updateCounterPromo = await updateCounterPromoModel({id:promoResult.id,counter:promoResult.counter});
              // let updateData = await updateCounterDiscountCode(result);
            let cart=  await updateDiscountCart({cart_id:req.user.cart_id,discount_id:result.id});
              let response = {
                message: "Successfully use discount code ",
                data: result,
                promoData:promoResult,
                cart :cart
              };
              return res.status(200).send(response);
            }
          }
        }
        
       
      }
      res.status(200).send("Unfortunately expired discount code");
    }
  } catch (error) {
    next(error);
    
  }
};
const getAllPromoHandler =async (req, res, next) => {
  try {
    let result = await getAllPromoModel();
    let response = {
      message:"SUCCESSFULLY get all promo",
      data_all:result
    }
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
}
const getPromoHandler =async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await getPromoByProfileIdModel(id);
    let response = {
      message:"SUCCESSFULLY get all promo",
      data_all:result,
    }
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createDiscountCodeHandler,
  updateActiveDiscountCodeHandler,
  updateDisconnectHandler,
  removeDiscountHandler,
  getAllDiscountHandlers,
  checkCodeHandler,
  getAllPromoHandler,
  getPromoHandler
};
