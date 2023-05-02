const {addOfferNotification,getOfferNotificationByStoreId,getAllOfferNotifications} = require('../models/offerNotification')
const events = require('../../socket/event');

const addOfferNotificationHandler = async (data) => {
    try {
        
        let result = await addOfferNotification(data);
        if(result){
            events.emit('offerNotification', result);
            // res.status(200).send('notification has been created')
            return result;
        }
    } catch (error) {
        throw new Error(error.message)
        // res.send(error.message)
    }
}


const getOfferNotificationByStoreIdHandler = async (req, res) => {
    try {
        let result = await getOfferNotificationByStoreId(req.user.store_id?req.user.store_id:req.params.id)
        res.status(200).json({
            Number: result.length,
            result: result,
        })
    } catch (error) {
        res.send(error.message)

    }
}

const getAllOfferNotificationsHandler = async (req, res) => {
    try {
        let result = await getAllOfferNotifications()
        res.status(200).json({
            Number:result.length,
            result: result,
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {addOfferNotificationHandler,getOfferNotificationByStoreIdHandler,getAllOfferNotificationsHandler}