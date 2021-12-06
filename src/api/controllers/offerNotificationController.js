const {addOfferNotification,getOfferNotificationByStoreId,getAllOfferNotifications} = require('../models/offerNotification')
const events = require('../../socket/event');

const addOfferNotificationHandler = async (req, res) => {
    try {
        let result = await addOfferNotification({store_id: req.user.store_id,...req.body})
        events.emit('offerNotification', result);
        res.status(200).send('notification has been created')
    } catch (error) {
        res.send(error.message)
    }
}


const getOfferNotificationByStoreIdHandler = async (req, res) => {
    try {
        let result = await getOfferNotificationByStoreId(req.user.store_id)
        res.status(200).json({
            status: 200,
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
            status: 200,
            result: result,
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {addOfferNotificationHandler,getOfferNotificationByStoreIdHandler,getAllOfferNotificationsHandler}