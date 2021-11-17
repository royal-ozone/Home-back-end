'use strict';
const { getTokenRecord } = require('../models/jwt');
const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId, getStoreIdByProfileId, getCompanyByProfileId,getCourierByProfileId } = require('../models/user')

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
        else {
            let validUser = await authenticateWithToken(token, 'access');
            let userProfile = await getProfileByUserId(validUser.id);
            let store = await getStoreIdByProfileId(userProfile.id);
            let company = await getCompanyByProfileId(userProfile.id);
            let courier = await getCourierByProfileId(userProfile.id);

            // request.user:

            req.user = validUser;
            req.user.profile_id = userProfile.id;
            req.user.store_id = store ? store.id : null;
            req.user.courier_company_id = company? company.id : null;
            req.user.courier_id = courier ? courier.id : null;

            next();
        }

    } catch (error) {
        next(error);
    }
    function _authError() {
        res.status(403).send('Header authorization is not provided');
    }

}