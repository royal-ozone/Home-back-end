const {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct} = require('../models/products');
const {deleteProductReviewByProductId} = require('../models/productReview')
const {deleteProductTagByProductId} = require('../models/productTag')
const {deleteProductRatingByProductId} = require('../models/productRating')
const {
  addProductPicture,
  getProductPicturesById,
  deleteProductPictureById,
  deleteProductPictureByProductId
} = require('../models/productPicture');

const { deleteRemoteFile} = require('../middleware/uploader');



const addProductHandler = async(req, res) => {
    try {
        let result = await addProduct({store_id: req.user.store_id,...req.body})
        let pictures =[];
        if(req.files){
           pictures = await req.files.map(async (file) => {
            let pic = await addProductPicture({product_id:result.id, product_picture:file.location})
           return pic 
          })
        }
        res.status(201).json({result, pictures: await Promise.all(pictures)})
    } catch (error) {
      res.send(error.message)
    }
};

const getAllProductHandler = async(req, res) => {
    try {
        let result = await getAllProduct()
        let resultWithPics = await result.map(async (product) => {
          let pictures = await getProductPicturesById(product.id)
          product['pictures'] = pictures;
          delete product.pictures.product_id
          return product;
        })
        res.status(200).json({result: await Promise.all(resultWithPics)})
    } catch (error) {
      res.send(error.message)
    }
}

const getProductHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await getProduct(id);
        let pictures = await getProductPicturesById(id)
        result['pictures']= pictures;
        res.status(200).json(result);
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await updateProduct(id, {store_id: req.user.store_id,...req.body});
        res.status(200).json({message:'product has been updated successfully' ,result});
    } catch (error) {
      res.send(error.message)
    }
}

const deleteProductHandler = async(req, res) => {
    try {
        let id = req.params.id;
        await deleteProductReviewByProductId(id);
        await deleteProductTagByProductId(id);
        await deleteProductRatingByProductId(id);
        let pictures = await getProductPicturesById(id)
       await pictures.map(async file =>{
         await deleteRemoteFile(file.product_picture)
          
        })
        await deleteProductPictureByProductId(id);
        let result = await deleteProduct(id);
        res.status(200).send('product successfully deleted');
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductStatusHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await updateProductStatus(id, req.body);
        res.status(200).json({message: 'product status updated successfully',result});
    } catch (error) {
      res.send(error.message)
    }
}

module.exports = {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler}