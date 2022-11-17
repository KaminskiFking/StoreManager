const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');
/* eslint max-len: ["error", { "ignoreStrings": true }] */

const findAllSalesDataBase = async () => {
  const [result] = await connection.execute(
    'SELECT s.quantity, s.product_id, s.sale_id, d.date  FROM StoreManager.sales_products AS s INNER JOIN StoreManager.sales AS d ON d.id = s.sale_id',
  );
  return camelize(result);
};

const findByIdDataBase = async (saleId) => {
  const sale = await connection.execute(
    'SELECT s.quantity, s.product_id, d.date FROM StoreManager.sales_products AS s INNER JOIN StoreManager.sales AS d ON d.id = s.sale_id WHERE id = (?)',
    [saleId],
  );
  return camelize(sale[0]);
};

async function getLastSale() {
  const [[result]] = await connection
    .execute('SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1');
  return result;
}

async function insertDateSales() {
  const date = new Date();
  await connection.execute('INSERT INTO StoreManager.sales(date) VALUES(?)', [date]);
}

const insertSalesBank = async (sales) => {
  const { id } = await getLastSale();
  await insertDateSales();
  await Promise.all(sales.map(({ productId, quantity }) => (
    connection.execute(`INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`, [id + 1, productId, quantity])
  )));
};

module.exports = {
  insertSalesBank,
  findAllSalesDataBase,
  findByIdDataBase,
};