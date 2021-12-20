const {
  addSuggestionModel,
  removeSuggestionModel,
  updateSuggestionModel,
  updateStatusSuggestionModel,
  getAllSuggestionModel,
  getMySuggestionModel,
  getMySuggestionByIdModel,
  getSuggestionsByStatus
} = require("../models/suggestion");
const addSuggestionHandler = async (req, res, next) => {
  try {
    let profile_id = req.user.profile_id;
    let result = await addSuggestionModel(profile_id, req.body);
    if(result.id){
      let response = {
        message:
          "your suggestion has been sent, it will be considered and contact you if needed",
        suggestionData: result,
      };
      res.status(200).send(response);
    } else {
      res.status(403).send('something went wrong while sending suggestion')
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};
const removeSuggestionHandler = async (req, res, next) => {
  try {
    let id = req.body.id;
    let result = await removeSuggestionModel(id);
    if(result.id){
      let response = {
        message: "your suggestion has been deleted ",
      };
      res.status(200).send(response);
    } else {
      res.status(403).json({
        message: "something went wrong while deleting your suggestion",
        error: result
      });
    }
  } catch (error) {
     res.status(403).send(error.message); 
  }
};
const getMySuggestionHandler = async (req, res, next) => {
  try {
    let id = req.user.profile_id;
    let result = await getMySuggestionModel(id);
    if(result.length){
      res.status(200).json(result);
    } else {
      res.status(403).json({
        message: 'something went wrong while retrieving suggestions',
        error: result
      })
    }
  } catch (error) {
     res.status(403).send(error.message); 
  }
};
const updateSuggestionHandler = async (req, res, next) => {
  try {
    let result = await updateSuggestionModel(req.body);
    if(result.id){
      let response = {
        message: "your suggestion is updated ",
        updateSuggestion: result,
      };
      res.status(200).send(response);
    }
    else{
      res.status(403).json({
        message: 'something wen wrong while  updating your suggestion',
        error: result
      })
    }
  } catch (error) {
     res.status(403).send(error.message); 
  }
};
const updateStatusSuggestionHandler = async (req, res) => {
  try {
    let result = await updateStatusSuggestionModel(req.body);
    if(result.id){
      let response = {
          message: ` change the status to ${result.status}`,
        updateStatus: result,
      };
      res.status(200).send(response);
    } else {
      res.status(403).json({
        message: 'Something went wrong while updating suggestion status',
        error: result
      })
    }
  } catch (error) {
     res.status(403).send(error.message); 
  }
};
const getAllSuggestionHandler = async (req, res) => {
  try {
    let result = await getAllSuggestionModel();
    if(result.length){
      res.status(200).json(result);
    } else {
      res.status(403).send('something went wrong while retrieving suggestions')
    }
  } catch (error) {
     res.status(403).send(error.message); 
  }
};

const getSuggestionsByStatusHandler = async (req,res) => {
  try {
    let result = await getSuggestionsByStatus(req.params.status)
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(403).send('something went wrong while retrieving suggestions or there are no suggestions with this status')
    }
  } catch (error) {
    res.status(403).json(error.message)
  }
};

const getMySuggestionByIdHandler = async (req, res) => {
  try {
    let result = await getMySuggestionByIdModel(req.params.id);
    if(result.id){
      res.status(200).json(result)
    } else{
      res.status(403).send('something went wrong while retrieving your suggestion')
    }
  } catch (error) {
    res.status(403).send(error.message)
  }
}

module.exports = {
  addSuggestionHandler,
  removeSuggestionHandler,
  updateSuggestionHandler,
  updateStatusSuggestionHandler,
  getAllSuggestionHandler,
  getMySuggestionHandler,
  getSuggestionsByStatusHandler,
  getMySuggestionByIdHandler
};
