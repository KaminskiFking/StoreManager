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

const updateProductbyId = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await productsService.serviceUpdateProductById(id, body);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteProductbyId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.serviceDeleteProductbyId(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json();
};

module.exports = {
  getProducts,
  getProductbyId,
  insertProductByName,
  updateProductbyId,
  deleteProductbyId,
};
