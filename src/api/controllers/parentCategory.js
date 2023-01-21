"use strict"; //

const {
  addParentCategoryModel,
  removeParentCategoryModel,
  updateParentCategoryModel,
  getParentCategoryByIdModel,
  getAllParentCategoryModel,
  getParentCategoryByTitleModel,
  updateDisplayParentCategoryModel,
  getParentCategories,
  updateParentCategoryDisplay
} = require("../models/parentCategory");
const { getChildCategoryByParentIdModel,updateChildCategoryDisplayByParentId } = require("../models/childCategory");

const addParentCategory = async (req, res, next) => {
  try {
    let data = await addParentCategoryModel(req.body);
    if (data?.id) {
      let response = {
        status: 200,
        message: "successfully added parent category",
        data: data,
      };
      res.json(response);
    } else {
      res.json({
        status: 403,
        message: "something went wrong",
      });
    }
  } catch (error) {
   
    res.json({ status: 403,  message: error.message, });
  }
};

const removeParentCategory = async (req, res, next) => {
  let {id} = req.params;
  try {
    let data;
    try {
      data = await removeParentCategoryModel(id);
    } catch (error) {
      data= await updateParentCategoryDisplay(id)
      await updateChildCategoryDisplayByParentId(id)
    };
    
    let response = {
      status: 200,
      message: "successfully remove parent category",
      data: data,
    
    }
    res.json(response);
    
  } catch (error) {
    let response = {
      status: 403, 
      message: error.message,
    };
    res.json(response);
  }
};

const updateParentCategory = async (req, res, next) => {
  try {
    let data = await updateParentCategoryModel(req.body);
    if (data) {
      let response = {
        status: 200,
        message: "successfully update parent category",
        data: data,
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      status: 403,
      message: error.message,
    };
    res.json(response);
  }
};
const updateDisplayParentCategory = async (req, res, next) => {
  try {
    let result = await updateDisplayParentCategoryModel(req.body);
    let response = {
      status: 200,
      message: "successfully update display parent category",
      data: result,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 403,
      message: error.message,
    };
    res.json(response);
  }
};

const getParentCategoryById = async (req, res, next) => {
  try {
    if (req.product) {
      let response = await getParentCategoryByIdModel(
        req.product.parent_category_id
      );
      let product = req.product;
      delete product.parent_category_id;
      product["parent_category"] = response;
      req.product = product;
      next();
    } else {
      let id = req.params.idPG;
      let response = await getParentCategoryByIdModel(id);
      res.json({ status: 200, response });
    }
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};

const getParentCategoryByTitle = async (req, res, next) => {
  try {
    let result = await getParentCategoryByTitleModel(req.params.title);
    res.json({ status: 200, result });
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};

const getAllParentCategory = async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    res.json({ status: 200, response: response });
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};
const getAllItems = async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    let data = await response.map(async (parent) => {
      parent["childCategory"] = await getChildCategoryByParentIdModel(
        parent.id
      );

      return parent;
    });
    req.parent = data;
    next();
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};

const getParentCategoriesHandler = async (req, res) => {
  try {
    let result = await getParentCategories({ ...req.query });
    if (result.data) {
      res.send({ status: 200, data: result });
    } else res.send({ status: 403, message: result });
  } catch (error) {
    res.send({ status: 403, message: error });
  }
};

const routes = [
  {
    fn: getParentCategoriesHandler,
    auth: true,
    path: "/category/parent",
    method: "get",
    type: "admin",
  },
  {
    fn: updateParentCategory,
    auth: true,
    path: "/category/parent",
    method: "put",
    type: "admin",
  },
  {
    fn: addParentCategory,
    auth: true,
    path: "/category/parent",
    method: "post",
    type: "admin",
  },
  {
    fn: removeParentCategory,
    auth: true,
    path: "/category/parent/:id",
    method: "delete",
    type: "admin",
  },
];

module.exports = {
  addParentCategory,
  removeParentCategory,
  updateParentCategory,
  getParentCategoryById,
  getAllParentCategory,
  getParentCategoryByTitle,
  updateDisplayParentCategory,
  getAllItems,
  routes,
  // getGrandItems
};
