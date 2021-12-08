'use strict';
const { getTokenRecord } = require('../models/jwt');
const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId } = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            _authError();
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

        // request.user:

        req.user = validUser;
        req.user.profile_id = userProfile.id;

        next();

    } catch (error) {
        throw new Error(error.message);
    }
    function _authError() {
        next('Invalid Login');
    }

}