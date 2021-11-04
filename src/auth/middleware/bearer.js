'use strict';
const { getTokenRecord } = require('../models/jwt');
const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId, getStoreIdByProfileId } = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return _authError();
        }
        let token = req.headers.authorization.split(' ').pop();

        let tokenRecord = await getTokenRecord(token);

        if (!tokenRecord) {
            res.status(403).json({
                status: 403,
                message: 'Invalid token!',
            });
        }

        let validUser = await authenticateWithToken(token, 'access');
        let userProfile = await getProfileByUserId(validUser.id);
        let store = await getStoreIdByProfileId(userProfile.id);

        // request.user:
        
        req.user = validUser;
        req.user.profile_id = userProfile.id;
        req.user.store_id = store? store.id: null;

        next();

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    function _authError() {
        res.status(403).send('Header authorization is not provided');
    }

}