"use strict";
const client = require("../../db");
const {getParentCategoryByTitleModel} = require("./parentCategory")
const addChildCategoryModel = async (data) => {
  try {

    const {  entitle,artitle, metaTitle, content ,titleParentCategory} = data;
    let dataParentCategory = await getParentCategoryByTitleModel(titleParentCategory)
    if(dataParentCategory&&data) {

     
      // if (!data) {
      //   res.status(304).send("the data is not exist");
      // }else {

        let SQL =
        "INSERT INTO child_category(parent_id,entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4,$5) RETURNING *;";
        let safeValue = [dataParentCategory.id,entitle,artitle, metaTitle, content];
        console.log("🚀 ~ file: childCategory.js ~ line 18 ~ addChildCategoryModel ~ safeValue", safeValue)
        
        let result = await client.query(SQL, safeValue);
        console.log("🚀 ~ file: childCategory.js ~ line 22 ~ addChildCategoryModel ~ result", result)
        
        return result.rows[0];
      // }
    }else{
      return new Error("you can not add child category before add parent category")
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


const removeChildCategoryModel = async (id) => {
  try {
    let SQL = "DELETE FROM child_category WHERE id =$1;";
    let safeValue = [id];

    let result = await client.query(SQL, safeValue);


    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateChildCategoryModel = async (data, id) => {
 
    try {
      let oldData = await getChildCategoryByIdModel(id);
    
    
      if (!oldData) {
        res.status(403).send("the child category is not exist");
      } else {
        
        const {  entitle,artitle, metaTitle, content } = data;
        
        
  
        let SQL =
          " UPDATE child_category SET entitle = $1,artitle = $2, metaTitle = $3, content = $4 WHERE id = $5 RETURNING *;";
        let safeValue = [ entitle?entitle:oldData.entitle,artitle?artitle:oldData.artitle, metaTitle?metaTitle:oldData.metatitle, content?content:oldData.content,id];
       
        let result2 = await client.query(SQL, safeValue);
       
        return result2.rows[0];
      }
    } catch (error) {
      return error.message;
    }
  };

const getAllChildCategoryModel =async ()=>{
    try {
        
        let SQL = 'SELECT * FROM child_category;';
        let result = await client.query(SQL);

        return result.rows;
    } catch (error) {
        return error.message;
    }
}


const getChildCategoryByIdModel = async (id) => {
    try {
      let SQL = "SELECT * FROM child_category WHERE id=$1;";
      let safeValue = [id];
      let result = await client.query(SQL, safeValue);
      
  
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  };

const getChildCategoryByTitleModel = async (title)=>{
console.log("🚀 ~ file: childCategory.js ~ line 103 ~ getChildCategoryByTitleModel ~ title", title)
    try {
        let SQL = "SELECT * FROM child_category WHERE entitle=$1 OR artitle=$1;";
        let safeValue = [title];
        let result = await client.query(SQL, safeValue);
        if(result){

          return result.rows[0];
        }
        
     
      } catch (error) {
        return error.message;
      }
 }


module.exports = {
  addChildCategoryModel,
  getChildCategoryByIdModel,
  removeChildCategoryModel,
  updateChildCategoryModel,
  getAllChildCategoryModel,
  getChildCategoryByTitleModel
};
