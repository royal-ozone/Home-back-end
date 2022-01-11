'use strict';


const {addGrandChildCategoryModel,getGrandChildCategoryByIdModel,removeGrandChildCategoryModel,updateGrandChildCategoryModel,getAllGrandChildCategoryModel,getGrandChildCategoryByTitleModel,getGrandChildCategoryByTitleModel2} = require('../models/grandChildCategory')

const addGrandChildCategory = async(req,res,next)=>{
    try {
      let result = await getGrandChildCategoryByTitleModel2(req.body)
      if(result){
        res.status(403).send('grand child category is already exist')
      } else {
        let data = await addGrandChildCategoryModel(req.body);
        if (!data.id) {
          res
            .status(401)
            .send(data);
        } else {
          let response = {
            message: "successfully added  grand child category",
            data: data,
          };
          res.status(200).json(response);
        }

      }
      } catch (error) {
        let response = {
          message: error.message,
        };
        res.status(401).json(response);
      }
};

const removeGrandChildCategory= async (req, res, next) => {
  try {  
    let id = req.body.id;
    let data = await removeGrandChildCategoryModel(id);
    if (data.id) {
      let response = {
        message: "successfully remove grand child category",
        data: data,
      };
      res.status(200).json(response);
    } else {
      let response = {
        message: data
      };
      res.status(403).json(response);
    }
  } catch (error) {
    let response = {
      message: error.message,
    };
    res.status(401).json(response);
  }
}
const updateGrandChildCategory = async (req, res, next) => {
  try {
      let id = req.body.id;
      let oldData = await getGrandChildCategoryByIdModel(id);
      if (oldData.id) {
        let data = await updateGrandChildCategoryModel({...oldData, ...req.body});
        let response = {
          message: "successfully update grand child category",
          data: data,
        };
        res.status(200).json(response);
      } else {
        let response = {
          message: oldData,
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
const getGrandChildCategoryById= async (req, res, next) => {
  try {
    if(req.product){
      let response = await getGrandChildCategoryByIdModel(req.product.grandchild_category_id);
      let product = req.product
      delete product.grandchild_category_id
      product['grandChild_category'] = response
     
      res.status(200).json(product);
    } else {

      let id = req.params.idGCG;
      let response = await getGrandChildCategoryByIdModel(id);
      res.status(200).json(response);
    }
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