const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const next = (req, res, next) => next()
const { routes: orderRoutes } = require('../api/controllers/orderControllers')
const { routes: addressRoutes } = require('../api/controllers/addressControllers')
const {routes: parentRoutes} =  require('../api/controllers/parentCategory')
const {routes: childRoutes} = require('../api/controllers/childCategory')
const {routes: grandchildRoutes} = require('../api/controllers/grandChildCategory')
const {routes:userRoutes} =  require('../auth/controllers/authController')
const {routes:storeRoutes} = require('../api/controllers/storesController')
const {routes:discountCodeRoutes} = require('../api/controllers/discountCodeControllers')
const {routes:productRoutes} = require('../api/controllers/productControllers')
const {routes:ProductReviewRoutes} = require('../api/controllers/productReviewController')
const {routes:amountRoutes} = require('../api/controllers/amounts')

const bearer = require('../auth/middleware/bearer');
const withdrawRoutes = require('../api/controllers/withdrawController')

let routes = [...orderRoutes, ...addressRoutes,...withdrawRoutes,...parentRoutes,...childRoutes,...grandchildRoutes,...userRoutes,...storeRoutes,...discountCodeRoutes,...productRoutes,...ProductReviewRoutes,...amountRoutes]
const { checkAdmin,
    checkMod,
    checkSupervisor,
    checkAuth,
  } = require('../auth/middleware/acl');

routes.map(({ method, path, isUpload, uploadType, fn, uploadParams, type }) => {  

    if (type === 'admin') {
      if (method === 'get') {
        router.get(path,  bearer , checkAuth, upload.none(), fn)
      } else if (method === 'post') {
        router.post(path, bearer, checkAuth, isUpload ? (uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams)) : upload.none(), fn)
      } else if (method === 'put') {
        router.put(path, bearer, checkAuth, isUpload ? (uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams)) : upload.none()  , fn)
      } else if (method === 'delete') {
        router.delete(path, bearer, checkAuth, upload.none(), fn)
      }else if (method === 'patch') {
        router.patch(path, bearer, checkAuth, upload.none(), fn)
      }
  
    }
  })
  module.exports = router
