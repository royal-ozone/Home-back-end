const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const { 
    checkCourier,
    checkCourierStatus,
  } = require('../auth/middleware/acl'); 
  const next = (req, res, next) => next()
  const bearer = require('../auth/middleware/bearer');
  const {routes: tasksRoutes} = require('../api/controllers/courierTaskController')
const routes =[...tasksRoutes]

routes.map(({ method, path, auth, isUpload, uploadType, fn, uploadParams, type, courierStatus, emailSend }) => {

    if (type === 'courier') {
      if (method === 'get') {
        router.get(path, auth ? bearer : next, checkCourier, upload.none(), fn)
      } else if (method === 'post') {
        router.post(path, bearer, checkCourier, courierStatus ? checkCourierStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn, emailSend ? sendEmail : next)
      } else if (method === 'put') {
        router.put(path, bearer, checkCourier, courierStatus ? checkCourierStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn, emailSend ? sendEmail : next)
      } else if (method === 'delete') {
        router.delete(path, bearer, checkCourier, courierStatus ? checkCourierStatus : next, upload.none(), fn, emailSend ? sendEmail : next)
      }
  
    }
  })  
  module.exports = router