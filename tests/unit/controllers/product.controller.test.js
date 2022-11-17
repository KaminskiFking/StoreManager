const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai)

const productsService = require('../../../src/services/products.service');
const productController = require('../../../src/controllers/productController');

describe('Testes de unidade do Controller de Products', function () {
    afterEach(sinon.restore);
  it('Realizando uma operação FIND com o Service Product', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const product = { id: 1, name: 'test' }
      const message = [product];

      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: message });

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  it('Realizando uma operação FIND BY ID com o Service Product', async function () {
      const req = {
        params: { id: 1 },
        body: {}
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const product = { id: 1, name: 'test' }
      const message = [product];
      sinon.stub(productsService, 'findAllById')
        .resolves({ type: null, message: message });
      
      await productController.getProductbyId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(message);
      expect(response.body).to.deep.equal({
        "id": 1,
        "name": "test"
      },)
    });
  });