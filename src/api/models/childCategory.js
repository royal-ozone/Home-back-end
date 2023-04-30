"use strict";
const client = require("../../db");

const {getParentCategoryByTitleModel} = require("./parentCategory")
const addChildCategoryModel = async (data) => {
  try {
      const {  entitle,artitle, metaTitle, content ,parent_id,commission} = data;
        let SQL =
        "INSERT INTO child_category(parent_id,entitle,artitle,metaTitle,content, commission) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;";
        let safeValue = [parent_id,entitle,artitle, metaTitle, content, commission];
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
        const {  entitle,artitle, metatitle, content ,id, commission} = data;
        let SQL =
          " UPDATE child_category SET entitle = $1,artitle = $2, metatitle = $3, content = $4, commission =$6 WHERE id = $5 RETURNING *;";
        let safeValue = [entitle,artitle, metatitle, content ,id,commission];
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
  const getChildCategoryByParentIdModel = async (id) => {
    try {
      let SQL = "SELECT * FROM child_category WHERE parent_id=$1;";
      let safeValue = [id];
      let result = await client.query(SQL, safeValue);
      return result.rows;
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

 const getChildCategories = async (data) => {
  try {
    let { offset, limit } = data;
    let safeValues = [offset, limit];
    let _safeValues = []
    delete data.limit;
    delete data.offset;
  
    const search = (params,array) => {
      let x = [] ;
       Object.keys(params).forEach((param) => {

         if(param === 'title') {
         
          let i = array.push(`%${params[param].trim().toLowerCase()}%`)  ; 
          x.push( `lower(cc.entitle) like $${i} or cc.artitle like $${i}`);
        } else if (param === 'parent_id'){
          let i = array.push(params[param]  ) ; 
          x.push(`cc.parent_id = $${i}`)
        } 
      });
      if(x.length){
        return ` and ${x.join(' and ')}`
      } else return ''

       
    };
    let searchQuery = search(data,safeValues)
    let SQL = `SELECT cc.*, pc.entitle as p_entitle, pc.artitle as p_artitle from child_category cc inner join parent_category pc on pc.id = cc.parent_id where cc.display=true and pc.display=true ${searchQuery} offset $1 limit $2`
    let SQL2 = `SELECT count(*) from child_category cc inner join parent_category pc on pc.id = cc.parent_id where cc.display=true and pc.display=true ${search(data,_safeValues)}`
    let {rows} = await client.query(SQL, safeValues) 
    if(limit &&  offset ){
      let {rows: rows2} = await client.query(SQL2, _safeValues)
      return { data: rows, count: Number(rows2[0]?.count) ?? 0 }
    } else {
      return {data:rows}
    }
      
  } catch (error) {
    throw new Error(error)
  }
}

const updateChildCategoryDisplayByParentId = async id => {
  try {
    let SQL = 'update child_category set display=$1 where parent_id=$2 RETURNING *;'
    let { rows} = await client.query(SQL, [false, id])
    return rows
  } catch (error) {
    throw new Error(error) 
  }
}
const updateChildCategoryDisplay = async id => {
  try {
    let SQL = 'update child_category set display=$1 where id=$2 RETURNING *;'
    let { rows} = await client.query(SQL, [false, id])
    return rows
  } catch (error) {
    throw new Error(error) 
  }
}

module.exports = {
  addChildCategoryModel,
  getChildCategoryByIdModel,
  removeChildCategoryModel,
  updateChildCategoryModel,
  getAllChildCategoryModel,
  getChildCategoryByTitleModel,
  getChildCategoryByTitleModelTwo,
  getChildCategoryByParentIdModel,
  getChildCategories,
  updateChildCategoryDisplayByParentId,
  updateChildCategoryDisplay
};
