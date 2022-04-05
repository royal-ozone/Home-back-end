'use strict';


const {addGrandChildCategoryModel,getGrandChildCategoryByIdModel,removeGrandChildCategoryModel,updateGrandChildCategoryModel,getAllGrandChildCategoryModel,getGrandChildCategoryByTitleModel,getGrandChildCategoryByTitleModel2} = require('../models/grandChildCategory')

const addGrandChildCategory = async(req,res,next)=>{
    try {
      let result = await getGrandChildCategoryByTitleModel2(req.body)
      if(result){
        res.json({status: 403,message:'grand child category is already exist'})
      } else {
        let data = await addGrandChildCategoryModel(req.body);
        if (!data.id) {
          res
            .json({status:403,data});
        } else {
          let response = {
            status: 200,
            message: "successfully added  grand child category",
            data: data,
          };
          res.json(response);
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

const removeGrandChildCategory= async (req, res, next) => {
  try {  
    let id = req.body.id;
    let data = await removeGrandChildCategoryModel(id);
    if (data.id) {
      let response = {
        status:200,
        message: "successfully remove grand child category",
        data: data,
      };
      res.json(response);
    } else {
      let response = {
        status:403,
        message: data
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
}
const updateGrandChildCategory = async (req, res, next) => {
  try {
      let id = req.body.id;
      let oldData = await getGrandChildCategoryByIdModel(id);
      if (oldData.id) {
        let data = await updateGrandChildCategoryModel({...oldData, ...req.body});
        let response = {
          status:200,
          message: "successfully update grand child category",
          data: data,
        };
        res.json(response);
      } else {
        let response = {
          status:403,
          message: oldData,
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
const getGrandChildCategoryById= async (req, res, next) => {
  try {
    if(req.product){
      let response = await getGrandChildCategoryByIdModel(req.product.grandchild_category_id);
      let product = req.product
      delete product.grandchild_category_id
      product['grandChild_category'] = response
     
      res.json({status:200,product});
    } else {

      let id = req.params.idGCG;
      let response = await getGrandChildCategoryByIdModel(id);
      res.json({status:200,response});
    }
  } catch (error) {
    res.json({status:403,message:error.message});
  }
}
const getAllGrandChildCategory = async (req, res, next) => {
    try {
      let response = await getAllGrandChildCategoryModel();
      res.json({status:200,response});
    } catch (error) {
      res.json({status:403,message:error.message});
    }
  };
const getGrandChildCategoryByTitle = async (req, res, next)=>{
    try {
        const { title } = req.body;
        let result = await getGrandChildCategoryByTitleModel(title);
        res.json({status:200,result});
      } catch (error) {
        res.json({status:403,message:error.message});
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