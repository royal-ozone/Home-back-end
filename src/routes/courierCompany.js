const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const bearer = require('../auth/middleware/bearer');
const sendEmail = require('../api/middleware/sendEmail');
const next = (req, res, next) => next()
const {
  checkCourierCompany,
  checkCourierCompanyStatus,
} = require('../auth/middleware/acl');
const { routes: courierRoutes } = require('../api/controllers/courierController')
const { routes: deliveryTaskRoutes } = require('../api/controllers/deliveryTaskController')

const routes = [...courierRoutes,...deliveryTaskRoutes]
routes.map(({ method, path, auth, isUpload, uploadType, fn, uploadParams, type, courierCompanyStatus, emailSend }) => {

  if (type === 'courierCompany') {
    if (method === 'get') {
      router.get(path, auth ? bearer : next, checkCourierCompany, upload.none(), fn)
    } else if (method === 'post') {
      router.post(path, bearer, checkCourierCompany, courierCompanyStatus ? checkCourierCompanyStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn, emailSend ? sendEmail : next)
    } else if (method === 'put') {
      router.put(path, bearer, checkCourierCompany, courierCompanyStatus ? checkCourierCompanyStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn, emailSend ? sendEmail : next)
    } else if (method === 'delete') {
      router.delete(path, bearer, checkCourierCompany, courierCompanyStatus ? checkCourierCompanyStatus : next, upload.none(), fn, emailSend ? sendEmail : next)
    }

  }
})

module.exports = router