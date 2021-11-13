"use strict";
const {
  createDiscountCodeModel,
  getDiscountCodeById,
  updateActiveDiscountCodeByIdModel,
  updateDisconnectModel,
  removeDisconnectModel,
  getAllDiscountModel,
  checkCodeModel,
  updateCounterDiscountCode

  
} = require("../models/discountCode");

const { myTimer, timer } = require("./helper");

const createDiscountCodeHandler = async (req, res, next) => {
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
const updateActiveDiscountCodeHandler = async (req,res,next) => {
    try {
       let id = req.params.id;
       let oldData = getDiscountCodeById(id);
       if(oldData){
        let result = await updateActiveDiscountCodeByIdModel(req.body,id);
        let response ={
            message: `Successfully update Active discount code to ${result.active}`,
            updateData: result
        }
        res.status(200).send(response);
       }
       
    }
    catch (error) {
        let response = {
            message: error.message,
        };
      res.status(403).send(response);
    }
}
const updateDisconnectHandler = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let oldData = getDiscountCodeById(id);
        if(oldData){
            let result = await updateDisconnectModel(req.body,id);
            let response ={
                message:`Successfully update discount code who called (${result.discount_code})`,
                updateData : result
            }
            res.status(200).send(response)
        }
    } catch (error) {
        let response = {
            message: error.message,
        };
      res.status(403).send(response);
    }
}
const removeDiscountHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        let oldData = getDiscountCodeById(id);
        if(oldData){
            let result = await removeDisconnectModel(id);
            let response ={
                message:`Successfully delete discount code `,
                updateData : result
            }
            res.status(200).send(response)
        }
    } catch (error) {
        let response = {
            message: error.message,
        };
      res.status(403).send(response);
    }
}
const getAllDiscountHandlers = async (req, res, next) => {
    try {
        let result = await getAllDiscountModel();
        let response ={
            message:'Successfully get all discount code ',
            getAllData:result
        }
        res.status(200).send(response)
    } catch (error) {
        let response = {
            message: error.message,
        };
      res.status(403).send(response);
    }
}
const checkCodeHandler = async (req, res, next) => {
  try {
    
    let result = await checkCodeModel(req.body);
  //  let updateData= await updateCounterDiscountCode(result);
    // let result2 = await checkCodeModel(result);
 
    if(result) {
      
      if(result.active  == true && Number(result.counter) < Number(result.max_counter)){
        let updateData= await updateCounterDiscountCode(result);
        let result2 = await checkCodeModel(updateData);
        let response= {
          message: 'Successfully use discount code ',
          data : result2
        } 
       return res.status(200).send(response);
      }
      res.status(200).send('Unfortunately expired discount code');
    }
    
  } catch (error) {
     next(error);
  //   let response = {
  //     message: error.message,
  // };
  //  res.status(403).send(response);
  }
}



module.exports = {
  createDiscountCodeHandler,
  updateActiveDiscountCodeHandler,
  updateDisconnectHandler,
  removeDiscountHandler,
  getAllDiscountHandlers,
  checkCodeHandler,
};
