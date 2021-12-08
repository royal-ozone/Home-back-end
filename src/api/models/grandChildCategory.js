'use strict';
const client = require("../../db");
const {getChildCategoryByTitleModel} = require('./childCategory')
const addGrandChildCategoryModel = async (data) => {
  try {
    const {entitle,artitle, metaTitle, content ,titleChildCategory} = data;
    let dataChildCategory = await getChildCategoryByTitleModel(titleChildCategory)
    console.log("🚀 ~ file: grandChildCategory.js ~ line 8 ~ addGrandChildCategoryModel ~ dataChildCategory", dataChildCategory)
    // if (!data) {
    //   res.status(304).send("the data is not exist");
    // }
    if(dataChildCategory && data){
      let SQL =
      "INSERT INTO grandchild_category(parent_id,entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4,$5) RETURNING *;";
    let safeValue = [dataChildCategory.id,entitle,artitle, metaTitle, content];

    let result = await client.query(SQL, safeValue);

    return result.rows[0];
    }
    else{
      return new Error('the data is not complected or the name child category is not exist ')
    }
   
  } catch (error) {
    throw new Error(error.message);
  }
};


const removeGrandChildCategoryModel = async (id) => {
  try {
    let SQL = "DELETE FROM grandchild_category WHERE id =$1;";
    let safeValue = [id];

    let result = await client.query(SQL, safeValue);


    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateGrandChildCategoryModel = async (data, id) => {
 
    try {
      let oldData = await getGrandChildCategoryByIdModel(id);
    
    
      if (!oldData) {
        res.status(403).send("the grand child category is not exist");
      } else {
        
        const { entitle,artitle, metaTitle, content } = data;
        
        
  
        let SQL =
          " UPDATE grandchild_category SET entitle = $1,artitle = $2, metaTitle = $3, content = $4 WHERE id = $5 RETURNING *;";
        let safeValue = [ entitle?entitle:oldData.entitle,artitle?artitle:oldData.artitle, metaTitle?metaTitle:oldData.metatitle, content?content:oldData.content,id];
       
        let result2 = await client.query(SQL, safeValue);
       
        return result2.rows[0];
      }
    } catch (error) {
      return error.message;
    }
  };

const getAllGrandChildCategoryModel =async ()=>{
    try {
        
        let SQL = 'SELECT * FROM grandchild_category;';
        let result = await client.query(SQL);

        return result.rows;
    } catch (error) {
        return error.message;
    }
}


const getGrandChildCategoryByIdModel = async (id) => {

    try {
      let SQL = "SELECT * FROM grandchild_category WHERE id=$1;";
      let safeValue = [id];
      let result = await client.query(SQL, safeValue);
      
  
      console.log("🚀 ~ file: grandChildCategory.js ~ line 85 ~ getGrandChildCategoryByIdModel ~ result.rows[0]", result.rows[0])
      return result.rows[0];
    } catch (error) {
      return error.message;
    }
  };

const getGrandChildCategoryByTitleModel = async (title)=>{
    try {
        let SQL = "SELECT * FROM grandchild_category WHERE entitle=$1 OR artitle=$1;";
        let safeValue = [title];
        let result = await client.query(SQL, safeValue);
     
        return result.rows[0];
      } catch (error) {
        return error.message;
      }
 }


module.exports = {
    addGrandChildCategoryModel,
    getGrandChildCategoryByIdModel,
    removeGrandChildCategoryModel,
    updateGrandChildCategoryModel,
    getAllGrandChildCategoryModel,
    getGrandChildCategoryByTitleModel
};
