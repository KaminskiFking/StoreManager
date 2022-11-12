const { productsService } = require('../services');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type) return res.status(404).send({ message: 'Product not found' });
  return res.status(200).json(message);
};

const getProductbyId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  console.log(type, message);
  if (type) return res.status(404).send({ message: 'Product not found' });
  return res.status(200).json(message);
};

const insertProductByName = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.insertProduct(name);
  return res.status(201).json(message);
};

module.exports = {
  getProducts,
  getProductbyId,
  insertProductByName,
};
