'use strict';

const addOrderHandler = async (req, res,next) => {
    try {
        let cartData = await getCartById
        let data = await addOrderModel();

    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(403).send(response)
    }
}
module.exports = {addOrderHandler}