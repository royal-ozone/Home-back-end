"use strict";

const {
  addGrandChildCategoryModel,
  getGrandChildCategoryByIdModel,
  removeGrandChildCategoryModel,
  updateGrandChildCategoryModel,
  getAllGrandChildCategoryModel,
  getGrandChildCategoryByTitleModel,
  getGrandChildCategoryByTitleModel2,
  getGrandchildCategories,
  updateGrandchildCategoryDisplay
} = require("../models/grandChildCategory");

const addGrandChildCategory = async (req, res, next) => {
  try {
    let data = await addGrandChildCategoryModel(req.body);
    if (!data.id) {
      res.json({ status: 403, data });
    } else {
      let response = {
        status: 200,
        message: "successfully added  grand child category",
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

const removeGrandChildCategory = async (req, res, next) => {
  try {
    let {id} = req.params;
    let data;
    try {
      data = await removeGrandChildCategoryModel(id);
    } catch (error) {
     data = await updateGrandchildCategoryDisplay(id)
    }
    let response = {
      status: 200,
      message: "grandchild category removed successfully",
      data: data,
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
const updateGrandChildCategory = async (req, res, next) => {
  try {
    let data = await updateGrandChildCategoryModel(req.body);
    if (data.id) {
      let response = {
        status: 200,
        message: "successfully update grand child category",
        data: data,
      };
      res.json(response);
    } else {
      let response = {
        status: 403,
        message: oldData,
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
const getGrandChildCategoryById = async (req, res, next) => {
  try {
    if (req.product) {
      let response = await getGrandChildCategoryByIdModel(
        req.product.grandchild_category_id
      );
      let product = req.product;
      delete product.grandchild_category_id;
      product["grandChild_category"] = response;

      res.json({ status: 200, product });
    } else if(req.params.idGCG) {
      let id = req.params.idGCG;
      let response = await getGrandChildCategoryByIdModel(id);
      res.json({ status: 200, response });
    } else {
      let response = await getGrandChildCategoryByIdModel(req.query);
      res.json({ status: 200, data:response });
    }
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};
const getAllGrandChildCategory = async (req, res, next) => {
  try {
    let response = await getAllGrandChildCategoryModel();
    res.json({ status: 200, response });
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};
const getGrandChildCategoryByTitle = async (req, res, next) => {
  try {
    const { title } = req.body;
    let result = await getGrandChildCategoryByTitleModel(title);
    res.json({ status: 200, result });
  } catch (error) {
    res.json({ status: 403, message: error.message });
  }
};

const getGrandchildCategoriesHandler = async (req, res) => {
  try {
    let result = await getGrandchildCategories({ ...req.query });
    if (result.data) {
      res.send({ status: 200, data: result });
    } else res.send({ status: 403, message: result });
  } catch (error) {
    res.send({ status: 403, message: error });
  }
};

const routes = [
  {
    fn: getGrandchildCategoriesHandler,
    auth: true,
    path: "/category/grandchild",
    method: "get",
    type: "admin",
  },
  {
    fn: updateGrandChildCategory,
    auth: true,
    path: "/category/grandchild",
    method: "put",
    type: "admin",
  },
  {
    fn: addGrandChildCategory,
    auth: true,
    path: "/category/grandchild",
    method: "post",
    type: "admin",
  },
  {
    fn: addGrandChildCategory,
    auth: true,
    path: "/category/grandchild",
    method: "get",
    type: "admin",
  },
  {
    fn: removeGrandChildCategory,
    auth: true,
    path: "/category/grandchild/:id",
    method: "delete",
    type: "admin",
  },
];

module.exports = {
  addGrandChildCategory,
  removeGrandChildCategory,
  updateGrandChildCategory,
  getGrandChildCategoryById,
  getAllGrandChildCategory,
  getGrandChildCategoryByTitle,
  routes,
};
