const {createCourierCompany, updateCourierCompanyName, getAllCourierCompanies, getCourierCompanyByCompanyId,updateCourierCompanyStatus,updateChangingName} = require('../models/courierCompany');


const createCourierCompanyHandler = async (req, res) => {
    try {
        let result = await createCourierCompany({profile_id: req.user.profile_id, ...req.body})
        res.status(201).json({
            message: 'Courier Company created successfully',
            result
        })
    } catch (error) {
        res.send(error.message);
    }
};

const updateCourierCompanyNameHandler = async (req, res) => {
    try {
        let company = await getCourierCompanyByCompanyId(req.user.courier_company_id);
        if(company.name_is_changed) {
            res.status(403).send('Company name has been changed previously');
        } else  {
            let result = await updateCourierCompanyName(req.user.courier_company_id, req.body);
            await updateChangingName(req.user.courier_company_id)
            res.status(200).json({
                message: `Courier Company Name has successfully changed to ${result.company_name}`, 
            })
        }
    } catch (error) {
        res.send(error.message);
    }
};


const getAllCourierCompaniesHandler = async (req, res) =>{
    try {
        let result = await getAllCourierCompanies();
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message);
    }
}

const getCourierCompanyByCompanyIdHandler = async (req, res) => {
    try {
        let result = await getCourierCompanyByCompanyId(req.user.courier_company_id)
        res.send(result)
    } catch (error) {
        res.send(error.message);
    }
}


const updateCourierCompanyStatusHandler = async (req, res) => {
    try {
        let result = await updateCourierCompanyStatus( req.body);
        res.status(200).send(`status has been updated successfully to ${result.status}`);
    } catch (error) {
        res.send(error.message);
    }
}


module.exports = {createCourierCompanyHandler,updateCourierCompanyStatusHandler,updateCourierCompanyNameHandler,getAllCourierCompaniesHandler, getCourierCompanyByCompanyIdHandler}