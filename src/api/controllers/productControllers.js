const {addProduct,getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct,updateProductDisplay,getStoreProducts} = require('../models/products');
const {deleteProductReviewByProductId} = require('../models/productReview')
const {deleteProductTagByProductId} = require('../models/productTag')
const {deleteProductRatingByProductId} = require('../models/productRating')
const {
  addProductPicture,
  getProductPicturesById,
  deleteProductPictureById,
  deleteProductPictureByProductId,
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

const getStoreProductsHandler = async(req, res) => {
  try {
    let id = req.user.store_id;
    let result = await getStoreProducts(id)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPicturesById(product.id)
      product['pictures'] = pictures;
      delete product.pictures.product_id
      return product;
    })
    if(result){
      res.status(200).json({result: await Promise.all(resultWithPics)})
    } else {
      res.status(403).send('something went wrong while fetching the data')
    }
  } catch (error) {
    res.send(error.message)
  }
}

const updateProductHandler = async(req, res) => {
    try {
        let id = req.body.id;
        let data = await getProduct(id)
        let result = await updateProduct(id, {...data,...req.body});
        if(result){
          res.status(200).json({message:'product has been updated successfully' ,result});
        } else {
          res.status(403).send('something went wrong while updating the product')
        }
    } catch (error) {
      res.send(error.message)
    }
}

const deleteProductHandler = async(req, res) => {
    try {
        let id = req.body.id;
        await deleteProductReviewByProductId(id);
        await deleteProductTagByProductId(id);
        await deleteProductRatingByProductId(id);
        let pictures = await getProductPicturesById(id)
       await pictures.map(async file =>{
         await deleteRemoteFile(file.product_picture)
          
        })
        await deleteProductPictureByProductId(id);
        try {
          let result = await deleteProduct(id);
          res.status(200).send('product was successfully deleted');
        } catch (error) {
          updateProductDisplay(id),
          res.status(200).send('product successfully deleted');
        }
      
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductStatusHandler = async(req, res) => {
    try {
        let result = await updateProductStatus(req.body);
        res.status(200).json({message: 'product status updated successfully',result});
    } catch (error) {
      res.send(error.message)
    }
}

const updateProductPictureHandler = async(req, res) => {
  try {
      let result = await getProductPicturesById(req.body.product_id);
      let pictures =[];
      if(result.length >= 5 || (req.files.length + result.length) > 5) {
        res.status(403).send(`you currently have ${result.length} pictures, you can't add more than 5 pictures`)
      } else{
        pictures = await req.files.map(async (file) => {
          let pic = await addProductPicture({product_id:req.body.product_id, product_picture:file.location})
         return pic 
        })
        res.status(200).json({message: 'pictures has been added successfully', pictures:await Promise.all(pictures)})
      }
  } catch (error) {
    res.send(error.message)
  }
}

const deleteProductPictureHandler = async(req, res) => {
  try {
      let result=await deleteProductPictureById(req.body.picture_id);
      await deleteRemoteFile(result.product_picture)
      res.status(200).send('picture has been deleted successfully')
  } catch (error) {
    res.status(403).send(error.message)
  }
}

module.exports = {addProductHandler, updateProductStatusHandler,deleteProductHandler,updateProductHandler,getProductHandler,getAllProductHandler,updateProductPictureHandler,deleteProductPictureHandler,getStoreProductsHandler}