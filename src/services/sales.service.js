const { salesModel, productModel } = require('../models');

  const insertSales = async (sales) => {
    const product = await sales.map(({ productId }) => productModel.findByIdBank(productId));
    const promise = await Promise.all(product);

    const validSales = promise.every((item) => item);

    if (validSales) {
      await salesModel.insertSalesBank(sales);
      return { type: null, message: 'Sucessuful insert' };
    }
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  };

const findAll = async () => {
  const sales = await salesModel.findAllSalesDataBase();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findByIdDataBase(saleId);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: sale };
  return { type: null, message: sale };
};

const serviceDeleteProductbyId = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await productsService.serviceUpdateProductById(id, body);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  findAll,
  findById,
  serviceDeleteProductbyId,
};