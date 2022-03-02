const client = require('../../db')

const addProduct = async data => {
    try {
        
        let {store_id,entitle,artitle,metatitle, sku, price, brand_name, endescription, quantity,age,size,parent_category_id,child_category_id,grandchild_category_id,ardescription,discount,discount_rate } = data;
        let SQL = `INSERT INTO product (store_id,entitle,artitle,metatitle,sku,price,brand_name,endescription,quantity, age, size,parent_category_id,child_category_id,grandchild_category_id,ardescription,discount,discount_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10, $11 ,$12,$13,$14,$15,$16,$17) RETURNING *;`;
        if(!entitle && artitle){
            entitle = artitle
        } else if(!artitle && entitle){
            artitle = entitle
        }
        let safeValues = [store_id,entitle,artitle,metatitle,sku,price,brand_name,endescription,quantity,age,size,parent_category_id,child_category_id,grandchild_category_id,ardescription,discount,discount_rate];
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

const getStoreProductsByStatus = async (id,limit,offset, status) => {
    try {
        let SQL = `SELECT * FROM product WHERE store_id=$1 AND status=$4 LIMIT $2 OFFSET $3;`;
        let result = await client.query(SQL,[id,limit,offset, status]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}


const updateProduct = async (data) => {
    try {
        let {id,store_id, entitle, artitle, metaTitle, sku, price, brand_name, endescription, quantity, discount, discount_rate,age,size,ardescription} = data;
        let SQL = 'UPDATE product SET store_id=$1, enTitle=$2, metaTitle=$3, sku=$4, price=$5, brand_name=$6, endescription=$7, quantity=$8,discount=$9,discount_rate=$10,arTitle=$12,age=$13,size=$14, ardescription=$15 WHERE id=$11 RETURNING *;';
        let safeValues = [store_id, entitle, metaTitle, sku, price, brand_name, endescription, quantity, discount, discount_rate, id, artitle,age,size,ardescription];
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

const decreaseSizeQuantity = async data => {
    try {
        const {id, size, quantity} = data
        let product = await getProduct(id);
        if(size){
            let arr = JSON.parse(product.size) 
            let newSize = arr.map(val =>{
            if(val.size === size){
                return {size: val.size, quantity: val.quantity - Number(quantity)}
            } else{
                return val

            }
        } )

        let newProduct = {...product, quantity: newSize.reduce((p,c)=> p+c.quantity, 0), size: JSON.stringify(newSize)}

        let result = await updateProduct(newProduct)
        return result

    } else{
        let result = await updateProduct({...product, quantity: Number(product.quantity) - Number(quantity)})
        return result
      }
       
    } catch (error) {
        throw new Error(error.message)
    }
}

const increaseSizeQuantity = async data => {
  try {
      const {id, size, quantity} = data
      let product = await getProduct(id);
      if(size){
          let newSize = product.size.map(val =>{
              if(val.size ===size){
                  return {size: val.size, quantity: val.quantity + Number(quantity)}
              }
              return val
          } )
    
          let newProduct = {...product, quantity: newSize.reduce((p,c)=> p+c.quantity, 0), size: newSize}
    
          let result = await updateProduct(newProduct)
        return result

      } else{
        let result = await updateProduct({...product, quantity: product.quantity + Number(quantity)})
        return result
      }
  } catch (error) {
      throw new Error(error.message)
  }
}




module.exports = {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct,updateProductDisplay,getStoreProducts, decreaseSizeQuantity, increaseSizeQuantity,getStoreProductsByStatus};
