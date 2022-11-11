const { productModel } = require('../models');
const { errorsMap } = require('../utils');

const findAll = async () => {
  const products = await productModel.findAllBank();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const products = await productModel.findByIdBank(productId);
  if (!products) return { type: errorsMap.PASSENGER_NOT_FOUND, message: products };
  return { type: null, message: products };
};

module.exports = {
  findAll,
  findById,
};