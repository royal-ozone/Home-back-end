const client = require('../../db');

const addSuggestionModel = async(profile_id,data)=>{
 try {
    let {suggestion}= data;
    let SQL = 'INSERT INTO suggestion(profile_id,suggestion) VALUES($1,$2) RETURNING *;';
    let safeValue = [profile_id,suggestion];
    let result = await client.query(SQL,safeValue);
    return result.rows[0];
 } catch (error) {
     return error.message
 }
}
const removeSuggestionModel = async(id)=>{
    
   try {
    let SQL = 'DELETE FROM suggestion WHERE profile_id =$1 RETURNING *;';
    let safeValue = [id];
    let result = await client.query(SQL,safeValue);
    return result.rows[0]
   } catch (error) {
       return error.message;
   }
}
const updateSuggestionModel = async (id, data,oldData)=>{
 const {suggestion } =oldData;
 const {newSuggestion} = data;
  try {
    let SQL = 'UPDATE suggestion SET suggestion=$1 WHERE id =$2 RETURNING *;';
    let safeValue = [newSuggestion?newSuggestion:suggestion,id];
    let result = await client.query(SQL,safeValue);
    return result.rows[0]
  } catch (error) {
      return error.message;
  }
}
const updateStatusSuggestionModel = async (id, data,oldData)=>{

  try {
      const {status}=oldData;
      const {newStatus}=data;
      let SQL = 'UPDATE suggestion SET status=$1 WHERE id=$2 RETURNING *;';
      let safeValue = [newStatus?newStatus:status,id];
      let result = await client.query(SQL,safeValue);
    return result.rows[0];
  } catch (error) {
      return error.message;
  }
}
const getAllSuggestionModel = async ()=>{
try {
    let SQL = 'SELECT * FROM suggestion;';
let result = await client.query(SQL);
return result.rows;
} catch (error) {
    return error.message;
}
}
const getMySuggestionModel = async (id)=>{
try {
    let SQL = 'SELECT * FROM suggestion WHERE profile_id=$1;';
    let safeValue = [id];
    console.log("🚀 ~ file: suggestion.js ~ line 60 ~ getMySuggestionModel ~ safeValue", safeValue)
    let result = await client.query(SQL,safeValue);
    return result.rows[0]
} catch (error) {
    return error.message;
}
}
const getMySuggestionByIdModel = async (id) => {
    try {
        let SQL = 'SELECT * FROM suggestion WHERE id =$1 ;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0]
    } catch (error) {
        return error.message;
    }
}
module.exports ={
    addSuggestionModel,
    removeSuggestionModel,
    updateSuggestionModel,
    updateStatusSuggestionModel,
    getAllSuggestionModel,
    getMySuggestionModel,
    getMySuggestionByIdModel
}