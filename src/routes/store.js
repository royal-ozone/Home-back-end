const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const bearer = require('../auth/middleware/bearer');
const next = (req, res, next) => next()
const { routes: orderRoutes } = require('../api/controllers/orderControllers')
const { routes: addressRoutes } = require('../api/controllers/addressControllers')
const withdrawRoutes = require('../api/controllers/withdrawController')
const {routes: amountRoutes} = require('../api/controllers/storeAmountsController')
let routes = [...orderRoutes, ...addressRoutes,...withdrawRoutes,...amountRoutes]
const {
  checkStoreAuth,
  checkStoreStatus,
} = require('../auth/middleware/acl');


routes.map(({ method, path, auth, isUpload, uploadType, fn, uploadParams, type, storeStatus }) => {

  if (type === 'store') {
    if (method === 'get') {
      router.get(path, auth ? bearer : next, checkStoreAuth, upload.none(), fn)
    } else if (method === 'post') {
      router.post(path, bearer, checkStoreAuth, storeStatus ? checkStoreStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
    } else if (method === 'put') {
      router.put(path, bearer, checkStoreAuth, storeStatus ? checkStoreStatus : next, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
    } else if (method === 'delete') {
      router.delete(path, bearer, checkStoreAuth, storeStatus ? checkStoreStatus : next, upload.none(), fn)
    }

  }
})

module.exports = router