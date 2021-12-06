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
      res
        .status(401)
        .send("you can not add a parent category without title for it ");
    } else {
      let response = {
        message: "successfully added parent category",
        data: data,
      };
      //   delete data.id;

      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    //  throw new Error(error.message);
    res.status(401).json(response);
  }
};

const removeParentCategory = async (req, res, next) => {
  let id = req.body.idPG;
  try {
    let data = await removeParentCategoryModel(id);
    console.log("🚀 ~ file: parentCategory.js ~ line 41 ~ removeParentCategory ~ data", data)
    if(data){
      let response = {
        message: "successfully remove parent category",
        data: data,
      };
      res.status(200).json(response);
    }
    res.status(403).json('the parent category deleted before!');

    //    delete data.id
  } catch (error) {
    let response = {
      message: error.message,
    };
    //  throw new Error(error.message);
    res.status(401).json(response);
  }
};

const updateParentCategory = async (req, res, next) => {
  try {
      let oldData = await getParentCategoryByIdModel(req.body.id);
      let data = await updateParentCategoryModel({...oldData,...req.body});
      if(data){
        let response = {
          message: "successfully update parent category",
          data: data,
        };
        res.status(200).json(response);
      } 
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(401).json(response);
  }
};
const updateDisplayParentCategory =async (req, res, next) => {
  try {
    let result = await updateDisplayParentCategoryModel(req.body);
    let response = {
      message: "successfully update display parent category",
      data: result,
    };
    res.status(200).json(response);
  } catch (error) {
    
      let response = {
        message: error.message,
      };
      res.status(401).json(response);
    
  }
}

const getParentCategoryById = async (req, res, next) => {
  let id = req.params.idPG;
  try {
    let response = await getParentCategoryByIdModel(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getParentCategoryByTitle = async (req, res, next) => {
  try {
    let result = await getParentCategoryByTitleModel(req.params.title);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

const getAllParentCategory = async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
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
