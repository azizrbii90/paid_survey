'use strict';

const Survey = require('./model');

module.exports = {
  get: async () => {
    const dbQuery = Survey
      .find().sort({ _id: -1 })
    
    return await dbQuery.populate('user').populate('domains').populate('participants').populate('responses').exec();
  },
  getById: async (id) => {
    const dbQuery = Survey.findOne({
      _id: id
    });
    return {
      data: await dbQuery.populate('user').populate('domains').populate('participants').exec()
    };
  },
  create: async (createSurvey) => {
    try {
      const creatingSurvey = new Survey(createSurvey);
      return await creatingSurvey.save();
    } catch (error) {
      console.log(error);
    }
  },
  update: async (id, updateSurvey) => {
    try {
      const updatingSurvey = await Survey.findByIdAndUpdate(id, updateSurvey, { new: true });
      return updatingSurvey;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const deletingSurvey = await Survey.findByIdAndDelete(id);
      return deletingSurvey;
    } catch (error) {
      console.log(error);
    }
  }
};