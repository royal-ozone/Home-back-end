const {deleteProductTag, updateProductTag,getProductTags,addProductTag} = require('../models/productTag');

const addProductTagHandler = async (req, res) => {
    try {
        let result = await addProductTag(req.body)
        if (result) {
            res.status(201).json({message:'product tag has been added',...result})
        } else {
            res.status(403).send('something went wrong while adding product tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getProductTagsHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getProductTags(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(403).send('something went wrong while getting product tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const deleteProductTagHandler = async (req, res) => {
    try {
        let id = req.body.id;
        let result = await deleteProductTag(id);
        if (result) {
            res.status(200).json({message:'product tag has been deleted',...result});
        } else {
            res.status(403).send('something went wrong while deleting product tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}



module.exports = {addProductTagHandler,getProductTagsHandler,deleteProductTagHandler}