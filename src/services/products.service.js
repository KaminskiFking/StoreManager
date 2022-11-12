const { productModel } = require('../models');
const { errorsMap } = require('../utils');

const findAll = async () => {
  const products = await productModel.findAllBank();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const products = await productModel.findByIdBank(productId);
  // !products[0]
  if (!products) return { type: errorsMap.PASSENGER_NOT_FOUND, message: products };
  return { type: null, message: products };
};

const insertProduct = async (productName) => {
  const products = await productModel.insertProductBank({ productName });
  const productsById = await productModel.findByIdBank(products);
  return { type: null, message: productsById };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};