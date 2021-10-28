'use strict';

const express = require('express');
const router = express.Router();
const bearer = require('../auth/middleware/bearer');
const {checkAdmin,checkMod,checkAuth,checkBan} = require ('../auth/middleware/acl')
const {addParentCategory,removeParentCategory,updateParentCategory,getParentCategoryById,getAllParentCategory,getParentCategoryByTitle} = require('../api/controllers/parentCategory');
const {addChildCategory,removeChildCategory,updateChildCategory,getChildCategoryById,getAllChildCategory,getChildCategoryByTitle} = require('../api/controllers/childCategory');
const {addGrandChildCategory,removeGrandChildCategory,updateGrandChildCategory,getGrandChildCategoryById,getAllGrandChildCategory,getGrandChildCategoryByTitle}= require('../api/controllers/grandChildCategory');



// Global middleware
// router.use(bearer);

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



// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
