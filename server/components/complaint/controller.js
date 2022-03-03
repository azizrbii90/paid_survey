const complainService = require('./service');

module.exports = {
  get: async (req, res) => {
    const complains = await complainService.get();
    res.status(200);
    res.json(complains);
  },
  getById: async (req, res) => {
    const complain = await complainService.getById(req.params.id);
    res.status(200);
    res.json(complain);
  },
  create: async (req, res) => {
    const createComplain = req.body;
    res.status(200);
    res.json({ data: await complainService.create(createComplain) });
  },
  delete: async (req, res) => {
    const deletedComplain = await complainService.delete(req.params.id, req.body);
    res.status(200);
    res.json(deletedComplain);
  }
};
