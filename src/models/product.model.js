const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAllBank = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findByIdBank = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const findByIdsBank = async (productId) => {
  const result = await connection.execute(
    'SELECT * from StoreManager.products WHERE id IN (?)',
    [productId],
  );
  return result[0];
};

const insertProductBank = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [...Object.values(productName)],
  );

  return insertId;
};

const insertProductDataBase = async (id, productName) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [...Object.values(productName), id],
  );
};

module.exports = {
  findAllBank,
  findByIdBank,
  insertProductBank,
  findByIdsBank,
  insertProductDataBase,
};