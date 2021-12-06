"use strict";
const client = require("../../db");
const {getParentCategoryByTitleModel} = require("./parentCategory")
const addChildCategoryModel = async (data) => {
  try {
      const {  entitle,artitle, metaTitle, content ,parent_id} = data;
        let SQL =
        "INSERT INTO child_category(parent_id,entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4,$5) RETURNING *;";
        let safeValue = [parent_id,entitle,artitle, metaTitle, content];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];    
  } catch (error) {
    throw new Error(error.message);
  }
};


const removeChildCategoryModel = async (id) => {
  try {
    let SQL = "DELETE FROM child_category WHERE id =$1 RETURNING *;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateChildCategoryModel = async (data) => {
    try {
        const {  entitle,artitle, metatitle, content ,id} = data;
        let SQL =
          " UPDATE child_category SET entitle = $1,artitle = $2, metatitle = $3, content = $4 WHERE id = $5 RETURNING *;";
        let safeValue = [entitle,artitle, metatitle, content ,id];
        let result2 = await client.query(SQL, safeValue);
        return result2.rows[0];
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

const getChildCategoryByTitleModel = async (data)=>{
    try {
        let {artitle,entitle,parent_id} = data;
        let SQL = "SELECT * FROM child_category WHERE(entitle=$1 OR artitle=$2)AND parent_id=$3;";
        let safeValue = [entitle,artitle,parent_id];
        let result = await client.query(SQL,safeValue);
        if(result){
          return result.rows[0];
        }

      } catch (error) {
        return error.message;
      }
 }
 const getChildCategoryByTitleModelTwo = async (title)=> {
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
  getChildCategoryByTitleModel,
  getChildCategoryByTitleModelTwo
};
