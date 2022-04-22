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
const {getChildCategoryByParentIdModel}=require('../models/childCategory');
//const {getGrandChildCategoryByChildIdModel}=require('../models/grandChildCategory');
const {getAllProductHandler}=require('../controllers/productControllers');
//const {getProductByChildIdModel,getProductByGrandChildIdModel} =require('../models/products');



const addParentCategory = async (req, res, next) => {
  try {
    let data = await addParentCategoryModel(req.body);
    if (!data.entitle && !data.artitle) {
      res.json({status: 403,message:"you can not add a parent category without title for it "});
    } else {
      let response = {
        status: 200,
        message: "successfully added parent category",
        data: data,
      };
      //   delete data.id;
      res.json(response);
    }
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    //  throw new Error(error.message);
    res.json({status: 403,response:response});
  }
};

const removeParentCategory = async (req, res, next) => {
  let id = req.body.idPG;
  try {
    let data = await removeParentCategoryModel(id);
    if(data){
      let response = {
        status:200,
        message: "successfully remove parent category",
        data: data,
      };
      res.json(response);
    }
    res.json({status:403,message:'the parent category deleted before!'});
    //    delete data.id
  } catch (error) {
    let response = {
      status:403,
      message: error.message,
    };
    //  throw new Error(error.message);
    res.json(response);
  }
};

const updateParentCategory = async (req, res, next) => {
  try {
      let oldData = await getParentCategoryByIdModel(req.body.id);
      let data = await updateParentCategoryModel({...oldData,...req.body});
      if(data){
        let response = {
          status: 200,
          message: "successfully update parent category",
          data: data,
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
const updateDisplayParentCategory =async (req, res, next) => {
  try {
    let result = await updateDisplayParentCategoryModel(req.body);
    let response = {
      status:200,
      message: "successfully update display parent category",
      data: result,
    };
    res.json(response);
  } catch (error) {
    
      let response = {
        status:403,
        message: error.message,
      };
      res.json(response);
    
  }
}

const getParentCategoryById = async (req, res, next) => {
  try {
    if(req.product){
      let response = await getParentCategoryByIdModel(req.product.parent_category_id);
      let product = req.product
      delete product.parent_category_id
      product['parent_category'] = response
      req.product = product
      next();
    }else {
      let id = req.params.idPG;
      let response = await getParentCategoryByIdModel(id);
      res.json({status:200, response});
    }
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

const getParentCategoryByTitle = async (req, res, next) => {
  try {
    let result = await getParentCategoryByTitleModel(req.params.title);
    res.json({status: 200,result});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};

const getAllParentCategory = async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    res.json({status: 200,response:response});
  } catch (error) {
    res.json({status:403,message:error.message});
  }
};
const getAllItems= async (req, res, next) => {
  try {
    let response = await getAllParentCategoryModel();
    let data = await response.map(async(parent)=>{
      parent['childCategory']= await getChildCategoryByParentIdModel(parent.id);
           // if(parent.childCategory.grandChildCategory){
      //   parent.childCategory.map(async(grand)=>{
      //     grand['products'] = await getProductByGrandChildIdModel(grand.id)
      //     return grand;
      //   })
      // }else{
      //   parent.childCategory.map(async(child)=>{
      //     child['products'] = await getProductByChildIdModel(child.id)
      //     return child;
      //   })
      // }
      return parent;
    });
    req.parent =data;
    next();
    
    // let data2 =await data.map(async(el)=>{
    //   console.log("🚀 ~ file: parentCategory.js ~ line 181 ~ data2 ~ data", data)
    //   try {
    //     el.childCategory.map(async(child)=>{
    //       // child['grandChildCategory'] =
    //       // let check2= await getGrandChildCategoryByChildIdModel(child.id)
    //       // console.log("🚀 ~ file: parentCategory.js ~ line 168 ~ el.childCategory.map ~ check2", check2)
    //       // console.log("🚀 ~ file: parentCategory.js ~ line 168 ~ el.childCategory.map ~ child", child)
    //       // return child;
    //       parent.childCategory.map(async(child)=>{
    //             child['products'] = await getProductByChildIdModel(child.id)
    //             return child;
    //           })
    //     })
    //   } catch (error) {
    //     return error.message
    //   }
      
    // })
    // console.log("🚀 ~ file: parentCategory.js ~ line 172 ~ data2 ~ data2", data2)
    // console.log("🚀 ~ file: parentCategory.js ~ line 162 ~ data ~ data",await  Promise.all(data))
    // let ahmad = await Promise.all(data);
    // let ahmad2 =await Promise.all(data2);
    // console.log("🚀 ~ file: parentCategory.js ~ line 183 ~ getAllItems ~ ahmad2", ahmad2)
    // console.log("🚀 ~ file: parentCategory.js ~ line 174 ~ getAllItems ~ ahmad", ahmad)

    // res.json({status:200,result:ahmad});
   
   
  } catch (error) {
    res.json({status:403,message:error.message});
  }
}
// const getGrandItems = async (req, res, next) => {
//   try {    
//    let data={data:await Promise.all(req.parent)};
//    let ahmad =  await data.data.map(async(child)=>{
//        child.childCategory.forEach(async(grand)=>{
      
//       let grandChild = await getGrandChildCategoryByChildIdModel(child.id);
//       if(grandChild.length !==0){
//         grand['grandChild'] =grandChild;
//       }else {
//         let product =await getProductByChildIdModel(grand.id);
//         grand['products']=product;
//       }
//       return grand;
//     })
//     return child;
//    })
//    console.log("🚀 ~ file: parentCategory.js ~ line 206 ~ ahmad ~ ahmad",  await Promise.all(ahmad) )
  
//     res.json({data:await Promise.all(ahmad)})
//   } catch (error) {
//     return error.message
//   }
// }

module.exports = {
  addParentCategory,
  removeParentCategory,
  updateParentCategory,
  getParentCategoryById,
  getAllParentCategory,
  getParentCategoryByTitle,
  updateDisplayParentCategory,
  getAllItems,
  // getGrandItems
};
