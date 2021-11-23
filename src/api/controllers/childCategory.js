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
        .status(401)
        .send(
          "you can not add a child category without entitle or artitle for it "
        );
    } else {
      let oldData = await getChildCategoryByTitleModel(req.body);
      console.log(
        "🚀 ~ file: childCategory.js ~ line 14 ~ addChildCategory ~ oldData",
        oldData
      );
      if (!oldData) {
        let data = await addChildCategoryModel(req.body);
        let response = {
          message: "successfully added child category",
          data: data,
        };
        return res.status(200).json(response);
      }
      res.status(403).json("the child category is exist");
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(401).json(response);
  }
};

const removeChildCategory = async (req, res, next) => {
  let id = req.body.id;
  try {
    let data = await removeChildCategoryModel(id);
    let response = {
      message: "successfully remove child category",
      data: data,
    };
    res.status(200).json(response);
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(401).json(response);
  }
};
const updateChildCategory = async (req, res, next) => {
  let id = req.body.id;

  try {
    let oldData = await getChildCategoryByIdModel(id);
    if (oldData) {
      let data = await updateChildCategoryModel({ ...oldData, ...req.body });
      let response = {
        message: "successfully update child category",
        data: data,
      };
      res.status(200).json(response);
    } else {
      let response = {
        message: "the child category is not exist in database",
      };
      res.status(403).json(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(401).json(response);
  }
};
const getChildCategoryById = async (req, res, next) => {
  let id = req.params.idCG;
  try {
    let response = await getChildCategoryByIdModel(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getAllChildCategory = async (req, res, next) => {
  try {
    let response = await getAllChildCategoryModel();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getChildCategoryByTitle = async (req, res, next) => {
  try {
    const { title } = req.body;
    let result = await getChildCategoryByTitleModelTwo(title);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error.message);
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
