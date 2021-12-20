const client = require('../../db');

const addSuggestionModel = async(profile_id,data)=>{
 try {
    let {suggestion}= data;
    let SQL = 'INSERT INTO suggestion(profile_id,suggestion) VALUES($1,$2) RETURNING *;';
    let safeValue = [profile_id,suggestion];
    let result = await client.query(SQL,safeValue);
    return result.rows[0];
 } catch (error) {
     throw new Error(error.message)
 }
}
const removeSuggestionModel = async(id)=>{
   try {
    let SQL = 'DELETE FROM suggestion WHERE id=$1 RETURNING *;';
    let safeValue = [id];
    let result = await client.query(SQL,safeValue);
    return result.rows[0]
   } catch (error) {
       throw new Error(error.message)
   }
}
const updateSuggestionModel = async ( data)=>{

  try {
      let {id,suggestion} = data;
    let SQL = 'UPDATE suggestion SET suggestion=$1 WHERE id =$2 RETURNING *;';
    let safeValue = [suggestion,id];
    let result = await client.query(SQL,safeValue);
    return result.rows[0]
  } catch (error) {
      throw new Error(error.message)
  }
}
const updateStatusSuggestionModel = async (data)=>{
  try {
      let {id,status} = data;
      let SQL = 'UPDATE suggestion SET status=$1 WHERE id=$2 RETURNING *;';
      let safeValue = [status,id];
      let result = await client.query(SQL,safeValue);
        return result.rows[0];
  } catch (error) {
      throw new Error(error.message)
  }
}
const getAllSuggestionModel = async ()=>{
try {
    let SQL = 'SELECT * FROM suggestion;';
let result = await client.query(SQL);
return result.rows;
} catch (error) {
    throw new Error(error.message)
}
}
const getMySuggestionModel = async (id)=>{
try {
    let SQL = 'SELECT * FROM suggestion WHERE profile_id=$1;';
    let safeValue = [id];
    let result = await client.query(SQL,safeValue);
    return result.rows
} catch (error) {
    throw new Error(error.message)
}
}
const getMySuggestionByIdModel = async (id) => {
    try {
        let SQL = 'SELECT * FROM suggestion WHERE id =$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getSuggestionsByStatus = async (status) =>{
    try{
        let SQL = 'SELECT * FROM suggestion WHERE status=$1;';
        let safeValue = [status];
        let result = await client.query(SQL,safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports ={
    addSuggestionModel,
    removeSuggestionModel,
    updateSuggestionModel,
    updateStatusSuggestionModel,
    getAllSuggestionModel,
    getMySuggestionModel,
    getMySuggestionByIdModel,
    getSuggestionsByStatus
}