const client = require('../../db')


const request = async (data, SQL, single=true) =>{
    try {
        let query = SQL;
        let safeValues = data
        let result = await client.query(query, safeValues)
        if(single){
            return result.rows[0]
        } else{
            return result.rows
        }
    } catch (error) {
    throw new Error(error.message)        
    }
}
const addItemToWishList = async data => {
    let SQL = "INSERT INTO wishlist (profile_id, product_id) VALUES ($1,$2) RETURNING *;"
    let {profile_id, product_id} = data;
    return request([profile_id, product_id], SQL)
}

const getWishListItems = async (id,limit,offset) => {
    let SQL = "SELECT w.*, p.entitle, p.artitle, p.price, p.currency FROM wishlist w inner join product p on w.product_id =p.id WHERE w.profile_id=$1 LIMIT $2 OFFSET $3;"
    return request([id,limit,offset], SQL, false)
}

const deleteFromWishList = async id => {
    let SQL = "DELETE FROM wishlist WHERE product_id=$1 OR id=$1 RETURNING *;"
    return request([id], SQL)
}

module.exports = { addItemToWishList, getWishListItems,deleteFromWishList}