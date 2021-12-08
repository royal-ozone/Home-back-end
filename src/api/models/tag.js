const client = require('../../db')


const addTag = async data => {
try {
    let {enTitle,arTitle, metaTitle, slug, content} = data;
    let SQL = 'INSERT INTO tag (enTitle,arTitle, metaTitle, slug, content) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
    let safeValues = [enTitle,arTitle, metaTitle, slug, content];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
} catch (error) {
    throw new Error(error.message)
}
}

const getAllTags = async () => {
    try {
        let SQL = 'SELECT * FROM tag;'
        let result = await client.query(SQL)
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getTag = async id =>{
    try {
        let SQL = 'SELECT * FROM tag WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue) 
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateTag = async (id, data) => {
    try {
        let {enTitle,arTitle, metaTitle, slug, content} = data;
        let SQL = 'UPDATE tag SET enTitle=$1,arTitle=$6 metaTitle=$2, slug=$3, content=$4 WHERE id=$5 RETURNING *;';
        let safeValues = [enTitle, metaTitle, slug, content,id,arTitle]
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteTag = async (id) => {
    try {
        let SQL = 'DELETE FROM tag WHERE id=$1 RETURNING *;';
        let safeValue = [id]
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addTag, deleteTag, updateTag, getTag,getAllTags}