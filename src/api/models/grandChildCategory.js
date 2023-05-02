"use strict";
const client = require("../../db");
const { getChildCategoryByTitleModel } = require("./childCategory");

const addGrandChildCategoryModel = async (data) => {
  try {
    const { entitle, artitle, metatitle, content, parent_id } = data;
    let SQL =
      "INSERT INTO grandchild_category(parent_id,entitle,artitle,metaTitle,content) VALUES ($1,$2,$3,$4,$5) RETURNING *;";
    let safeValue = [parent_id, entitle, artitle, metatitle, content];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeGrandChildCategoryModel = async (id) => {
  try {
    let SQL = "DELETE FROM grandchild_category WHERE id =$1 RETURNING *;";
    let safeValue = [id];

    let result = await client.query(SQL, safeValue);

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateGrandChildCategoryModel = async (data) => {
  try {
    let { entitle, artitle, metatitle, content, id } = data;
    let SQL =
      " UPDATE grandchild_category SET entitle = $1,artitle = $2, metaTitle = $3, content = $4 WHERE id = $5 RETURNING *;";
    let safeValue = [entitle, artitle, metatitle, content, id];

    let result2 = await client.query(SQL, safeValue);

    return result2.rows[0];
  } catch (error) {
    return error.message;
  }
};

const getAllGrandChildCategoryModel = async () => {
  try {
    let SQL = "SELECT * FROM grandchild_category;";
    let result = await client.query(SQL);

    return result.rows;
  } catch (error) {
    return error.message;
  }
};

const getGrandChildCategoryByIdModel = async ({ id, title }) => {
  try {
    let safeValue = [];
    let SQL = `SELECT * FROM grandchild_category WHERE ${
      id ? `id=${safeValue.push(id)}` : ""
    } ${
      title
        ? safeValue.push(title.trim()) && `entitle like $1 or artitle like $1`
        : ""
    }`;
    let result = await client.query(SQL, safeValue);

    return result.rows[0];
  } catch (error) {
    return error.message;
  }
};
const getGrandChildCategoryByChildIdModel = async (id) => {
  try {
    let SQL = "SELECT * FROM grandchild_category WHERE parent_id=$1;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);

    return result.rows;
  } catch (error) {
    return error.message;
  }
};

const getGrandChildCategoryByTitleModel2 = async (data) => {
  try {
    let { artitle, entitle, parent_id } = data;
    let SQL =
      "SELECT * FROM grandchild_category WHERE(entitle=$1 OR artitle=$2)AND parent_id=$3;";
    let safeValue = [entitle, artitle, parent_id];
    let result = await client.query(SQL, safeValue);
    if (result) {
      return result.rows[0];
    }
  } catch (error) {
    return error.message;
  }
};

const getGrandChildCategoryByTitleModel = async (title) => {
  try {
    let SQL =
      "SELECT * FROM grandchild_category WHERE entitle=$1 OR artitle=$1;";
    let safeValue = [title];
    let result = await client.query(SQL, safeValue);

    return result.rows[0];
  } catch (error) {
    return error.message;
  }
};
const getGrandchildCategories = async (data) => {
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
          x.push( `lower(gc.entitle) like $${i} or gc.artitle like $${i}`);
        } else if (param === 'parent_id'){
          let i = array.push(params[param]  ) ; 
          x.push(`gc.parent_id = $${i}`)
        } 
      });
      if(x.length){
        return ` and ${x.join(' and ')}`
      } else return ''

    };
    let SQL = `SELECT gc.*, cc.entitle as p_entitle, cc.artitle as p_artitle from grandchild_category gc inner join child_category cc on cc.id = gc.parent_id where cc.display=true and gc.display=true ${search(data,safeValues)} offset $1 limit $2`;
    let SQL2 = `SELECT count(*) from grandchild_category gc inner join child_category cc on cc.id = gc.parent_id where cc.display=true and gc.display=true ${search(data,_safeValues)}`;
    let { rows } = await client.query(SQL, safeValues);
    if(limit &&  offset ){
      let {rows: rows2} = await client.query(SQL2, _safeValues)
      return { data: rows, count: Number(rows2[0]?.count) ?? 0 }
    } else {
      return {data:rows}
    }
  } catch (error) {
    throw new Error(error);
  }
};
const updateGrandchildCategoryDisplayByParentId = async id => {
  try {
    let SQL = `update grandchild_category set display=$1 where parent_id=$2 RETURNING *;`
    let { rows} = await client.query(SQL,[false,id])
    return rows
  } catch (error) {
    throw new Error(error);
  }
}
const updateGrandchildCategoryDisplay = async id => {
  try {
    let SQL = `update grandchild_category set display=$1 where id=$2 RETURNING *;`
    let { rows} = await client.query(SQL,[false,id])
    return rows[0]
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  addGrandChildCategoryModel,
  getGrandChildCategoryByIdModel,
  removeGrandChildCategoryModel,
  updateGrandChildCategoryModel,
  getAllGrandChildCategoryModel,
  getGrandChildCategoryByTitleModel,
  getGrandChildCategoryByTitleModel2,
  getGrandChildCategoryByChildIdModel,
  getGrandchildCategories,
  updateGrandchildCategoryDisplayByParentId,
  updateGrandchildCategoryDisplay
};
