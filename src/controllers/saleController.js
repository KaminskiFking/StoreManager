const { salesService } = require('../services');

const insertSaleProducts = async (req, res) => {
  const bodyArray = req.body;
  const { type, message } = await salesService.insertSales(bodyArray);
  if (type) {
    return res.status(404).json({ message });
  }
    return res.status(201).json(
      {
        id: 3,
        itemsSold: bodyArray,
      },
    );
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.findAll();
  if (type) return res.status(404).send({ message: 'Sale not found' });
  return res.status(200).json(message);
};

const getSalebyId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(message);
};

module.exports = {
  insertSaleProducts,
  getSales,
  getSalebyId,
};