"use strict";

const {
  addChildCategoryModel,
  getChildCategoryByIdModel,
  removeChildCategoryModel,
  updateChildCategoryModel,
  getAllChildCategoryModel,
  getChildCategoryByTitleModel,
  getChildCategoryByTitleModelTwo
} = require("../models/childCategory");

const addChildCategory = async (req, res, next) => {
  try {
    const { entitle, artitle } = req.body;
    if (!entitle && !artitle) {
      res
        .json(
          {status:403,message:"you can not add a child category without entitle or artitle for it "}
        );
    } else {
      let oldData = await getChildCategoryByTitleModel(req.body);
      if (!oldData) {
        let data = await addChildCategoryModel(req.body);
        let response = {
          status:200,
          message: "successfully added child category",
          data: data,
        };
        return res.json(response);
      }
      res.json({status:403,message:"the child category is not exist"});
    }
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    res.json(response);
  }
};

const removeChildCategory = async (req, res, next) => {
  let id = req.body.id;
  try {
    let data = await removeChildCategoryModel(id);
    let response = {
      status:200,
      message: "successfully remove child category",
      data: data,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    res.json(response);
  }
};
const updateChildCategory = async (req, res, next) => {
  let id = req.body.id;

  try {
    let oldData = await getChildCategoryByIdModel(id);
    if (oldData) {
      let data = await updateChildCategoryModel({ ...oldData, ...req.body });
      let response = {
        status:200,
        message: "successfully update child category",
        data: data,
      };
      res.json(response);
    } else {
      let response = {
        message: "the child category is not exist in database",
      };
      res.json({status:403,response});
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.json({status:403,response});
  }
};
const getChildCategoryById = async (req, res, next) => {
  try {
    if(req.product){
      let response = await getChildCategoryByIdModel(req.product.child_category_id);
      let product = req.product
      delete product.child_category_id
      product['child_category'] = response
      req.product = product
      next();
    } else {
      let id = req.params.idCG;
      let response = await getChildCategoryByIdModel(id);
      res.json({status: 200,response});

    }
  } catch (error) {
    res.json({status: 403,message:error.message});
  }
};
const getAllChildCategory = async (req, res, next) => {
  try {
    let response = await getAllChildCategoryModel();
    res.json({status: 200,response});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};
const getChildCategoryByTitle = async (req, res, next) => {
  try {
    const { title } = req.body;
    let result = await getChildCategoryByTitleModelTwo(title);
    res.json({status: 200,result});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

module.exports = {
  addChildCategory,
  removeChildCategory,
  updateChildCategory,
  getChildCategoryById,
  getAllChildCategory,
  getChildCategoryByTitle,
};
