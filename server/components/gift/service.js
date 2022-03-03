const Gift = require('./model');

module.exports = {
  get: async () => {
    const dbQuery = Gift
      .find()
    return {
      data: await dbQuery.exec()
    };
  },
  getById: async (id) => {
    const dbQuery = Gift.findOne({
      _id: id
    });
    return {
      data: await dbQuery.exec()
    };
  },
  create: async (createGift) => {
    try {
      const creatingGift = new Gift(createGift);
      return await creatingGift.save();
    } catch (error) {
      console.log(error);
    }
  },
  update: async (id, updateGift) => {
    try {
      const updatingGift = await Gift.findByIdAndUpdate(id, updateGift, { new: true });
      return updatingGift;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const deletingGift = await Gift.findByIdAndDelete(id);
      return deletingGift;
    } catch (error) {
      console.log(error);
    }
  }
};