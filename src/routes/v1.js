'use strict';



const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');
const multer = require('multer');
let upload = multer()


const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle,updateDisplayParentCategory} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');


const {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler,getAddressByProfileIdModelHandler} = require('../api/controllers/addressControllers')
const {addCartItemHandler
  ,removeCartItemByCartIdHandler
  ,getAllCartItemHandler
  ,getAllCartHandler
  ,updateCartHandler
  ,updateCartItemQuantityHandler
  ,removeCartItemByIdHandler
} = require('../api/controllers/cartControllers');

const {addOrderHandler,getOrderByStoreIdHandler,getOrderByStoreIdHandlerTwo,updateOrderStatusHandler,getAllOrderHandler,getAllOrderProfileIdHandler,  updateOrderItemStatusHandler
} = require('../api/controllers/orderControllers');




const {checkAdmin,checkMod,checkAuth,checkStoreAuth,checkBan, checkActive,checkCourierCompany, checkCourier, checkCourierCompanyStatus, checkCourierStatus,checkStoreStatus} = require ('../auth/middleware/acl')

const {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler,updateProductPictureHandler,deleteProductPictureHandler,getStoreProductsHandler} = require('../api/controllers/productControllers')
const {addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler} = require('../api/controllers/tagController')
const {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler} = require('../api/controllers/productTagController')
const {addProductReviewHandler,getProductReviewHandler,deleteProductReviewHandler,updateProductReviewHandler} = require('../api/controllers/productReviewController')
const {addProductRatingHandler, getProductRatingHandler, deleteProductRatingHandler, updateProductRatingHandler} = require('../api/controllers/productRating')


const {addOrderNotificationHandler,getOrderNotificationHandler,getOrderNotificationByStoreIdHandler} = require('../api/controllers/orderNotificationController')
const {addOfferNotificationHandler,getOfferNotificationByStoreIdHandler,getAllOfferNotificationsHandler} = require('../api/controllers/offerNotificationController')

const  {createStoreHandler,getStoreHandler,deleteStoreHandler,updateStoreHandler,updateStoreNameHandler,getAllStoresHandler,getStoreByStatusHandler,updateStoreStatusHandler,getStoreByNameHandler,getAllStoreReviewHandler,getStoreReviewHandler,createStoreReviewHandler,updateStoreReviewHandler,deleteStoreReviewHandler,getAllStorefollowersHandler,getStorefollowersHandler,createStorefollowerHandler,deleteStorefollowerHandler, updateStorePictureHandler,
  deleteStorePictureHandler,getALLNumbersOFFollowersHandler} = require('../api/controllers/storesController')
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
// router.use(bearer);

// end point for parent category 

router.post('/add/PG',bearer,checkAdmin,upload.none(),addParentCategory);
router.delete('/remove/PG',bearer,upload.none(),checkAdmin,removeParentCategory);
router.put('/update/PG',bearer,upload.none(),checkAuth,updateParentCategory);
router.put('/update/PG/display',bearer,upload.none(),checkAuth,updateDisplayParentCategory);
router.get('/get/PG/:idPG',upload.none(),getParentCategoryById);
router.get('/getAll/PG',upload.none(),getAllParentCategory);
router.get('/search/title/PG/:title',upload.none(),getParentCategoryByTitle);


// endpoint for child category

router.post('/add/CG',bearer,upload.none(),checkAuth,addChildCategory);
router.delete('/remove/CG',upload.none(),bearer,checkAuth,removeChildCategory);
router.put('/update/CG',upload.none(),bearer,checkAuth,updateChildCategory);
router.get('/get/CG/:idCG',upload.none(),getChildCategoryById);
router.get('/getAll/CG',upload.none(),getAllChildCategory);
router.get('/search/title/CG',upload.none(),getChildCategoryByTitle);

// grand Child Category

router.post('/add/GCG',bearer,upload.none(),checkAuth,addGrandChildCategory);
router.delete('/remove/GCG',bearer,upload.none(),checkAuth,removeGrandChildCategory);
router.put('/update/GCG',bearer,upload.none(),checkAuth,updateGrandChildCategory);
router.get('/get/GCG/:idGCG',upload.none(),checkAuth,getGrandChildCategoryById);
router.get('/getAll/GCG',upload.none(),getAllGrandChildCategory);
router.get('/search/title/GCG',upload.none(),getGrandChildCategoryByTitle);

// address 

router.post('/add/address',bearer,upload.none(),addAddressHandler);
router.put('/remove/address',bearer,upload.none(),removeAddressHandler);
router.put('/update/address',bearer,upload.none(),updateAddressHandler);
router.get('/getAll/address',bearer,upload.none(),getAllAddressHandler);
router.get('/get/address',bearer,upload.none(),getAddressByProfileIdModelHandler);

// store 

router.post('/store',bearer, uploadS3.single('image'), createStoreHandler);
router.put('/store',bearer,checkStoreAuth,upload.none(),updateStoreHandler);
router.delete('/store',bearer,checkStoreAuth,upload.none(), deleteStoreHandler);
router.get('/store',bearer,upload.none(), getStoreHandler);
router.get('/store/name/:name', upload.none(),getStoreByNameHandler)
router.get('/store/all',upload.none(), getAllStoresHandler)
router.get('/store/status/:status',bearer,checkAuth, upload.none(),getStoreByStatusHandler)
router.put('/store/name',bearer,checkStoreAuth, upload.none(),updateStoreNameHandler);
router.put('/store/status',bearer,checkAuth, upload.none(),updateStoreStatusHandler);
router.put('/store/picture',bearer,checkStoreAuth,uploadS3.single('image'),updateStorePictureHandler);
router.delete('/store/picture',bearer,checkStoreAuth,upload.none(),deleteStorePictureHandler)


// product 

router.post('/product',bearer,checkStoreAuth, uploadS3.array('image'), addProductHandler)
router.get('/product',upload.none(), getAllProductHandler)
router.get('/product/store', bearer, checkStoreAuth, upload.none(), getStoreProductsHandler)
router.get('/product/:id',upload.none(), getProductHandler)
router.put('/product',bearer,checkStoreAuth,upload.none(), updateProductHandler)
router.put('/product/status',bearer,checkAuth,upload.none(), updateProductStatusHandler)
router.delete('/product',upload.none(), deleteProductHandler)
router.put('/product/picture', bearer, uploadS3.array('image'), updateProductPictureHandler )
router.delete('/product/picture',bearer,checkStoreAuth,upload.none(), deleteProductPictureHandler)

//tag
router.post('/tag',bearer,checkAuth,upload.none(),addTagHandler)
router.get('/tag/:id',bearer,upload.none(),getTagHandler)
router.delete('/tag',bearer,checkAuth,upload.none(),deleteTagHandler)
router.put('/tag',bearer,checkAuth, upload.none(),updateTagHandler)
router.get('/tag',upload.none(), getAllTagsHandler)

//product tag
router.post('/product/tag',bearer,checkStoreAuth,upload.none(),addProductTagHandler)
router.get('/product/tag/:id',upload.none(), getProductTagsHandler)
router.delete('/product/tag',bearer,checkStoreAuth,upload.none(), deleteProductTagHandler)

//cart & cart item

router.post('/add/cart_item',bearer,upload.none(),addCartItemHandler);
router.delete('/remove/cart_item',bearer,upload.none(),removeCartItemByCartIdHandler);
router.delete('/remove/cart_item/id',bearer,upload.none(),removeCartItemByIdHandler);
router.get('/getAll/cart_item',bearer,upload.none(),getAllCartItemHandler);
router.get('/getAll/cart',bearer,checkAuth,upload.none(),getAllCartHandler); 
router.put('/update/cart_item',bearer,upload.none(),updateCartItemQuantityHandler);
router.put('/update/cart',bearer,upload.none(),updateCartHandler);

// discount code 

router.post('/add/discount',bearer,upload.none(),checkAdmin,createDiscountCodeHandler);
router.put('/update/active',bearer,upload.none(),checkAdmin,updateActiveDiscountCodeHandler); // AND not active === delete
router.put('/update/discount',bearer,upload.none(),checkAdmin,updateDisconnectHandler);
// router.delete('/remove/discount',bearer,upload.none(),checkAdmin,removeDiscountHandler);
router.get('/getAll',bearer,upload.none(),checkAdmin,getAllDiscountHandlers);
router.get('/getAll/promo',bearer,upload.none(),checkAdmin,getAllPromoHandler);
router.get('/get/:id',bearer,upload.none(),getPromoHandler);

router.post('/checkCode',bearer,upload.none(),checkCodeHandler); // for people
// order 

router.post('/addOrder',bearer,upload.none(),addOrderHandler);
router.put('/update/order/status',bearer,checkAuth,upload.none(),updateOrderStatusHandler);
router.get('/getAll/order',bearer,checkAuth,upload.none(),getAllOrderHandler);
router.get('/getAll/order/profile_id',bearer,upload.none(),getAllOrderProfileIdHandler);
router.put('/update/order_item/cancel',bearer,checkStoreAuth,upload.none(),updateOrderItemStatusHandler);
//router.get('/getStoreOrder', bearer,getOrderByStoreIdHandler)
router.get('/getStoreOrder', bearer,getOrderByStoreIdHandlerTwo)

// store review 
router.post('/store/review',bearer,upload.none(),createStoreReviewHandler);
router.delete('/store/review',bearer,upload.none(), deleteStoreReviewHandler);
router.put('/store/review',bearer,upload.none(), updateStoreReviewHandler);
router.get('/store/review',bearer,upload.none(), getAllStoreReviewHandler);
router.get('/store/review/:store_id',bearer,upload.none(),getStoreReviewHandler);

// store follower 
router.post('/store/follower',bearer,upload.none(),createStorefollowerHandler);
router.delete('/store/follower',bearer,upload.none(),deleteStorefollowerHandler);
router.get('/store/follower',bearer,upload.none(), getAllStorefollowersHandler);
router.get('/store/follower/:store_id',bearer,upload.none(), getStorefollowersHandler);
router.get('/store/number/follower',bearer,upload.none(), getALLNumbersOFFollowersHandler);














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

router.get('/profile/picture',bearer, upload.none(),getProfilePictureByProfileIdHandler)
router.put('/profile/picture', uploadS3.single('image'), updateProfilePictureHandler)
router.delete('/profile/picture', upload.none(),deleteProfilePictureHandler)

router.post('/return', upload.none(), createReturnRequestHandler)
router.get('/return',upload.none(), getAllReturnRequestsHandler)
router.put('/return',upload.none(),updateReturnRequestStatusHandler)



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
