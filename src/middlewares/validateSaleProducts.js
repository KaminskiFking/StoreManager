const Joi = require('joi');

const validProductId = Joi.object({
  productId: Joi.number().integer().required(),
});

const arrayProductId = Joi.array().items(validProductId);

const validQuantity = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

const arrayQuantity = Joi.array().items(validQuantity);

const notProductId = (req, res, next) => {
  const { body } = req;
  const { error } = arrayProductId
    .validate([...body.map(({ quantity, ...productId }) => productId)]);
  if (error) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const notProductQuantity = (req, res, next) => {
  const { body } = req;
  const { error } = arrayQuantity
    .validate([...body.map(({ productId, ...quantity }) => quantity)]);
  console.log(error);
  if (error && error.details[0].type === 'number.min') {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  if (error && error.details[0].type === 'any.required') {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

module.exports = {
  notProductId,
  notProductQuantity,
};