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

const serviceUpdateProductById = async (id, productName) => {
  const productsByIdValidate = await productModel.findByIdBank(id);
  if (!productsByIdValidate) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  
  await productModel.insertProductDataBase(id, productName);
  const productsById = await productModel.findByIdBank(id);
  return { type: null, message: productsById };
};

const serviceDeleteProductbyId = async (id) => {
  const productsByIdValidate = await productModel.findByIdBank(id);
  if (!productsByIdValidate) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  await productModel.deleteByIdDataBase(id);
  return { type: null, message: 'Sucessuful Delete' };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  serviceUpdateProductById,
  serviceDeleteProductbyId,
};