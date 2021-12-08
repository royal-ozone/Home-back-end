'use strict';

const {addChildCategoryModel,getChildCategoryByIdModel,removeChildCategoryModel,updateChildCategoryModel,getAllChildCategoryModel,getChildCategoryByTitleModel} = require('../models/childCategory')

const addChildCategory = async(req,res,next)=>{
    try {
      
        let data = await addChildCategoryModel(req.body);
        if (!data.entitle&&!data.artitle) {
          res
            .status(401)
            .send("you can not add a child category without title for it ");
        } else {
          let response = {
            message: "successfully added child category",
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

const removeChildCategory= async (req, res, next) => {
    let id = req.params.idCG;
    console.log("🚀 ~ file: childCategory.js ~ line 34 ~ removeChildCategory ~ id", id)
  try {
    let oldData = await getChildCategoryByIdModel(id);
    console.log("🚀 ~ file: childCategory.js ~ line 36 ~ removeChildCategory ~ oldData", oldData)
    if (oldData) {
      let data = await removeChildCategoryModel(id);
      let response = {
        message: "successfully remove child category",
        data: data,
      };
      res.status(200).json(response);
    } else {
      let response = {
        message: "the child category is not exist in database",
      };

      res.status(403).json(response);
    }

    //    delete data.id
  } catch (error) {
    let response = {
      message: error.message,
    };
    //  throw new Error(error.message);
    res.status(401).json(response);
  }
}
const updateChildCategory = async (req, res, next) => {
    let id = req.params.idCG;
  
    try {
      let oldData = await getChildCategoryByIdModel(id);
      if (oldData) {
        let data = await updateChildCategoryModel(req.body, id);
    
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
      //    delete data.id
    } catch (error) {
      let response = {
        message: error.message,
      };
      //  throw new Error(error.message);
      res.status(401).json(response);
    }
  };
const getChildCategoryById= async (req, res, next) => {
    let id = req.params.idCG;
  try {
    let response = await getChildCategoryByIdModel(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
const getAllChildCategory = async (req, res, next) => {
    try {
      let response = await getAllChildCategoryModel();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
const getChildCategoryByTitle = async (req, res, next)=>{
    try {
        const { title } = req.body;
        console.log("🚀 ~ file: childCategory.js ~ line 112 ~ getChildCategoryByTitle ~ title", title)
        let result = await getChildCategoryByTitleModel(title);
        console.log("🚀 ~ file: childCategory.js ~ line 113 ~ getChildCategoryByTitle ~ result", result)
        res.status(200).json(result);
      } catch (error) {
        res.status(403).json(error.message);
      }
}


module.exports = {
    addChildCategory,
    removeChildCategory,
    updateChildCategory,
    getChildCategoryById,
    getAllChildCategory,
    getChildCategoryByTitle

}