"use strict";

const client = require("../../db");

const addParentCategoryModel = async (data) => {
  try {
    const { entitle,artitle, metaTitle, content } = data;
   

    if (!data) {
      res.status(304).send("the data is not exist");
    }
    let SQL =
      "INSERT INTO parent_category(entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4) RETURNING *;";
    let safeValue = [entitle,artitle,metaTitle, content];

    let result = await client.query(SQL, safeValue);
    

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeParentCategoryModel = async (id) => {
  
  try {
    // let result = await getParentCategoryByTitle(data.title);

    // if (!result) {
    //   res.status(304).send("the parent category is not exist");
    // }
    let SQL = "DELETE FROM parent_category WHERE id =$1;";
    let safeValue = [id];
   

    let result = await client.query(SQL, safeValue);

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateParentCategoryModel = async (data, id) => {
 
  try {
    let oldData = await getParentCategoryByIdModel(id);
  
    if (!oldData) {
      res.status(403).send("the parent category is not exist");
    } else {
      
      const { entitle,artitle, metaTitle, content } = data;
      

      let SQL =
        " UPDATE parent_category SET entitle = $1,artitle = $2, metaTitle = $3, content = $4 WHERE id = $5 RETURNING *;";
      let safeValue = [ entitle?entitle:oldData.entitle,artitle?artitle:oldData.artitle, metaTitle?metaTitle:oldData.metatitle, content?content:oldData.content,id];
     
      let result2 = await client.query(SQL, safeValue);
     
      return result2.rows[0];
    }
  } catch (error) {
    return error.message;
  }
};

const getParentCategoryByTitleModel = async (title) => {
  try {
    let SQL = "SELECT * FROM parent_category WHERE entitle=$1 OR artitle=$1;";
    let safeValue = [title];
    let result = await client.query(SQL, safeValue);
    
 
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
};

const getParentCategoryByIdModel = async (id) => {
  try {
    let SQL = "SELECT * FROM parent_category WHERE id=$1;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
  
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
};

const getAllParentCategoryModel = async () => {
    try {
        
        let SQL = 'SELECT * FROM parent_category;';
        let result = await client.query(SQL);

        return result.rows;
    } catch (error) {
        return error.message;
    }

}

module.exports = {
  addParentCategoryModel,
  removeParentCategoryModel,
  getParentCategoryByTitleModel,
  updateParentCategoryModel,
  getParentCategoryByIdModel,
  getAllParentCategoryModel,
};
