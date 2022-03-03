const orderService = require('./service');

module.exports = {
  get: async (req, res) => {
    const orders = await orderService.get();
    res.status(200);
    res.json(orders);
  },
  getById: async (req, res) => {
    const order = await orderService.getById(req.params.id);
    res.status(200);
    res.json(order);
  },
  create: async (req, res) => {
    const createOrder = req.body;
    res.status(200);
    res.json({ data: await orderService.create(createOrder) });
  },
  update: async (req, res) => {
    const updateOrder = req.body;
    const order = await orderService.update(req.params.id, updateOrder);
    res.status(200);
    res.json(order);
  },
  delete: async (req, res) => {
    const deletedOrder = await orderService.delete(req.params.id, req.body);
    res.status(200);
    res.json(deletedOrder);
  }
};
