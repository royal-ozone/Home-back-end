const { getStoreProductsByStatus,addProduct, getAllProduct, getProduct, updateProduct, updateProductStatus, deleteProduct, updateProductDisplay, getStoreProducts,updateSizeAndQuantity,updateDiscount, getSearchData,getProductsByCategories, 
  productSearch } = require('../models/products');
const { deleteProductReviewByProductId } = require('../models/productReview')
const { deleteProductTagByProductId } = require('../models/productTag')
const { deleteProductRatingByProductId } = require('../models/productRating')
const {
  addProductPicture,
  getProductPicturesById,
  deleteProductPictureById,
  deleteProductPictureByProductId,
} = require('../models/productPicture');
const {getProductPictureByProductId} = require('../models/order')
const { deleteRemoteFile } = require('../middleware/uploader');
const { getStore } = require('../models/stores');


const productSearchHandler = async (req, res) => {
  try {
    const result = await productSearch(req.query)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPictureByProductId(product.id)
      product['pictures'] = pictures;
      
      return product;
    })
    res.send(await Promise.all(resultWithPics))
  } catch (error) {
    res.send({status: 403, message: error.message});
  }
}
const addProductHandler = async (req, res) => {
  try {
    let result = await addProduct({ store_id: req.user.store_id, ...req.body })
    let pictures = [];
    if (req.files) {
      pictures = await req.files.map(async (file) => {
        let pic = await addProductPicture({ product_id: result.id, product_picture: file.location })
        return pic
      })
    }
    if (result.id) {
      res.json({ message: 'product has been added successfully', status: 201, result:{...result, pictures: await Promise.all(pictures) }})
    } else {
      res.json({ message: result.message, status: 403 })
    }
  } catch (error) {
    res.send(error.message)
  }
};

const getAllProductHandler = async (req, res) => {
  try {
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 24;
    let result = await getAllProduct(offset, limit)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPicturesById(product.id)
      product['pictures'] = pictures;
      delete product.pictures.product_id
      return product;
    })
    res.json({ status:200,result: await Promise.all(resultWithPics) })
  } catch (error) {
    res.json({status:403,message:error.message})
  }
}

const getSearchDataHandler  = async (req, res) =>{
  try {
    let status = JSON.parse(req.params.status)
      let result =await getSearchData(status[0], status[1], req.user.store_id)
      if(result){
        return res.send({status: 200, data: result})
      }
      res.send({status: 403, message: result})
  } catch (error) {
    res.send(error.message)
  }
}

const getProductHandler = async (req, res, next) => {
  try {
    if (req.wishlist) {

      let wishlist = await req.wishlist.map(async item => {
        let result = await getProduct(item.product_id);
        let wishlistItem = item;
        wishlistItem['product'] = result
        let pictures = await getProductPicturesById(item.product_id)
        wishlistItem.product['pictures'] = await Promise.all(pictures);
        delete wishlistItem.product_id
        return wishlistItem
      })
      res.status(200).json(await Promise.all(wishlist))
    } else {
      let id = req.params.id;
      let result = await getProduct(id);
      let pictures = await getProductPicturesById(id)
      result['pictures'] = pictures;
      req.product = result;
      next();
    }
    // res.status(200).json(result);
  } catch (error) {
    res.send(error.message)
  }
}

const getStoreProductsHandler = async (req, res) => {
  try {
    let id = req.user.store_id;
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 24;
    let result = await getStoreProducts(id,limit,offset)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPicturesById(product.id)
      product['pictures'] = pictures;
      delete product.pictures.product_id
      return product;
    })
    if (result) {
      res.json({ status: 200, result: await Promise.all(resultWithPics) })
    } else {
      res.send({message:'something went wrong while fetching the data', status: 403})
    }
  } catch (error) {
    res.send(error.message)
  }
}

const getStoreProductsByStatusHandler = async (req, res) => {
  try {
    let id = req.user.store_id;
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 24;
    let {result,count} = await getStoreProductsByStatus(id,limit,offset,req.params.status)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPicturesById(product.id)
      product['pictures'] = pictures;
      delete product.pictures.product_id
      return product;
    })
    if (result) {
      res.json({ status: 200,count:Number(count), result: await Promise.all(resultWithPics) })
    } else {
      res.send({message:'something went wrong while fetching the data', status: 403})
    }
  } catch (error) {
    res.send(error.message)
  }
}

const getProductsByCategoriesHandler = async (req, res)=>{
  try {
    const result = await getProductsByCategories(req.query)
    let resultWithPics = await result.map(async (product) => {
      let pictures = await getProductPicturesById(product.id)
      let store = await getStore(product.store_id)
      product['pictures'] = pictures;
      product['store_name'] = store.store_name
      delete product.pictures.product_id
      return product;
    })
    res.json({status: 200, result: await Promise.all(resultWithPics)})
  } catch (error) {
    res.send(error.message)
  }
}

const updateProductHandler = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await getProduct(id)
    let result = await updateProduct({ ...data, ...req.body });
    if (result) {
      res.json({ message: 'product has been updated successfully', result, status: 200 });
    } else {
      res.send('something went wrong while updating the product')
    }
  } catch (error) {
    res.send(error.message)
  }
}

const updateSizeAndQuantityHandler = async (req, res) =>{
  try {
    let result = await updateSizeAndQuantity(req.body)
    if (result.id) {
      res.json({ message: 'product has been updated successfully', result, status: 200 });
    } else {
      res.send('something went wrong while updating the product')
    }
  } catch (error) {
    res.send(error.message)
  }
}

const updateDiscountHandler = async (req, res) => {
  try {
    let result = await updateDiscount(req.body)
    if (result.id) {
      res.json({ message: 'product has been updated successfully', result, status: 200 });
    } else {
      res.send('something went wrong while updating the product')
    }
  } catch (error) {
    res.send(error.message)
  }
}

const deleteProductHandler = async (req, res) => {
  try {
    let id = req.body.id;
    await deleteProductReviewByProductId(id);
    await deleteProductTagByProductId(id);
    await deleteProductRatingByProductId(id);
    let pictures = await getProductPicturesById(id)
    await pictures.map(async file => {
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

const updateProductStatusHandler = async (req, res) => {
  try {
    let result = await updateProductStatus(req.body);
    res.status(200).json({ message: 'product status updated successfully', result });
  } catch (error) {
    res.send(error.message)
  }
}

const updateProductPictureHandler = async (req, res) => {
  try {
    let result = await getProductPicturesById(req.body.product_id);
    let pictures = [];
    if (result.length >= 5 || (req.files.length + result.length) > 5) {
      res.send(`you currently have ${result.length} pictures, you can't add more than 5 pictures`)
    } else {
      pictures = await req.files.map(async (file) => {
        let pic = await addProductPicture({ product_id: req.body.product_id, product_picture: file.location })
        return pic
      })
      res.json({ message: 'pictures has been added successfully',status: 200, pictures: await Promise.all(pictures) })
    }
  } catch (error) {
    res.send(error.message)
  }
}

const addProductPictureHandler = async (req, res) => {
  try {
    let result = await addProductPicture({product_id: req.body.id, product_picture: req.file.location})
    if(result.id){
      res.send({message: 'product picture added successfully', status: 200, data: result})
    } else {
      res.send({message: result, status: 403})
    }
  } catch (error) {
    res.send(error.message)
  }
}

const deleteProductPictureHandler = async (req, res) => {
  try {
    let result = await deleteProductPictureById(req.body.picture_id);
    await deleteRemoteFile(result.product_picture)
    res.status(200).send('picture has been deleted successfully')
  } catch (error) {
    res.status(403).send(error.message)
  }
}

const decreaseSizeQuantity = async (req, res) => {
  try {
    const { id, SCId, quantity } = req.body
    let product = await getProduct(id);
    let newSize = product.size_and_color.map(val => {
      if (val['id'] === SCId) {
        return { ...val, quantity: val.quantity - Number(quantity) }
      }
      return val
    })

    let newProduct = { ...product, quantity: newSize.reduce((p, c) => p + c.quantity, 0), size_and_color: newSize }

    let result = await updateProduct(newProduct)
    res.json({
      status: 200,
      message: 'quantity has been decreased successfully',
      product: result,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

const increaseSizeQuantity = async (req, res) => {
  try {
    const { id, size, quantity } = req.body
    let product = await getProduct(id);
    let newSize = product.size.map(val => {
      if (val.size === size) {
        return { size: val.size, quantity: val.quantity + Number(quantity) }
      }
      return val
    })

    let newProduct = { ...product, quantity: newSize.reduce((p, c) => p + c.quantity, 0), size_and_color: newSize }

    let result = await updateProduct(newProduct)
    res.json({
      status: 200,
      message: 'quantity has been increased successfully',
      product: result,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { getStoreProductsByStatusHandler,addProductHandler, updateProductStatusHandler, deleteProductHandler, updateProductHandler, getProductHandler, getAllProductHandler, updateProductPictureHandler, deleteProductPictureHandler, getStoreProductsHandler, increaseSizeQuantity, decreaseSizeQuantity,addProductPictureHandler,updateSizeAndQuantityHandler,updateDiscountHandler, getSearchDataHandler,getProductsByCategoriesHandler,productSearchHandler }