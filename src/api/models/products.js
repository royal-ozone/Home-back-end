const client = require('../../db')

const addProduct = async data => {
    try {
        
        let {store_id,entitle,artitle,metatitle, sku, price, brand_name, description, quantity,age,size,parent_category_id,child_category_id,grandchild_category_id} = data;
        let SQL = `INSERT INTO product (store_id,entitle,artitle,metatitle,sku,price,brand_name,description,quantity, age, size,parent_category_id,child_category_id,grandchild_category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10, $11 ,$12,$13,$14) RETURNING *;`;
        if(!entitle && artitle){
            entitle = artitle
        } else if(!artitle && entitle){
            artitle = entitle
        }
        let safeValues = [store_id,entitle,artitle,metatitle,sku,price,brand_name,description,quantity,age,size,parent_category_id,child_category_id,grandchild_category_id];
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllProduct = async (offset,limit) => {
try {
    let SQL = `SELECT * FROM product LIMIT $2 OFFSET $1;`
    let result = await client.query(SQL,[offset,limit])
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

const getStoreProducts = async (id,limit,offset) => {
    try {
        let SQL = `SELECT * FROM product WHERE store_id =$1 LIMIT $2 OFFSET $3;`;
        let result = await client.query(SQL,[id,limit,offset]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}


const updateProduct = async (id,data) => {
    try {
        let {store_id, enTitle, arTitle, metaTitle, sku, price, brand_name, description, quantity, discount, discount_rate,age,size} = data;
        let SQL = 'UPDATE product SET store_id=$1, enTitle=$2, metaTitle=$3, sku=$4, price=$5, brand_name=$6, description=$7, quantity=$8,discount=$9,discount_rate=$10,arTitle=$12,age=$13,size=$14 WHERE id=$11 RETURNING *;';
        let safeValues = [store_id, enTitle, metaTitle, sku, price, brand_name, description, quantity, discount, discount_rate, id, arTitle,age,size];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateProductStatus = async (data) => {
    try {
        let {id, status } = data;
        let SQL = `UPDATE product SET status=$1 WHERE id=$2 RETURNING *;`
        let safeValue = [status, id]
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

const updateProductDisplay = async id =>{
    try {
        let SQL = 'UPDATE product SET display=$1 WHERE id=$2 RETURNING *;'
        let result = await client.query(SQL, [false,id])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct,updateProductDisplay,getStoreProducts};
