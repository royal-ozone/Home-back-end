"use strict";

const client = require("../../db");

const addParentCategoryModel = async (data) => {
  try {
    const { entitle, artitle, metaTitle, content } = data;
    let SQL = "INSERT INTO parent_category(entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4) RETURNING *;";
    let safeValue = [entitle.trim(), artitle.trim(), metaTitle, content];

    let result = await client.query(SQL, safeValue);

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeParentCategoryModel = async (id) => {
  try {
    let SQL = "DELETE FROM parent_category WHERE id =$1 RETURNING *;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateParentCategoryModel = async (data) => {
  try {
    const { entitle, artitle, metatitle, content, id } = data;
    let SQL =
      " UPDATE parent_category SET entitle = $1,artitle = $2, metaTitle = $3, content = $4 WHERE id = $5 RETURNING *;";
    let safeValue = [entitle, artitle, metatitle, content, id];
    let result2 = await client.query(SQL, safeValue);
    return result2.rows[0];
  } catch (error) {
    return error.message;
  }
};
const updateDisplayParentCategoryModel =async (data) => {
  try {
    const {display,id} = data;
    let SQL =
      "UPDATE parent_category SET display = $1  WHERE id = $2 RETURNING *;";
    let safeValue = [display,id];
    let result2 = await client.query(SQL, safeValue);
    return result2.rows[0];
  } catch (error) {
    return error.message;
  }


}

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
    let SQL = "SELECT * FROM parent_category;";
    let result = await client.query(SQL);

    return result.rows;
  } catch (error) {
    return error.message;
  }
};

const getParentCategories = async (data) => {
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
            x.push( `lower(pc.entitle) like $${i} or pc.artitle like $${i}`);
          } 
        });
        if(x.length){
          return ` and ${x.join(' and ')}`
        } else return ''
  
      };
      let SQL = `SELECT * from parent_category pc where pc.display=true ${search(data,safeValues)} offset $1 limit $2`
      let SQL2 = `SELECT count(*) from parent_category pc where pc.display=true ${search(data,_safeValues)}`
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

const updateParentCategoryDisplay = async id=>{
  try {
    let SQL = `update parent_category set display=$2 where id=$1 RETURNING *;`
    let { rows} = await client.query(SQL,[id,false])
    return rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  addParentCategoryModel,
  removeParentCategoryModel,
  getParentCategoryByTitleModel,
  updateParentCategoryModel,
  getParentCategoryByIdModel,
  getAllParentCategoryModel,
  updateDisplayParentCategoryModel,
  getParentCategories,
  updateParentCategoryDisplay
};
