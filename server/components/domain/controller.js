const domainService = require('./service');

module.exports = {
  get: async (req, res) => {
    const domains = await domainService.get();
    res.status(200);
    res.json(domains);
  },
  getById: async (req, res) => {
    const domain = await domainService.getById(req.params.id);
    res.status(200);
    res.json(domain);
  },
  create: async (req, res) => {
    const createDomain = req.body;
    res.status(200);
    res.json({ data: await domainService.create(createDomain) });
  },
  update: async (req, res) => {
    const updateDomain = req.body;
    const domain = await domainService.update(req.params.id, updateDomain);
    res.status(200);
    res.json(domain);
  },
  delete: async (req, res) => {
    const deletedDomain = await domainService.delete(req.params.id, req.body);
    res.status(200);
    res.json(deletedDomain);
  }
};
