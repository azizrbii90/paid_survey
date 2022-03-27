const Complain = require('./model');

module.exports = {
  get: async () => {
    const dbQuery = Complain
      .find().sort({ _id: -1 })
    return {
      data: await dbQuery.populate('sender').exec()
    };
  },
  getById: async (id) => {
    const dbQuery = Complain.findOne({
      _id: id
    });
    return {
      data: await dbQuery.exec()
    };
  },
  create: async (createComplain) => {
    try {
      const creatingComplain = new Complain(createComplain);
      return await creatingComplain.save();
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const deletingComplain = await Complain.findByIdAndDelete(id);
      return deletingComplain;
    } catch (error) {
      console.log(error);
    }
  }
};