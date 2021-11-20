'use strict';



const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');
const multer = require('multer');
let upload = multer()


const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');


const {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler,getAddressByProfileIdModelHandler} = require('../api/controllers/addressControllers')
const {addCartHandler,addCartItemHandler,removeCartItemHandler,getAllCartItemHandler,getAllCartHandler} = require('../api/controllers/cartControllers');
const {addOrderHandler,addOrderItemHandler,updateOrderStatusHandler,getAllOrderHandler} = require('../api/controllers/orderControllers');




const {checkAdmin,checkMod,checkAuth,checkStoreAuth,checkBan, checkActive,checkCourierCompany, checkCourier, checkCourierCompanyStatus, checkCourierStatus} = require ('../auth/middleware/acl')

const {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler} = require('../api/controllers/productControllers')
const {addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler} = require('../api/controllers/tagController')
const {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler} = require('../api/controllers/productTagController')
const {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler} = require('../api/controllers/productReviewController')
const {addProductRatingHandler, getProductRatingHandler, deleteProductRatingHandler, updateProductRatingHandler} = require('../api/controllers/productRating')


const {addOrderNotificationHandler,getOrderNotificationHandler,getOrderNotificationByStoreIdHandler} = require('../api/controllers/orderNotificationController')
const {addOfferNotificationHandler,getOfferNotificationByStoreIdHandler,getAllOfferNotificationsHandler} = require('../api/controllers/offerNotificationController')

const  {createStoreHandler,getStoreHandler,deleteStoreHandler,updateStoreHandler,updateStoreNameHandler,getAllStoresHandler,getStoreByStatusHandler,updateStoreStatusHandler,getStoreByNameHandler,getAllStoreReviewHandler,getStoreReviewHandler,createStoreReviewHandler,updateStoreReviewHandler,deleteStoreReviewHandler,getAllStorefollowersHandler,getStorefollowersHandler,createStorefollowerHandler,deleteStorefollowerHandler, updateStorePictureHandler,
  deleteStorePictureHandler} = require('../api/controllers/storesController')
const {uploadS3} = require('../api/middleware/uploader');
const {uploadHandler} = require('../api/controllers/uploadController')
const {updateProfilePictureHandler, deleteProfilePictureHandler, getProfilePictureByProfileIdHandler} = require('../api/controllers/profilePictureHandler')

const {
  createReturnRequestHandler,
  getAllReturnRequestsHandler,
  updateReturnRequestStatusHandler
} = require('../api/controllers/returnRequestController')

const {
  createDiscountCodeHandler,
  updateActiveDiscountCodeHandler,
  updateDisconnectHandler,
  removeDiscountHandler,
  getAllDiscountHandlers,
  checkCodeHandler,
  getAllPromoHandler,
  getPromoHandler
} = require('../api/controllers/discountCodeControllers')


const {
  addSuggestionHandler,
  removeSuggestionHandler,
  updateSuggestionHandler,
  updateStatusSuggestionHandler,
  getAllSuggestionHandler,
  getMySuggestionHandler,
} = require ('../api/controllers/suggestionControllers')

const {
  addCourierFeedback,
  removeCourierFeedback,
  updateCourierFeedback,
  getCourierFeedback,
  getAllCouriersFeedback,
} = require ('../api/controllers/courierFeedbackControllers')
const {createCourierCompanyHandler,updateCourierCompanyStatusHandler,updateCourierCompanyNameHandler,getAllCourierCompaniesHandler, getCourierCompanyByCompanyIdHandler} = require('../api/controllers/courierCompanyController');

const {createCourierHandler,updateCourierStatusHandler,deleteCourierHandler,getAllCouriersHandler,getCourierByIdHandler,getCouriersByCompanyIdHandler} = require('../api/controllers/courierController')

const {addCourierTaskHandler,getAllCourierTasksHandler,getCourierTaskByIdHandler,updateCourierTaskStatusHandler,updateCourierTaskCourierIdHandler} = require('../api/controllers/courierTaskController');

const {addDeliveryTaskHandler,getAllDeliveryTasksHandler,updateDeliveryTaskCompanyIdHandler,updateDeliveryTaskCourierIdHandler,getDeliveryTaskByIdHandler} = require('../api/controllers/deliveryTaskController');

const {addDeliveryTaskNotificationHandler, getDeliveryTaskNotificationByIdHandler, updateDeliveryTaskHandler} = require('../api/controllers/deliveryTaskNotificationController')





// Global middleware
router.use(bearer);

router.post('/store',uploadS3.single('image'), createStoreHandler);
router.put('/store',checkStoreAuth,upload.none(),updateStoreHandler);
router.delete('/store',checkStoreAuth,upload.none(), deleteStoreHandler);
router.get('/store',upload.none(), getStoreHandler);
router.put('/store/name',checkStoreAuth, upload.none(),updateStoreNameHandler);
router.put('/store/status',checkAuth, upload.none(),updateStoreStatusHandler);
router.get('/store/all',upload.none(), getAllStoresHandler)
router.get('/store/status/:status',checkAuth, upload.none(),getStoreByStatusHandler)
router.get('/store/name/:name', upload.none(),getStoreByNameHandler)
router.put('/store/picture',uploadS3.single('image'), updateStorePictureHandler);
router.delete('/store/picture',upload.none(), deleteStorePictureHandler)

router.get('/store/review',upload.none(), getAllStoreReviewHandler)
router.get('/store/review/:storeId', upload.none(),getStoreReviewHandler)
router.post('/store/review',upload.none(),createStoreReviewHandler)
router.put('/store/review/:storeId',upload.none(), updateStoreReviewHandler)
router.delete('/store/review/:storeId',upload.none(), deleteStoreReviewHandler)

router.get('/store/follower',upload.none(), getAllStorefollowersHandler)
router.get('/store/follower/:storeId',upload.none(), getStorefollowersHandler)
router.post('/store/follower',upload.none(),createStorefollowerHandler)
router.delete('/store/follower/:storeId',upload.none(),deleteStorefollowerHandler)

router.post('/add/PG',bearer,checkAdmin,upload.none(),addParentCategory);
router.delete('/remove/PG/:idPG',bearer,upload.none(),checkAdmin,removeParentCategory);
router.put('/update/PG/:idPG',bearer,upload.none(),checkAuth,updateParentCategory);
router.get('/get/PG/:idPG',bearer,upload.none(),checkAuth,getParentCategoryById);
router.get('/getAll/PG',bearer,upload.none(),getAllParentCategory);
router.get('/search/title/PG',bearer,upload.none(),getParentCategoryByTitle);


router.post('/add/CG',bearer,upload.none(),checkAuth,addChildCategory);
router.delete('/remove/CG/:idCG',upload.none(),bearer,checkAuth,removeChildCategory);
router.put('/update/CG/:idCG',upload.none(),bearer,checkAuth,updateChildCategory);
router.get('/get/CG/:idCG',upload.none(),bearer,checkAuth,getChildCategoryById);
router.get('/getAll/CG',upload.none(),bearer,getAllChildCategory);
router.get('/search/title/CG',bearer,upload.none(),getChildCategoryByTitle);


router.post('/add/GCG',bearer,upload.none(),checkAuth,addGrandChildCategory);
router.delete('/remove/GCG/:idGCG',bearer,upload.none(),checkAuth,removeGrandChildCategory);
router.put('/update/GCG/:idGCG',bearer,upload.none(),checkAuth,updateGrandChildCategory);
router.get('/get/GCG/:idGCG',bearer,upload.none(),checkAuth,getGrandChildCategoryById);
router.get('/getAll/GCG',bearer,upload.none(),getAllGrandChildCategory);
router.get('/search/title/GCG',bearer,upload.none(),getGrandChildCategoryByTitle);



router.post('/add/address',bearer,upload.none(),addAddressHandler);
router.delete('/remove/address/:id',bearer,upload.none(),removeAddressHandler);
router.put('/update/address/:id',bearer,upload.none(),updateAddressHandler);
router.get('/getAll/address',bearer,upload.none(),getAllAddressHandler);
router.get('/get/address',bearer,upload.none(),getAddressByProfileIdModelHandler);


router.post('/add/cart',bearer,upload.none(),addCartHandler);
router.post('/add/cart_item',bearer,upload.none(),addCartItemHandler);
router.delete('/remove/cart_item',bearer,upload.none(),removeCartItemHandler);
router.get('/getAll/cart_item',bearer,upload.none(),getAllCartItemHandler);
router.get('/getAll/cart',bearer,upload.none(),getAllCartHandler); 

router.post('/add/order',bearer,upload.none(),addOrderHandler);
router.post('/add/order_item',bearer,upload.none(),addOrderItemHandler);
router.put('/update/status/:id',bearer,upload.none(),updateOrderStatusHandler);
router.get('/getAll/order',bearer,upload.none(),getAllOrderHandler);



router.post('/tag',upload.none(),addTagHandler)
router.get('/tag/:id',upload.none(),getTagHandler)
router.delete('/tag/:id',upload.none(),deleteTagHandler)
router.put('/tag/:id', upload.none(),updateTagHandler)
router.get('/tag',upload.none(), getAllTagsHandler)

router.post('/product', uploadS3.array('image'), addProductHandler)
router.get('/product',upload.none(), getAllProductHandler)
router.get('/product/:id',upload.none(), getProductHandler)
router.put('/product/:id',upload.none(), updateProductHandler)
router.put('/product/status/:id',upload.none(), updateProductStatusHandler)
router.delete('/product/:id',upload.none(), deleteProductHandler)

router.post('/product/tag',upload.none(),addProductTagHandler)
router.get('/product/tag/:id',upload.none(), getProductTagsHandler)
router.delete('/product/tag/:id',upload.none(), deleteProductTagHandler)
router.put('/product/tag/:id',upload.none(), updateProductTagsHandler)

router.post('/product/review',upload.none(),addProductReviewHandler)
router.get('/product/review/:id',upload.none(), getProductReviewHandler)
router.delete('/product/review/:id',upload.none(), deleteProductReviewHandler)
router.put('/product/review/:id',upload.none(), updateProductReviewHandler)

router.post('/product/rating',upload.none(),addProductRatingHandler)
router.get('/product/rating/:id',upload.none(), getProductRatingHandler)
router.delete('/product/rating/:id', upload.none(),deleteProductRatingHandler)
router.put('/product/rating/:id', upload.none(),updateProductRatingHandler)

router.post('/order/notification', upload.none(),addOrderNotificationHandler)
router.get('/order/notification/:id', upload.none(),getOrderNotificationHandler)
router.get('/order/notifications', upload.none(),getOrderNotificationByStoreIdHandler)

router.post('/offer/notification',upload.none(), addOfferNotificationHandler)
router.get('/offer/notification', upload.none(),getAllOfferNotificationsHandler)
router.get('/offer/notification/store',upload.none(), getOfferNotificationByStoreIdHandler)

router.post('/upload',uploadS3.array('file') ,uploadHandler)

router.get('/profile/picture', upload.none(),getProfilePictureByProfileIdHandler)
router.put('/profile/picture', uploadS3.single('image'), updateProfilePictureHandler)
router.delete('/profile/picture', upload.none(),deleteProfilePictureHandler)

router.post('/return', upload.none(), createReturnRequestHandler)
router.get('/return',upload.none(), getAllReturnRequestsHandler)
router.put('/return',upload.none(),updateReturnRequestStatusHandler)

router.post('/add/discount',bearer,upload.none(),checkAdmin,createDiscountCodeHandler);
router.put('/update/active/:id',bearer,upload.none(),checkAdmin,updateActiveDiscountCodeHandler);
router.put('/update/:id',bearer,upload.none(),checkAdmin,updateDisconnectHandler);
router.delete('/remove/:id',bearer,upload.none(),checkAdmin,removeDiscountHandler);
router.get('/getAll',bearer,upload.none(),checkAdmin,getAllDiscountHandlers);
router.post('/checkCode',bearer,upload.none(),checkCodeHandler);
router.get('/getAll/promo',bearer,upload.none(),checkAdmin,getAllPromoHandler);
router.get('/get/:id',bearer,upload.none(),getPromoHandler);

router.post('/add/suggestion',bearer,upload.none(),addSuggestionHandler);
router.delete('/remove/suggestion/:id',bearer,upload.none(),removeSuggestionHandler);
router.put('/update/suggestion/:id',bearer,upload.none(),updateSuggestionHandler);
router.get('/getAll/suggestion',bearer,upload.none(),checkAdmin,getAllSuggestionHandler);
router.get('/get/mySuggestion/:id',bearer,upload.none(),getMySuggestionHandler);
router.put('/update/suggestion/status/:id',bearer,upload.none(),checkAdmin,updateStatusSuggestionHandler);

router.post('/courierCompany',upload.none(), createCourierCompanyHandler);
router.get('/courierCompanies', upload.none(),getAllCourierCompaniesHandler)
router.get('/courierCompany',upload.none(), getCourierCompanyByCompanyIdHandler)
router.put('/courierCompany/name',upload.none(), updateCourierCompanyNameHandler)
router.put('/courierCompany/status/:id',upload.none(),checkAuth, updateCourierCompanyStatusHandler)

router.post('/courier',upload.none(),checkCourierCompany, createCourierHandler)
router.put('/courier',upload.none(),checkCourier, updateCourierStatusHandler) 
router.delete('/courier',upload.none(),checkCourierCompany, deleteCourierHandler)
router.get('/couriers',upload.none(), checkAuth,getAllCouriersHandler)
router.get('/courier',upload.none(), checkCourierCompany,getCourierByIdHandler)
router.get('/companyCouriers',upload.none(), checkCourierCompany,getCouriersByCompanyIdHandler)
router.get('/courier/:id',upload.none(), checkCourierCompany,getCourierByIdHandler)

router.post('/courierTask',upload.none(), addCourierTaskHandler)
router.get('/courierTasks', upload.none(),getAllCourierTasksHandler)
router.get('/courierTask',upload.none(), getCourierTaskByIdHandler)
router.put('/courierTask/status',upload.none(), updateCourierTaskStatusHandler)
router.put('/courierTask/courierId',upload.none(), updateCourierTaskCourierIdHandler)

router.post('/deliveryTask',upload.none() ,addDeliveryTaskHandler)
router.get('/deliveryTasks',upload.none(),checkCourierCompanyStatus, getAllDeliveryTasksHandler)
router.put('/deliveryTask/companyId',upload.none(), updateDeliveryTaskCompanyIdHandler)
router.put('/deliveryTask/courierId',upload.none(), updateDeliveryTaskCourierIdHandler)
router.get('/deliveryTask',upload.none(), getDeliveryTaskByIdHandler)

router.post('/deliveryTask/notification',upload.none(), addDeliveryTaskNotificationHandler)
router.get('/deliveryTask/notification',upload.none(),getDeliveryTaskNotificationByIdHandler)
router.put('/deliveryTask/notification',upload.none(), updateDeliveryTaskHandler)

router.post('/add/courier/feedback',bearer,upload.none(),addCourierFeedback);
router.delete('/remove/courier/feedback/:id',bearer,upload.none(),removeCourierFeedback);
router.put('/update/courier/feedback/:id',bearer,upload.none(),updateCourierFeedback);
router.get('/get/courier/feedback/:id',bearer,upload.none(),getCourierFeedback);
router.get('/getAll/courier/feedback',bearer,upload.none(),getAllCouriersFeedback);

// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});


module.exports = router;
