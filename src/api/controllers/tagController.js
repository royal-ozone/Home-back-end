const { addTag, deleteTag, updateTag, getTag, getAllTags } = require('../models/tag')

const addTagHandler = async (req, res) => {
    try {
        let result = await addTag(req.body)
        if (result) {
            res.status(201).json({ message: 'message has been created successfully', ...result })
        } else {
            res.status(403).send('something went wrong while creating tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const deleteTagHandler = async (req, res) => {
    try {
        let id = req.body.id;
        let result = await deleteTag(id)
        if (result) {
            res.status(200).json({ message: 'tag has been deleted successfully', ...result })
        } else {
            res.status(403).send('something went wrong while deleting')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getTagHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getTag(id)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(403).send('something went wrong while getting tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const updateTagHandler = async (req, res) => {
    try {
        let result = await updateTag(req.body)
        if (result) {
            res.status(200).json({ message: 'tag has been updated successfully', ...result })
        } else {
            res.status(403).send('something went wrong while updating tag')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getAllTagsHandler = async (req, res) => {
    try {
        let result = await getAllTags()
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(403).send('something went wrong while getting tags')
        }
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = { addTagHandler, updateTagHandler, deleteTagHandler, getAllTagsHandler, getTagHandler }