const Domain = require('./model');

module.exports = {
  get: async () => {
    const dbQuery = Domain
      .find()
    return {
      data: await dbQuery.exec()
    };
  },
  getById: async (id) => {
    const dbQuery = Domain.findOne({
      _id: id
    });
    return {
      data: await dbQuery.exec()
    };
  },
  create: async (createDomain) => {
    try {
      const creatingDomain = new Domain(createDomain);
      return await creatingDomain.save();
    } catch (error) {
      console.log(error);
    }
  },
  update: async (id, updateDomain) => {
    try {
      const updatingDomain = await Domain.findByIdAndUpdate(id, updateDomain, { new: true });
      return updatingDomain;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const deletingDomain = await Domain.findByIdAndDelete(id);
      return deletingDomain;
    } catch (error) {
      console.log(error);
    }
  }
};