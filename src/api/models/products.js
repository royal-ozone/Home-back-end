const client = require('../../db')

const addProduct = async data => {
    try {
        
        const {store_id, enTitle,arTitle, metaTitle, sku, price, brand_name, description, quantity} = data;
        let SQL = `INSERT INTO product (store_id, enTitle,arTitle, metaTitle, sku, price, brand_name, description, quantity) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`;
        if(!enTitle && arTitle){
            enTitle = arTitle
        } else if(!arTitle && enTitle){
            arTitle = enTitle
        }
        let safeValues = [store_id, enTitle,arTitle, metaTitle, sku, price, brand_name, description, quantity];
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllProduct = async () => {
try {
    let SQL = `SELECT * FROM product;`
    let result = await client.query(SQL)
    return result.rows
} catch (error) {
    throw new Error(error.message)
}
};

const getProduct = async data => {
    try {
        let SQL = `SELECT * FROM product WHERE id =$1;`;
        let safeValue = [data]
        let result = await client.query(SQL,safeValue)
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message)
    }
};


const updateProduct = async (id,data) => {
    try {
        let {store_id, enTitle, arTitle, metaTitle, sku, price, brand_name, description, quantity, discount, discount_rate} = data;
        let SQL = 'UPDATE product SET store_id=$1, title=$2, metaTitle=$3, sku=$4, price=$5, brand_name=$6, description=$7, quantity=$8, discount=$9, discount_rate=$10, arTitle=$12  WHERE id=$11 RETURNING *'
        let safeValues = [store_id, enTitle, metaTitle, sku, price, brand_name, description, quantity, discount, discount_rate, id, arTitle];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateProductStatus = async (id,data) => {
    try {
        let SQL = `UPDATE product SET status=$1 WHERE id=$2 RETURNING *;`
        let safeValue = [data, id]
        let result = await client.query(SQL,safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProduct = async id =>{
    try {
        let SQL = `DELETE FROM product WHERE id=$1 RETURNING *;`;
        let safeValue = [id]
        let result = await client.query(SQL,safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct};
