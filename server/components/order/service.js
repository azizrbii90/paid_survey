const Order = require('./model');

module.exports = {
  get: async () => {
    const dbQuery = Order
      .find().sort({ _id: -1 })
    return {
      data: await dbQuery.populate('user').populate('orderItems.gift').exec()
    };
  },
  getById: async (id) => {
    const dbQuery = Order.findOne({
      _id: id
    });
    return {
      data: await dbQuery.exec()
    };
  },
  create: async (createOrder) => {
    try {
      const creatingOrder = new Order(createOrder);
      return await creatingOrder.save();
    } catch (error) {
      console.log(error);
    }
  },
  update: async (id, updateOrder) => {
    try {
      const updatingOrder = await Order.findByIdAndUpdate(id, updateOrder, { new: true });
      return updatingOrder;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const deletingOrder = await Order.findByIdAndDelete(id);
      return deletingOrder;
    } catch (error) {
      console.log(error);
    }
  }
};