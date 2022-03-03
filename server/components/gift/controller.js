const giftService = require('./service');

module.exports = {
  get: async (req, res) => {
    const gifts = await giftService.get();
    res.status(200);
    res.json(gifts);
  },
  getById: async (req, res) => {
    const gift = await giftService.getById(req.params.id);
    res.status(200);
    res.json(gift);
  },
  create: async (req, res) => {
    if (!req.files) {
        res.status(401).json({ data: null, message: "File not found" });
    } else {
    let file = req.files.file;
    let createGift = req.body;
    createGift.photo = {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
    }
    const createdGift = await giftService.create(createGift);
    let uploadPath = __dirname + '\\..\\..\\uploads\\' + file.name;
    file.mv(uploadPath);
    res.status(200);
    res.json({ data: createdGift, message: "Created"});
    }
  },
  update: async (req, res) => {
    const updateGift = req.body;
    let file;
    if (req.files) {
    file = req.files.file;
    updateGift.photo = {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
        }
    }
    
    const gift = await giftService.update(req.params.id, updateGift);

    if(req.files) {
        let uploadPath = __dirname + '\\..\\..\\uploads\\' + file.name;
        file.mv(uploadPath);
    }
    res.status(200);
    res.json(gift);
  },
  delete: async (req, res) => {
    const deletedGift = await giftService.delete(req.params.id, req.body);
    res.status(200);
    res.json(deletedGift);
  }
};
