module.exports = (req, res, next) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(404).send({ message: 'Product not found' });
  }
  return next();
};