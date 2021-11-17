const {
  addSuggestionModel,
  removeSuggestionModel,
  updateSuggestionModel,
  updateStatusSuggestionModel,
  getAllSuggestionModel,
  getMySuggestionModel,
  getMySuggestionByIdModel,
} = require("../models/suggestion");
const addSuggestionHandler = async (req, res, next) => {
  try {
    let profile_id = req.user.profile_id;
    let result = await addSuggestionModel(profile_id, req.body);
    let response = {
      message:
        "your suggestion is arrived we will contact with you at with earliest ",
      suggestionData: result,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const removeSuggestionHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await removeSuggestionModel(id);
    let response = {
      message: "your suggestion is deleted ",
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const getMySuggestionHandler = async (req, res, next) => {
  try {
    let id = req.user.profile_id;
    let result = await getMySuggestionModel(id);
    let response = {
      message: " all my suggestion ",
      data: result,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const updateSuggestionHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let oldData = await getMySuggestionByIdModel(id);
    let result = await updateSuggestionModel(id, req.body, oldData);
    let response = {
      message: "your suggestion is updated ",
      updateSuggestion: result,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const updateStatusSuggestionHandler = async (req, res, next) => {
  try {
    let id = req.params.id;
    let oldData = await getMySuggestionByIdModel(id);
    let result = await updateStatusSuggestionModel(id, req.body, oldData);
    let response = {
        message: ` change the status to ${result.status}`,
      updateStatus: result,
    };
    res.status(200).send(response);
  } catch (error) {
    // next(error);
    res.status(400).send(error.message);
  }
};
const getAllSuggestionHandler = async (req, res, next) => {
  try {
    let result = await getAllSuggestionModel();
    let response = {
      message: "the all suggestion ",
      allSuggestion: result,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSuggestionHandler,
  removeSuggestionHandler,
  updateSuggestionHandler,
  updateStatusSuggestionHandler,
  getAllSuggestionHandler,
  getMySuggestionHandler,
};
