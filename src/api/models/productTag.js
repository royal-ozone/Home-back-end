const client = require('../../db')


const addProductTag = async data => {
    try {
        let { product_id, tag_id } = data;
        let SQL = 'INSERT INTO product_tag (product_id, tag_id ) VALUES ($1,$2) RETURNING *;';
        let safeValues = [product_id, tag_id];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)   
    }
}


const getProductTags = async id => {
    try {
        let SQL = 'SELECT * FROM product_tag WHERE product_id=$1;'
        let safeValue = [id]
        let result = await client.query(SQL, safeValue)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductTag = async id => {
    try {
        let SQL = 'DELETE FROM product_tag WHERE id=$1 RETURNING *;';
        let safeValue = [id]
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductTag = async (id, data) =>{
    try {
        let {product_tag, tag_id} = data;
        let SQL = 'UPDATE product_tag SET product_id=$1, tag_id=$2 WHERE id=$3 RETURNING *;';
        let safeValues = [product_tag, tag_id, id]
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
} 

module.exports = {deleteProductTag, updateProductTag,getProductTags,addProductTag}