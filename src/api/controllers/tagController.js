const {addTag, deleteTag, updateTag, getTag,getAllTags} = require('../models/tag')

const addTagHandler = async(req, res) => {
    try {
        let result = await addTag(req.body)
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteTagHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await deleteTag(id)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getTagHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await getTag(id)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateTagHandler = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await updateTag(id, req.body)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllTagsHandler = async(req, res) => {
try {
    let result = await getAllTags()
    res.status(200).json(result)
} catch (error) {
    throw new Error(error.message)
}

}


module.exports ={ addTagHandler,updateTagHandler, deleteTagHandler, getAllTagsHandler,getTagHandler}