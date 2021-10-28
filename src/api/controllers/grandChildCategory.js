'use strict';


const {addGrandChildCategoryModel,getGrandChildCategoryByIdModel,removeGrandChildCategoryModel,updateGrandChildCategoryModel,getAllGrandChildCategoryModel,getGrandChildCategoryByTitleModel} = require('../models/grandChildCategory')

const addGrandChildCategory = async(req,res,next)=>{
    try {
        let data = await addGrandChildCategoryModel(req.body);
        if (!data.entitle&&!data.artitle) {
          res
            .status(401)
            .send("you can not add a grand child category without title for it ");
        } else {
          let response = {
            message: "successfully added  grand child category",
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

const removeGrandChildCategory= async (req, res, next) => {
    let id = req.params.idGCG;
  
  try {
    let oldData = await getGrandChildCategoryByIdModel(id);
   
    if (oldData) {
      let data = await removeGrandChildCategoryModel(id);
      let response = {
        message: "successfully remove grand child category",
        data: data,
      };
      res.status(200).json(response);
    } else {
      let response = {
        message: "the  grand child category is not exist in database",
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
const updateGrandChildCategory = async (req, res, next) => {
    let id = req.params.idGCG;
  
    try {
      let oldData = await getGrandChildCategoryByIdModel(id);
      if (oldData) {
        let data = await updateGrandChildCategoryModel(req.body, id);
    
        let response = {
          message: "successfully update grand child category",
          data: data,
        };
        res.status(200).json(response);
      } else {
        let response = {
          message: "the grand child category is not exist in database",
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
const getGrandChildCategoryById= async (req, res, next) => {
    let id = req.params.idGCG;
  try {
    let response = await getGrandChildCategoryByIdModel(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
const getAllGrandChildCategory = async (req, res, next) => {
    try {
      let response = await getAllGrandChildCategoryModel();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
const getGrandChildCategoryByTitle = async (req, res, next)=>{
    try {
        const { title } = req.body;
        let result = await getGrandChildCategoryByTitleModel(title);
        res.status(200).json(result);
      } catch (error) {
        res.status(403).json(error.message);
      }
}


module.exports = {
    addGrandChildCategory,
    removeGrandChildCategory,
    updateGrandChildCategory,
    getGrandChildCategoryById,
    getAllGrandChildCategory,
    getGrandChildCategoryByTitle

}