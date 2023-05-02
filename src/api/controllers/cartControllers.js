'use strict';

const { addCartItemModel, removeCartItemModelByCartId, getAllCartItemModel, getAllCartModel, updateCart, updateCartItemQuantity, removeCartItemById } = require('../models/cart');
const {getProductPictureByProductId} = require('../models/order')

const updateCartHandler = async (req, res) => {
    try {
        let result = await updateCart({ address_id: req.body.address_id, id: req.user.cart_id, discount_id: req.body.discount_id })
        if (result?.id) {
            res.json({status: 200, message: 'cart updated successfully' })
        } else {
            res.send({ status: 403, message: `something went wrong while updating cart ${result}` })
        }
    } catch (error) {
        res.send(error.message)
    }
}
const updateCartItemQuantityHandler = async (req, res) => {
    try {
        let result = await updateCartItemQuantity(req.body)
        if (result?.id) {
            res.json({ status: 200, data: result})
        } else {
            res.send({ status: 403, message: `something went wrong while updating cart ${result}` })
        }
    } catch (error) {
        res.send(error.message)
    }
}
const addCartItemHandler = async (req, res) => {
    try {
        let data = await addCartItemModel(req.user.cart_id, req.body);
        if (data?.id) {
            let response = {
                message: 'successfully added cart item ',
                data: data,
                status: 200
            }
            res.status(200).json(response)
        } else {
            res.json({ message: data, status: 403 })
        }
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.send(response)
    }
}
const removeCartItemByCartIdHandler = async (req, res) => {
    try {

        let data = await removeCartItemModelByCartId(req.body.id)
        if (data) {
            let response = {
                message: 'Successfully removed cart item',
                ...data
            }
            return res.status(200).send(response);
        } else {
            return res.send({ status: 403, message: 'something went wrong while removing the item' });
        }

    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.send({ ...response, status: 403 });
    }
}
const removeCartItemByIdHandler = async (req, res) => {
    try {

        let data = await removeCartItemById(req.body.id)
        if (data) {
            // let response = {
            //     message: 'Successfully removed cart item',
            //     ...data
            // }
            return res.send({status: 200, data: data,message: 'Successfully removed cart item'});
        } else {
            return res.send({ status: 403, message: 'something went wrong while removing the item' });
        }

    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.send({ ...response, status: 403 });
    }
}
const getAllCartItemHandler = async (req, res) => {
    try {
        let data = await getAllCartItemModel(req.user.cart_id)
        let dataWithPics = await data.map(async (item) => {
            let pic = await getProductPictureByProductId(item.product_id)
            return {...item, picture: pic?.product_picture}
        })
        let response = {
            message: 'Successfully get all cart item',
            data: await Promise.all(dataWithPics),
            status: 200
        }
        res.send(response);
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.send({ ...response, status: 403 });
    }
}
const getAllCartHandler = async (req, res, next) => {
    try {
        let data = await getAllCartModel()
        let response = {
            message: 'successfully get all cart',
            all_cart: data
        }
        res.status(200).send(response);
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.send({ ...response, status: 403 });
    }
}
module.exports = { addCartItemHandler, removeCartItemByCartIdHandler, removeCartItemByIdHandler, getAllCartItemHandler, getAllCartHandler, updateCartHandler, updateCartItemQuantityHandler };