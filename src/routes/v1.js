'use strict';



const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');


const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');


const {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler} = require('../api/controllers/addressControllers')
const {addCartHandler,addCartItemHandler,removeCartItemHandler,getAllCartItemHandler,getAllCartHandler} = require('../api/controllers/cartControllers');
const {addOrderHandler,addOrderItemHandler,updateOrderStatusHandler,getAllOrderHandler} = require('../api/controllers/orderControllers');




const {checkAdmin,checkMod,checkAuth,checkStoreAuth,checkBan, checkActive} = require ('../auth/middleware/acl')

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
  checkCodeHandler
} = require('../api/controllers/discountCodeControllers')

const {createCourierCompanyHandler,updateCourierCompanyStatusHandler,updateCourierCompanyNameHandler,getAllCourierCompaniesHandler, getCourierCompanyByCompanyIdHandler} = require('../api/controllers/courierCompanyController');

const {createCourierHandler,updateCourierStatusHandler,deleteCourierHandler,getAllCouriersHandler,getCourierByIdHandler} = require('../api/controllers/courierController')

const {addCourierTaskHandler,getAllCourierTasksHandler,getCourierTaskByIdHandler,updateCourierTaskStatusHandler,updateCourierTaskCourierIdHandler} = require('../api/controllers/courierTaskController');

const {addDeliveryTaskHandler,getAllDeliveryTasksHandler,updateDeliveryTaskCompanyIdHandler,updateDeliveryTaskCourierIdHandler,getDeliveryTaskByIdHandler} = require('../api/controllers/deliveryTaskController');





// Global middleware
router.use(bearer);

router.post('/store',uploadS3.single('image'), createStoreHandler);
router.put('/store',checkStoreAuth,updateStoreHandler);
router.delete('/store',checkStoreAuth, deleteStoreHandler);
router.get('/store', getStoreHandler);
router.put('/store/name',checkStoreAuth, updateStoreNameHandler);
router.put('/store/status',checkAuth, updateStoreStatusHandler);
router.get('/store/all', getAllStoresHandler)
router.get('/store/status/:status',checkAuth, getStoreByStatusHandler)
router.get('/store/name/:name', getStoreByNameHandler)

router.put('/store/picture',uploadS3.single('image'), updateStorePictureHandler);
router.delete('/store/picture', deleteStorePictureHandler)

router.get('/store/review', getAllStoreReviewHandler)
router.get('/store/review/:storeId', getStoreReviewHandler)
router.post('/store/review',createStoreReviewHandler)
router.put('/store/review/:storeId', updateStoreReviewHandler)
router.delete('/store/review/:storeId', deleteStoreReviewHandler)

router.get('/store/follower', getAllStorefollowersHandler)
router.get('/store/follower/:storeId', getStorefollowersHandler)
router.post('/store/follower',createStorefollowerHandler)
router.delete('/store/follower/:storeId', deleteStorefollowerHandler)

router.post('/add/PG',bearer,checkAdmin,addParentCategory);
router.delete('/remove/PG/:idPG',bearer,checkAdmin,removeParentCategory);
router.put('/update/PG/:idPG',bearer,checkAuth,updateParentCategory);
router.get('/get/PG/:idPG',bearer,checkAuth,getParentCategoryById);
router.get('/getAll/PG',bearer,getAllParentCategory);
router.get('/search/title/PG',bearer,getParentCategoryByTitle);


router.post('/add/CG',bearer,checkAuth,addChildCategory);
router.delete('/remove/CG/:idCG',bearer,checkAuth,removeChildCategory);
router.put('/update/CG/:idCG',bearer,checkAuth,updateChildCategory);
router.get('/get/CG/:idCG',bearer,checkAuth,getChildCategoryById);
router.get('/getAll/CG',bearer,getAllChildCategory);
router.get('/search/title/CG',bearer,getChildCategoryByTitle);


router.post('/add/GCG',bearer,checkAuth,addGrandChildCategory);
router.delete('/remove/GCG/:idGCG',bearer,checkAuth,removeGrandChildCategory);
router.put('/update/GCG/:idGCG',bearer,checkAuth,updateGrandChildCategory);
router.get('/get/GCG/:idGCG',bearer,checkAuth,getGrandChildCategoryById);
router.get('/getAll/GCG',bearer,getAllGrandChildCategory);
router.get('/search/title/GCG',bearer,getGrandChildCategoryByTitle);



router.post('/add/address',bearer,addAddressHandler);
router.delete('/remove/address/:id',bearer,removeAddressHandler);
router.put('/update/address/:id',bearer,updateAddressHandler);
router.get('/getAll/address',bearer,getAllAddressHandler);

router.post('/add/cart',bearer,addCartHandler);
router.post('/add/cart_item',bearer,addCartItemHandler);
router.delete('/remove/cart_item',bearer,removeCartItemHandler);
router.get('/getAll/cart_item',bearer,getAllCartItemHandler);
router.get('/getAll/cart',bearer,getAllCartHandler); 

router.post('/add/order',bearer,addOrderHandler);
router.post('/add/order_item',bearer,addOrderItemHandler);
router.put('/update/status/:id',bearer,updateOrderStatusHandler);
router.get('/getAll/order',bearer,getAllOrderHandler);



router.post('/tag',addTagHandler)
router.get('/tag/:id',getTagHandler)
router.delete('/tag/:id',deleteTagHandler)
router.put('/tag/:id', updateTagHandler)
router.get('/tag', getAllTagsHandler)

router.post('/product', uploadS3.array('image'), addProductHandler)
router.get('/product', getAllProductHandler)
router.get('/product/:id', getProductHandler)
router.put('/product/:id', updateProductHandler)
router.put('/product/status/:id', updateProductStatusHandler)
router.delete('/product/:id', deleteProductHandler)

router.post('/product/tag',addProductTagHandler)
router.get('/product/tag/:id', getProductTagsHandler)
router.delete('/product/tag/:id', deleteProductTagHandler)
router.put('/product/tag/:id', updateProductTagsHandler)

router.post('/product/review',addProductReviewHandler)
router.get('/product/review/:id', getProductReviewHandler)
router.delete('/product/review/:id', deleteProductReviewHandler)
router.put('/product/review/:id', updateProductReviewHandler)

router.post('/product/rating',addProductRatingHandler)
router.get('/product/rating/:id', getProductRatingHandler)
router.delete('/product/rating/:id', deleteProductRatingHandler)
router.put('/product/rating/:id', updateProductRatingHandler)

router.post('/order/notification', addOrderNotificationHandler)
router.get('/order/notification/:id', getOrderNotificationHandler)
router.get('/order/notifications', getOrderNotificationByStoreIdHandler)

router.post('/offer/notification', addOfferNotificationHandler)
router.get('/offer/notification', getAllOfferNotificationsHandler)
router.get('/offer/notification/store', getOfferNotificationByStoreIdHandler)

router.post('/upload',uploadS3.array('file') ,uploadHandler)

router.get('/profile/picture', getProfilePictureByProfileIdHandler)
router.put('/profile/picture', uploadS3.single('image'), updateProfilePictureHandler)
router.delete('/profile/picture', deleteProfilePictureHandler)

router.post('/return',  createReturnRequestHandler)
router.get('/return', getAllReturnRequestsHandler)
router.put('/return', updateReturnRequestStatusHandler)

router.post('/add/discount',bearer,checkAdmin,createDiscountCodeHandler);
router.put('/update/active/:id',bearer,checkAdmin,updateActiveDiscountCodeHandler);
router.put('/update/:id',bearer,checkAdmin,updateDisconnectHandler);
router.delete('/remove/:id',bearer,checkAdmin,removeDiscountHandler);
router.get('/getAll',bearer,checkAdmin,getAllDiscountHandlers);
router.post('/checkCode',bearer,checkCodeHandler);

router.post('/courierCompany', createCourierCompanyHandler);
router.get('/courierCompanies', getAllCourierCompaniesHandler)
router.get('/courierCompany', getCourierCompanyByCompanyIdHandler)
router.put('/courierCompany/name', updateCourierCompanyNameHandler)
router.put('/courierCompany/status/:id', updateCourierCompanyStatusHandler)

router.post('/courier', createCourierHandler)
router.put('/courier', updateCourierStatusHandler) 
router.delete('/courier', deleteCourierHandler)
router.get('/couriers', getAllCouriersHandler)
router.get('/courier', getCourierByIdHandler)

router.post('/courierTask', addCourierTaskHandler)
router.get('/courierTasks', getAllCourierTasksHandler)
router.get('/courierTask', getCourierTaskByIdHandler)
router.put('/courierTask/status', updateCourierTaskStatusHandler)
router.put('/courierTask/courierId', updateCourierTaskCourierIdHandler)

router.post('/deliveryTask', addDeliveryTaskHandler)
router.get('/deliveryTasks', getAllDeliveryTasksHandler)
router.put('/deliveryTask/companyId', updateDeliveryTaskCompanyIdHandler)
router.put('/deliveryTask/courierId', updateDeliveryTaskCourierIdHandler)
router.get('/deliveryTask/:id', getDeliveryTaskByIdHandler)


// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});


module.exports = router;
