const surveyService = require('./service');

module.exports = {
  get: async (req, res) => {
    const surveys = await surveyService.get();
    res.status(200);
    res.json(surveys);
  },
  getById: async (req, res) => {
    const survey = await surveyService.getById(req.params.id);
    res.status(200);
    res.json(survey);
  },
  create: async (req, res) => {
    const createSurvey = req.body;
    const savedSurvey = await surveyService.create(createSurvey)
    const survey = await surveyService.getById(savedSurvey._id);
    res.status(200);
    res.json(survey);
  },
  update: async (req, res) => {
    const updateSurvey = req.body;
    const updatedSurvey = await surveyService.update(req.params.id, updateSurvey);
    const survey = await surveyService.getById(updatedSurvey._id);
    res.status(200);
    res.json(survey);
  },
  delete: async (req, res) => {
    const deletedSurvey = await surveyService.delete(req.params.id);
    res.status(200);
    res.json(deletedSurvey);
  }
};
