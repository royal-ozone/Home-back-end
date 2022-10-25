const { createCourier, updateCourierStatus, deleteCourier, getAllCouriers, getCourierById, getCouriersByCompanyId, removeCourierByCompany, resetCourier } = require('../models/courier');
const { getProfileByEmail } = require('../../auth/models/user')


const createCourierHandler = async (req, res,next) => {
    try {
        let profileData = await getProfileByEmail(req.body.email)
        if (profileData) {
            req.emailDetails = { email: req.body.email, message: 'courier has been added successfully', user: { email: req.body.email, ...profileData }, template: `courierInvitation-${req.headers.locale}`, context: { courierHost: process.env.COURIER_HOST, name: profileData.first_name, companyName:req.body.companyName }, title: 'Driver Invitation / دعوة سائق' }
            let courier = await getCourierById(profileData.id)
            if (courier && !courier.company_id) {
                let result = await resetCourier({ company_id: req.user.courier_company_id, id: courier.id })
                if (result) {
                    // res.send({ status: 200, data: result, message: 'courier has been added successfully' })
                    next()
                }
            }
            else if (courier.company_id === req.user.courier_company_id) {
                res.send({ status: 403, message: 'duplicate' })
            }
            else if (courier && courier.company_id) {
                res.send({ status: 403, message: `you can't send invitation for this driver` })
            }
            else {
                let company_id = req.user.courier_company_id ? req.user.courier_company_id : null;
                let profile = profileData.id ? profileData.id : req.user.profile_id;
                let result = await createCourier({ company_id: company_id, profile_id: profile })
                // res.json({
                //     data: result,
                //     message: 'courier has been added successfully',
                //     status: 200

                // })
                next()
            }

        } else {
            res.send({ status: 403, message: `there's no account with this email address` })
        }
    } catch (error) {
        res.send({ message: error, status: 403 })
    }
}

const updateCourierStatusHandler = async (req, res) => {
    try {
        let id = req.user.courier_id;
        let result = await updateCourierStatus(id, req.body)
        if(result?.id){
            res.json({
                message: 'courier status has been updated successfully', data: result, status: 200
            })

        } else {
            res.send({message: result, status: 403})
        }
    } catch (error) {
        res.send({message:error, status: 403})
    }
}

const deleteCourierHandler = async (req, res) => {
    try {
        let result = await deleteCourier(req.body.courier_id)
        if (result) {
            res.status(200).json({
                message: 'courier has been removed successfully', ...result
            })
        } else {
            res.status(403).send('there`s not courier with this id')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getAllCouriersHandler = async (req, res) => {
    try {
        let result = await getAllCouriers();
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierByIdHandler = async (req, res) => {
    try {
        let id = req.params.id ? req.params.id : req.user.courier_id;
        let result = await getCourierById(id);
        res.status(200).json(result)
    } catch (error) {
        res.send({ message: error, status: 403 })
    }
}

const getCouriersByCompanyIdHandler = async (req, res) => {
    try {
        let { data, count } = await getCouriersByCompanyId({ id: req.user.courier_company_id, ...req.query });
        res.json({ status: 200, data: data, count: count })
    } catch (error) {
        res.send({ message: error, status: 403 })
    }
}

const removeCourierByCompanyHandler = async (req, res) => {
    try {
        let result = await removeCourierByCompany(req.body.id)
        if (result) {
            res.send({ data: result, status: 200 })
        } else res.send({ status: 403, message: result })
    } catch (error) {
        res.send({ message: error, status: 403 })
    }
}
const routes = [
    {
        path: '/courier/remove',
        auth: true,
        method: 'delete',
        type: 'courierCompany',
        fn: removeCourierByCompanyHandler,
        courierCompanyStatus: true,
       
    }
];
module.exports = {
    createCourierHandler,
    updateCourierStatusHandler,
    deleteCourierHandler,
    getAllCouriersHandler,
    getCourierByIdHandler,
    getCouriersByCompanyIdHandler,
    removeCourierByCompanyHandler,
    routes
}