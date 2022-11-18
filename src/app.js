const express = require('express');

const { productController, saleController } = require('./controllers');
const { notProductId, notProductQuantity } = require('./middlewares/validateSaleProducts');
const validateNameProducts = require('./middlewares/validateNameProducts');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductbyId);
app.post('/products', validateNameProducts, productController.insertProductByName);
app.get('/sales/:id', saleController.getSalebyId);
app.get('/sales', saleController.getSales);
app.post('/sales', notProductId, notProductQuantity, saleController.insertSaleProducts);
app.put('/products/:id', validateNameProducts, productController.updateProductbyId);
app.delete('/products/:id', productController.deleteProductbyId);

module.exports = app;