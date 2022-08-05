const client = require("../../db");


const addProductPicture = async data  => {
    try {
        let {product_id, product_picture} = data;
        let SQL = 'INSERT INTO product_picture (product_id, product_picture) VALUES ($1,$2) RETURNING*;';
        let safeValues =[product_id, product_picture]
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getProductPicturesById = async id => {
    try {
        let SQL = 'SELECT product_picture FROM product_picture WHERE product_id=$1;';
        let result = await client.query(SQL, [id])
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductPictureById = async id => {
    try {
        let SQL = 'DELETE FROM product_picture WHERE id=$1 RETURNING *;';
        let result = await client.query(SQL,[id])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}


const deleteProductPictureByProductId = async id => {
    try {
        let SQL = 'DELETE FROM product_picture WHERE product_id=$1 RETURNING *;';
        let result = await client.query(SQL,[id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    addProductPicture,
    getProductPicturesById,
    deleteProductPictureById,
    deleteProductPictureByProductId
}