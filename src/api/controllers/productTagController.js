const {deleteProductTag, updateProductTag,getProductTags,addProductTag} = require('../models/productTag');

const addProductTagHandler = async (req, res, next) => {
    try {
        let result = await addProductTag(req.body)
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getProductTagsHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await getProductTags(id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProductTagHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await deleteProductTag(id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProductTagsHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await updateProductTags(id, req.body);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }

}


module.exports = {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler,updateProductTagsHandler}