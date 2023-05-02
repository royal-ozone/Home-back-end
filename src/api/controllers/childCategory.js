"use strict";

const {
  addChildCategoryModel,
  getChildCategoryByIdModel,
  removeChildCategoryModel,
  updateChildCategoryModel,
  getAllChildCategoryModel,
  getChildCategoryByTitleModel,
  getChildCategoryByTitleModelTwo,
  getChildCategories,
  updateChildCategoryDisplay
} = require("../models/childCategory");
const {updateGrandchildCategoryDisplayByParentId} = require('../models/grandChildCategory')
const addChildCategory = async (req, res, next) => {
  try {
    const { entitle, artitle } = req.body;
    if (!entitle && !artitle) {
      res
        .json(
          {status:403,message:"you can not add a child category without entitle or artitle for it "}
        );
    } else {
      
      let data = await addChildCategoryModel(req.body);
      if (data.id) {
        let response = {
          status:200,
          message: "successfully added child category",
          data: data,
        };
        return res.json(response);
      } else {
        res.json({status:403,message:"something went wrong"});

      }
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
  let {id} = req.params;
  try {
    let data;
    try {
      data = await removeChildCategoryModel(id);   
    } catch (error) {
      data = await updateChildCategoryDisplay(id)
      await updateGrandchildCategoryDisplayByParentId(id)
    }
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
  try {
    let data = await updateChildCategoryModel(req.body );
    if (data) {
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

const getChildCategoriesHandler =  async (req,res) =>{
  try {
    let result = await getChildCategories({...req.query})
    if(result.data) {
      res.send({status: 200, data: result})
    } else res.send({status:403, message: result})
  } catch (error) {
    res.send({status: 403, message: error})
  }
}

const routes = [
  {
  fn: getChildCategoriesHandler,
  auth: true,
  path: '/category/child',
  method: 'get',
  type: 'admin'
},
{
  fn: updateChildCategory,
  auth: true,
  path: '/category/child',
  method: 'put',
  type: 'admin'
},
{
  fn: addChildCategory,
  auth: true,
  path: '/category/child',
  method: 'post',
  type: 'admin'
},
{
  fn: removeChildCategory,
  auth: true,
  path: '/category/child/:id',
  method: 'delete',
  type: 'admin'
},

]

module.exports = {
  addChildCategory,
  removeChildCategory,
  updateChildCategory,
  getChildCategoryById,
  getAllChildCategory,
  getChildCategoryByTitle,
  routes
};
