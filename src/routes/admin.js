const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const next = (req, res, next) => next()
const { routes: orderRoutes } = require('../api/controllers/orderControllers')
const { routes: addressRoutes } = require('../api/controllers/addressControllers')
const bearer = require('../auth/middleware/bearer');
const withdrawRoutes = require('../api/controllers/withdrawController')
let routes = [...orderRoutes, ...addressRoutes,...withdrawRoutes]
const { checkAdmin,
    checkMod,
    checkSupervisor,
    checkAuth,
    checkStoreAuth,
    checkBan,
    checkActive,
    checkCourierCompany,
    checkCourier,
    checkCourierCompanyStatus,
    checkCourierStatus,
    checkStoreStatus,
    productComment,
    checkOrderStatusForReturn
  } = require('../auth/middleware/acl');

routes.map(({ method, path, auth, isUpload, uploadType, fn, uploadParams, type }) => {

    if (type === 'admin') {
      if (method === 'get') {
        router.get(path, auth ? bearer : next, checkAuth, upload.none(), fn)
      } else if (method === 'post') {
        router.post(path, bearer, checkAuth, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
      } else if (method === 'put') {
        router.put(path, bearer, checkAuth, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
      } else if (method === 'delete') {
        router.delete(path, bearer, checkAuth, upload.none(), fn)
      }
  
    }
  })
  
  module.exports = router