const {addProfilePicture, updateProfilePicture,deleteProfilePicture,getProfilePictureByProfileId} = require('../models/profilePicture')
const {deleteRemoteFile} = require('../middleware/uploader')

const updateProfilePictureHandler = async (req,res) => {
    try {
        let result = await getProfilePictureByProfileId(req.user.profile_id);
        await deleteRemoteFile(result.profile_picture);
        let result2 = await updateProfilePicture({profile_id: req.user.profile_id, profile_picture: req.file.location})  
        res.status(200).send('profile picture updated successfully');      
    } catch (error) {
        res.send(error.message)
    }
};

const deleteProfilePictureHandler = async (req,res) => {
    try {
        let result = await deleteProfilePicture(req.user.profile_id);
        await deleteRemoteFile(result.profile_picture)
        await addProfilePicture({profile_id: req.user.profile_id, profile_picture: process.env.DEFAULT_PROFILE_PICTURE})
        res.status(200).send('profile picture deleted successfully');
    } catch (error) {
        res.send(error.message)
    }
}

const getProfilePictureByProfileIdHandler = async (req,res) => {
    try {
        let result = await getProfilePictureByProfileId(req.user.profile_id);
        res.status(200).json({
            status: 200,
            data: result
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {updateProfilePictureHandler, deleteProfilePictureHandler, getProfilePictureByProfileIdHandler}