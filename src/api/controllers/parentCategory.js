"use strict"; //

const {
  addParentCategoryModel,
  removeParentCategoryModel,
  updateParentCategoryModel,
  getParentCategoryByIdModel,
  getAllParentCategoryModel,
  getParentCategoryByTitleModel,
  updateDisplayParentCategoryModel,
} = require("../models/parentCategory");

const addParentCategory = async (req, res, next) => {
  try {
    let data = await addParentCategoryModel(req.body);
    if (!data.entitle && !data.artitle) {
      res.json({status: 403,message:"you can not add a parent category without title for it "});
    } else {
      let response = {
        status: 200,
        message: "successfully added parent category",
        data: data,
      };
      //   delete data.id;
      res.json(response);
    }
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    //  throw new Error(error.message);
    res.json({status: 403,response:response});
  }
};

const removeParentCategory = async (req, res, next) => {
  let id = req.body.idPG;
  try {
    let data = await removeParentCategoryModel(id);
    if(data){
      let response = {
        status:200,
        message: "successfully remove parent category",
        data: data,
      };
      res.json(response);
    }
    res.json({status:403,message:'the parent category deleted before!'});
    //    delete data.id
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    //  throw new Error(error.message);
    res.json(response);
  }
};

const updateParentCategory = async (req, res, next) => {
  try {
      let oldData = await getParentCategoryByIdModel(req.body.id);
      let data = await updateParentCategoryModel({...oldData,...req.body});
      if(data){
        let response = {
          status: 200,
          message: "successfully update parent category",
          data: data,
        };
        res.json(response);
      } 
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    res.json(response);
  }
};
const updateDisplayParentCategory =async (req, res, next) => {
  try {
    let result = await updateDisplayParentCategoryModel(req.body);
    let response = {
      status:200,
      message: "successfully update display parent category",
      data: result,
    };
    res.json(response);
  } catch (error) {
    
      let response = {
        status:403,
        message: error.message,
      };
      res.json(response);
    
  }
}

const getParentCategoryById = async (req, res, next) => {
  try {
    if(req.product){
      let response = await getParentCategoryByIdModel(req.product.parent_category_id);
      let product = req.product
      delete product.parent_category_id
      product['parent_category'] = response
      req.product = product
      next();
    }else {
      let id = req.params.idPG;
      let response = await getParentCategoryByIdModel(id);
      res.json({status:200, response});
    }
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

const getParentCategoryByTitle = async (req, res, next) => {
  try {
    let result = await getParentCategoryByTitleModel(req.params.title);
    res.json({status: 200,result});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

const getAllParentCategory = async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    res.json({status: 200,response:response});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

module.exports = {
  addParentCategory,
  removeParentCategory,
  updateParentCategory,
  getParentCategoryById,
  getAllParentCategory,
  getParentCategoryByTitle,
  updateDisplayParentCategory
};
