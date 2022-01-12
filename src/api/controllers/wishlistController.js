const { addItemToWishList, getWishListItems,deleteFromWishList} = require('../models/wishlist')

const addItemToWishListHandler = async (req, res, next) => {
    try {
        let result = await addItemToWishList({profile_id: req.user.profile_id, product_id: req.body.product_id})
        if(result.id){
            res.status(201).json({
                message: 'item has been added to wishlist successfully',
                ...result
            })
        } else{
            res.status(403).send('something went wrong while adding item to wishlist')
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getWishListItemsHandler = async (req, res, next)=>{
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset || 0;
        let result = await getWishListItems(req.user.profile_id,limit,offset)
        req.wishlist = result
        next();
        // res.status(200).json(result)
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteFromWishListHandler = async (req, res, next)=>{
    try {
        let result = await deleteFromWishList(req.body.id)
        if(result.id){
            res.status(200).json({
                message: 'item has been removed from wishlist',
                ...result})
        } else {
            res.status(403).send('something went wrong while deleting from wishlist')
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = {addItemToWishListHandler, getWishListItemsHandler, deleteFromWishListHandler}