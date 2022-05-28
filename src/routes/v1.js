'use strict';



const express = require('express');
const router = express.Router();
const basic = require('../auth/middleware/basic')
const bearer = require('../auth/middleware/bearer');
const multer = require('multer');
let upload = multer()


const {addParentCategory,
  removeParentCategory,
  updateParentCategory,
  getParentCategoryById,
  getAllParentCategory,
  getParentCategoryByTitle,
  updateDisplayParentCategory,
  getAllItems,
  getGrandItems,
} = require('../api/controllers/parentCategory');

const {addChildCategory,
  removeChildCategory,
  updateChildCategory,
  getChildCategoryById,
  getAllChildCategory,
  getChildCategoryByTitle
} = require('../api/controllers/childCategory');

const {addGrandChildCategory,
  removeGrandChildCategory,
  updateGrandChildCategory,
  getGrandChildCategoryById,
  getAllGrandChildCategory,
  getGrandChildCategoryByTitle
}= require('../api/controllers/grandChildCategory');


const {addAddressHandler,
  removeAddressHandler,
  updateAddressHandler,
  getAllAddressHandler,
  getAddressByProfileIdModelHandler,
  getAddressByIdHandler,getStoreAddressHandler
} = require('../api/controllers/addressControllers');

const {addCartItemHandler
  ,removeCartItemByCartIdHandler
  ,getAllCartItemHandler
  ,getAllCartHandler
  ,updateCartHandler
  ,updateCartItemQuantityHandler
  ,removeCartItemByIdHandler
} = require('../api/controllers/cartControllers');

const {addOrderHandler,
  getOrderByStoreIdHandler,
  getOrderByStoreIdHandlerTwo,
  updateOrderStatusHandler,
  getAllOrderHandler,
  getAllOrderProfileIdHandler,
  updateOrderItemStatusHandler,
  getSellerOrdersByPendingStatus,
  getSellerOrdersByNotPendingStatus
} = require('../api/controllers/orderControllers');

const {checkAdmin,
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
    } = require ('../auth/middleware/acl');

const {addProductHandler,
   updateProductStatusHandler,
   deleteProductHandler,
   updateProductHandler,
   getProductHandler,
   getAllProductHandler,
   updateProductPictureHandler,
   deleteProductPictureHandler,
   getStoreProductsHandler,
   getStoreProductsByStatusHandler,
   addProductPictureHandler
   ,updateSizeAndQuantityHandler,updateDiscountHandler, getSearchDataHandler,getProductsByCategoriesHandler
  } = require('../api/controllers/productControllers');

const {addTagHandler,
  updateTagHandler, 
  deleteTagHandler,
   getAllTagsHandler,
   getTagHandler
  } = require('../api/controllers/tagController');

const {addProductTagHandler,
  getProductTagsHandler,
  deleteProductTagHandler,
  updateProductTagsHandler
} = require('../api/controllers/productTagController');

const {addProductReviewHandler,
  getProductReviewHandler,
  deleteProductReviewHandler,
  updateProductReviewHandler
} = require('../api/controllers/productReviewController');

const {addProductRatingHandler,
   getProductRatingHandler,
    deleteProductRatingHandler,
     updateProductRatingHandler
    } = require('../api/controllers/productRating');


const {addOrderNotificationHandler,
  getOrderNotificationHandler,
  getOrderNotificationByStoreIdHandler
} = require('../api/controllers/orderNotificationController');

const {addOfferNotificationHandler,
  getOfferNotificationByStoreIdHandler,
  getAllOfferNotificationsHandler
} = require('../api/controllers/offerNotificationController')

const  {createStoreHandler,
  getStoreHandler,
  deleteStoreHandler,
  updateStoreHandler,
  updateStoreNameHandler,
  getAllStoresHandler,
  getStoreByStatusHandler,
  updateStoreStatusHandler,
  getStoreByNameHandler,
  getAllStoreReviewHandler,
  getStoreReviewHandler,
  createStoreReviewHandler,
  updateStoreReviewHandler,
  deleteStoreReviewHandler,
  getAllStorefollowersHandler,
  getStorefollowersHandler,
  createStorefollowerHandler,
  deleteStorefollowerHandler,
   updateStorePictureHandler,
  deleteStorePictureHandler,
  getALLNumbersOFFollowersHandler,
  addStoreReview2,
  getAllStoreReview2Handler,
  getStoreReview2Handler,
  updateVerificationCodeHandler,
    checkVerificationCodeHandler
} = require('../api/controllers/storesController');

const {uploadS3} = require('../api/middleware/uploader');

const {uploadHandler} = require('../api/controllers/uploadController');

const {updateProfilePictureHandler,
   deleteProfilePictureHandler,
    getProfilePictureByProfileIdHandler
  } = require('../api/controllers/profilePictureHandler')

const {
  createReturnRequestHandler,
  getAllReturnRequestsHandler,
  updateReturnRequestStatusHandler,
  getReturnOrderByIdHandler
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
  getSuggestionsByStatusHandler,
  getMySuggestionByIdHandler
} = require ('../api/controllers/suggestionControllers')

const {
  addCourierFeedback,
  removeCourierFeedback,
  updateCourierFeedback,
  getCourierFeedback,
  getAllCouriersFeedback,
} = require ('../api/controllers/courierFeedbackControllers')

const payment = require('../api/controllers/paymentGateWay')


const {createCourierCompanyHandler,
  updateCourierCompanyStatusHandler,
  updateCourierCompanyNameHandler,
  getAllCourierCompaniesHandler,
   getCourierCompanyByCompanyIdHandler
  } = require('../api/controllers/courierCompanyController');

const {createCourierHandler,
  updateCourierStatusHandler,
  deleteCourierHandler,
  getAllCouriersHandler,
  getCourierByIdHandler,
  getCouriersByCompanyIdHandler
} = require('../api/controllers/courierController')

const {addCourierTaskHandler,
  getAllCourierTasksHandler,
  getCourierTaskByIdHandler,
  updateCourierTaskStatusHandler,
  updateCourierTaskCourierIdHandler
} = require('../api/controllers/courierTaskController');

const {addDeliveryTaskHandler,
  getAllDeliveryTasksHandler,
  updateDeliveryTaskCompanyIdHandler,
  updateDeliveryTaskCourierIdHandler,
  getDeliveryTaskByIdHandler
} = require('../api/controllers/deliveryTaskController');

const {addDeliveryTaskNotificationHandler, 
   getDeliveryTaskNotificationByIdHandler,
   updateDeliveryTaskHandler
} = require('../api/controllers/deliveryTaskNotificationController')

const {addOfferHandler,
  displayOfferHandler,
  updateOfferHandler,
  updateStatusOfferHandler,
  getOfferByStoreIdHandler,
  getAllOfferHandler,
  getALLOfferStatusHandler,
  getALLOfferDisplayHandler
}= require('../api/controllers/offerControllers');

const {addItemToWishListHandler, getWishListItemsHandler, deleteFromWishListHandler} = require('../api/controllers/wishlistController')
const {signInHandler} = require('../auth/controllers/authController')
const sendSMS = require('../api/middleware/infobip')
const sendEmail = require('../api/middleware/sendEmail')

 
// Global middleware
// router.use(bearer);

// all category
//router.get('/getAll/items',getAllItems,getGrandItems);

// end point for parent category 
router.post('/payment', payment)
router.post('/sendSMS', sendSMS)
router.post('/sendEmail', sendEmail)
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
router.get('/address/store',bearer,upload.none(),getStoreAddressHandler)

// store 

const email = (req, res, next) => {
if(req.body.email) {
    req= req
    req.user= {}
    req.user.profile_id = null
    next()
  } else{
    res.send('email is not provided')
  }

} 
router.post('/store/signin', upload.none(), basic, checkStoreAuth, signInHandler )
router.post('/store', bearer, uploadS3.single('image'), createStoreHandler,addStoreReview2);
router.post('/store/email', uploadS3.single('image'),email, createStoreHandler,addStoreReview2,sendEmail);
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
router.post('/store/verifyEmail', upload.none(), checkVerificationCodeHandler)
router.post('/store/updateCode', upload.none(), updateVerificationCodeHandler, sendEmail)


// product 

router.post('/product',bearer,checkStoreAuth,checkStoreStatus, uploadS3.array('image'), addProductHandler)
router.get('/products',upload.none(), getAllProductHandler)
router.get('/product/store', bearer, checkStoreAuth, upload.none(), getStoreProductsHandler)
router.get('/product/store/:status', bearer, checkStoreAuth, upload.none(), getStoreProductsByStatusHandler)
router.get('/product/:id',upload.none(), getProductHandler, getParentCategoryById,getChildCategoryById,getGrandChildCategoryById)
router.put('/product',bearer,checkStoreAuth,upload.none(), updateProductHandler)
router.put('/product/status',bearer,checkAuth,upload.none(), updateProductStatusHandler)
router.delete('/product',upload.none(), deleteProductHandler)
router.put('/product/picture', bearer, uploadS3.array('image'), updateProductPictureHandler )
router.delete('/product/picture',bearer,checkStoreAuth,upload.none(), deleteProductPictureHandler)
router.post('/product/picture', bearer, uploadS3.single('image'), addProductPictureHandler)
router.put('/product/quantityandsize', bearer, upload.none(), updateSizeAndQuantityHandler)
router.put('/product/discount', bearer,upload.none(), updateDiscountHandler)
router.get('/product/searchData/:status', bearer,upload.none(), checkStoreAuth, getSearchDataHandler)
router.get('/productsByCategories', upload.none(), getProductsByCategoriesHandler)

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
router.put('/update/order/status',bearer,checkStoreAuth,upload.none(),updateOrderStatusHandler);
router.get('/getAll/order',bearer,checkAuth,upload.none(),getAllOrderHandler,getAddressByIdHandler);
router.get('/getAll/order/profile_id',bearer,upload.none(),getAllOrderProfileIdHandler,getAddressByIdHandler);
router.put('/update/order_item',bearer,checkStoreAuth,upload.none(),updateOrderItemStatusHandler);
//router.get('/getStoreOrder', bearer,getOrderByStoreIdHandler)
router.get('/getStoreOrder', bearer,getOrderByStoreIdHandlerTwo)
router.get('/order/pending', bearer, upload.none(), getSellerOrdersByPendingStatus)
router.get('/order/notPending',bearer,upload.none(), getSellerOrdersByNotPendingStatus )

// store review 
router.post('/store/review',bearer,upload.none(),createStoreReviewHandler);
router.delete('/store/review',bearer,upload.none(), deleteStoreReviewHandler);
router.put('/store/review',bearer,upload.none(), updateStoreReviewHandler);
router.get('/store/review',bearer,upload.none(), getAllStoreReviewHandler);
router.get('/store/review/:store_id',bearer,upload.none(),getStoreReviewHandler);

// store review2
router.get('/store/review2/:store_id',bearer,checkStoreAuth,upload.none(),getStoreReview2Handler);
router.get('/store/review2/all',upload.none(),getAllStoreReview2Handler);


// store follower 
router.post('/store/follower',bearer,upload.none(),createStorefollowerHandler);
router.delete('/store/follower',bearer,upload.none(),deleteStorefollowerHandler);
router.get('/store/follower',bearer,upload.none(), getAllStorefollowersHandler);
router.get('/store/follower/:store_id',bearer,upload.none(), getStorefollowersHandler);
router.get('/store/number/follower',bearer,upload.none(), getALLNumbersOFFollowersHandler);




// product review 
router.post('/product/review',bearer,upload.none(),productComment,addProductReviewHandler)
router.get('/product/review/:id',upload.none(), getProductReviewHandler)
router.delete('/product/review',bearer,upload.none(), deleteProductReviewHandler)
router.put('/product/review',upload.none(), updateProductReviewHandler)

// product rating
router.get('/product/rating/:id',upload.none(), getProductRatingHandler)



// order notification 

// router.post('/order/notification', upload.none(),addOrderNotificationHandler) we added in update order status
router.get('/getAll/order/notification',bearer,checkAuth, upload.none(),getOrderNotificationHandler)
router.get('/order/notifications/:store_id',bearer,checkStoreAuth, upload.none(),getOrderNotificationByStoreIdHandler)

//  offer 

router.post('/offer',bearer,upload.none(),checkAuth,addOfferHandler);
router.put('/offer/display',bearer,upload.none(),checkAuth,displayOfferHandler);
router.put('/offer',bearer,upload.none(),checkAuth,updateOfferHandler);
router.put('/offer/status',bearer,upload.none(),checkAuth,updateStatusOfferHandler);
router.get('/offer/:store_id',bearer,upload.none(),checkStoreAuth,getOfferByStoreIdHandler);
router.get('/getAllOffer',upload.none(),getAllOfferHandler);
router.get('/offer/status/get',bearer,upload.none(),checkAuth,getALLOfferStatusHandler);
router.get('/offer/display/get',bearer,upload.none(),checkAuth,getALLOfferDisplayHandler);

// offer Notification

// router.post('/offer/notification',upload.none(), addOfferNotificationHandler) added when update 
router.get('/offer/notification/getAll',bearer, upload.none(),getAllOfferNotificationsHandler)
router.get('/offer/notification/:id',bearer,upload.none(), getOfferNotificationByStoreIdHandler)

router.post('/upload',uploadS3.array('file') ,uploadHandler)

router.get('/profile/picture',bearer, upload.none(),getProfilePictureByProfileIdHandler)
router.put('/profile/picture', bearer, uploadS3.single('image'), updateProfilePictureHandler)
router.delete('/profile/picture',bearer, upload.none(),deleteProfilePictureHandler)

router.post('/return',bearer, upload.none(),checkOrderStatusForReturn, createReturnRequestHandler)
router.get('/return',bearer,upload.none(), getAllReturnRequestsHandler)
router.get('/returnByProfileId', bearer, upload.none(),getReturnOrderByIdHandler)
router.get('/returnById/:id', bearer, upload.none(),getReturnOrderByIdHandler)
router.put('/return',bearer,upload.none(),checkStoreAuth,updateReturnRequestStatusHandler)



router.get('/getSuggestions/:status', bearer, checkAuth, getSuggestionsByStatusHandler);
router.post('/add/suggestion',bearer,upload.none(),addSuggestionHandler);
router.delete('/removeSuggestion',bearer,upload.none(),removeSuggestionHandler);
router.put('/update/suggestion',bearer,upload.none(),updateSuggestionHandler);
router.get('/getAll/suggestion',bearer,upload.none(),checkAdmin,getAllSuggestionHandler);
router.get('/getMySuggestions',bearer,upload.none(),getMySuggestionHandler);
router.put('/update/suggestion/status',bearer,upload.none(),checkAdmin,updateStatusSuggestionHandler);
router.get('/getSuggestionById/:id', bearer, getMySuggestionByIdHandler)

router.post('/courierCompany/signin',basic,upload.none(), checkCourierCompany, signInHandler);
router.post('/courierCompany',bearer,upload.none(), createCourierCompanyHandler);
router.get('/courierCompanies', bearer,upload.none(),checkAuth,getAllCourierCompaniesHandler)
router.get('/courierCompany',bearer,upload.none(), getCourierCompanyByCompanyIdHandler)
router.put('/courierCompany/name',bearer,upload.none(), updateCourierCompanyNameHandler)
router.put('/courierCompany/status',bearer,upload.none(),checkAuth, updateCourierCompanyStatusHandler)

router.post('/courier',bearer,upload.none(),checkCourierCompany, createCourierHandler)
router.put('/courier',bearer,upload.none(),checkCourier, updateCourierStatusHandler) 
router.delete('/courier',bearer,upload.none(),checkCourierCompany, deleteCourierHandler)
router.get('/couriers',bearer,upload.none(), checkAuth,getAllCouriersHandler)
router.get('/courier',bearer,upload.none(), checkCourierCompany,getCourierByIdHandler)
router.get('/companyCouriers',bearer,upload.none(), checkCourierCompany,getCouriersByCompanyIdHandler)
router.get('/courier/:id',bearer,upload.none(), checkCourierCompany,getCourierByIdHandler)

router.post('/courierTask',bearer,upload.none(), addCourierTaskHandler)
router.get('/courierTasks', bearer,upload.none(),checkAuth,getAllCourierTasksHandler)
router.get('/courierTask',bearer,upload.none(),checkCourier, getCourierTaskByIdHandler)
router.put('/courierTask/status',bearer,upload.none(),checkCourier, updateCourierTaskStatusHandler)
router.put('/courierTask/courierId',bearer,upload.none(),checkCourierCompany, updateCourierTaskCourierIdHandler)

router.post('/deliveryTask',bearer,upload.none() ,addDeliveryTaskHandler)
router.get('/deliveryTasks',bearer,upload.none(),checkCourierCompanyStatus, getAllDeliveryTasksHandler)
router.put('/deliveryTask/companyId',bearer,upload.none(), updateDeliveryTaskCompanyIdHandler)
router.put('/deliveryTask/courierId',bearer,upload.none(), updateDeliveryTaskCourierIdHandler, addCourierTaskHandler)
router.get('/deliveryTask',bearer,upload.none(), getDeliveryTaskByIdHandler)

router.post('/deliveryTask/notification',bearer,upload.none(), addDeliveryTaskNotificationHandler)
router.get('/deliveryTask/notification',bearer,upload.none(),getDeliveryTaskNotificationByIdHandler)
router.put('/deliveryTask/notification',bearer,upload.none(), updateDeliveryTaskHandler)

router.post('/add/courier/feedback',bearer,upload.none(),addCourierFeedback);
router.delete('/remove/courier/feedback/:id',bearer,upload.none(),removeCourierFeedback);
router.put('/update/courier/feedback/:id',bearer,upload.none(),updateCourierFeedback);
router.get('/get/courier/feedback/:id',bearer,upload.none(),getCourierFeedback);
router.get('/getAll/courier/feedback',bearer,upload.none(),getAllCouriersFeedback);

router.post('/addWishlistItem', bearer,upload.none(), addItemToWishListHandler);
router.get('/getWishlistItems', bearer,upload.none(), getWishListItemsHandler,getProductHandler )
router.delete('/deleteWishlistItem', bearer,upload.none(), deleteFromWishListHandler)
// Test route
router.get('/test', (req, res) => {
  res.send('working well');
});


module.exports = router;
