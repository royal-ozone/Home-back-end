// const {
//   addProfilePicture,
//   updateProfilePicture,
//   deleteProfilePicture,
//   getProfilePictureByProfileId,
  
// } = require("../models/profilePicture");
 
// const {updateProfilePicture, getProfileById} = require('../../auth/models/user')
const { 
    getProfileById,updateProfilePicture
} =require('../../auth/models/user');
const { deleteRemoteFile } = require("../middleware/uploader");

const updateProfilePictureHandler = async (req, res) => {
  try {
    let result = await getProfileById(req.user.profile_id);
    let profile = await updateProfilePicture({id: req.user.profile_id,profile_picture: req.file.location})
    await deleteRemoteFile(result.profile_picture);
    if(profile?.id) {
    res.send({status: 200, message: 'picture has been updated successfully', user: profile})
    } else{
      res.send({status: 403, message: 'something went wrong'})
    }
    
  } catch (error) {
    res.json(error.message);
  }
};

const deleteProfilePictureHandler = async (req, res) => {
  try {
    let result = await getProfileById(req.user.profile_id);
      await deleteRemoteFile(result.profile_picture);
      let profile = await updateProfilePicture({id:req.user.profile_id, profile_picture:process.env.DEFAULT_PROFILE_PICTURE})
    if(profile?.id){
      res.send({status: 200, message: 'deleted', user: profile})
    } else{
      res.send({status: 403, message: 'something went wrong'})
    }
    
  } catch (error) {
    res.json(error.message);
  }
};

const getProfilePictureByProfileIdHandler = async (req, res) => {
  try {
    let result = await getProfilePictureByProfileId(req.user.profile_id);
    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  updateProfilePictureHandler,
  deleteProfilePictureHandler,
  getProfilePictureByProfileIdHandler,
};
