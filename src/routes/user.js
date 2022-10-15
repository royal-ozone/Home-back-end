const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer()
const { uploadS3 } = require('../api/middleware/uploader');
const bearer = require('../auth/middleware/bearer');
const next = (req, res, next) => next()

const {routes: pRRoutes} = require('../api/controllers/productReviewController')

const routes = [...pRRoutes]

routes.map(({ method, path, auth, isUpload, uploadType, fn, uploadParams, type }) => {

    if (type === 'user') {
      if (method === 'get') {
        router.get(path, auth ? bearer : next, upload.none(), fn)
      } else if (method === 'post') {
        router.post(path, bearer, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
      } else if (method === 'put') {
        router.put(path, bearer, !isUpload ? upload.none() : uploadType === 'single' ? uploadS3.single(uploadParams) : uploadS3.array(uploadParams), fn)
      } else if (method === 'delete') {
        router.delete(path, bearer, upload.none(), fn)
      }
  
    }
  })

  module.exports = router