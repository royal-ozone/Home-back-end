const { addItemToWishList, getWishListItems,deleteFromWishList} = require('../models/wishlist')
const {getProductPictureByProductId} = require('../models/order')

const addItemToWishListHandler = async (req, res, next) => {
    try {
        let result = await addItemToWishList({profile_id: req.user.profile_id, product_id: req.body.id})
        if(result.id){
            res.json({
                status: 200,
                result: result
            })
        } else{
            result.send({status: 403,message:`something went wrong while adding item to wishlist: ${result}`})
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getWishListItemsHandler = async (req, res, next)=>{
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset || 0;
        let result = await getWishListItems(req.user.profile_id,limit,offset)
        let dataWithPics = await result?.map(async (item) => {
            let pic = await getProductPictureByProductId(item.product_id)
            return {...item, picture: pic?.product_picture}
        })
        if (result) {
            res.send({status: 200, result: await Promise.all(dataWithPics)})
        } else {
            res.send({status: 403, message: `something went wrong: ${result}`})
        }
        
    } catch (error) {
        res.send(error.message)
    }
}

const deleteFromWishListHandler = async (req, res, next)=>{
    try {
        let result = await deleteFromWishList(req.body.id)
        if(result.id){
            res.json({
               status: 200,
                result: result})
        } else {
            res.send({message: 'something went wrong while deleting from wishlist', status: 403})
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {addItemToWishListHandler, getWishListItemsHandler, deleteFromWishListHandler}