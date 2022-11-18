const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const connection = require('../../../src/models/connection');
const productsService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/product.model');

describe('Testes de unidade do Service de products', function () {
  afterEach(sinon.restore);
  it('Realizando uma operação FIND com o Service Product', async function () {

    const product = { id: 1, name: 'test' }
    sinon.stub(productModel, 'findAllBank').resolves([product]);
      
    const error = await productsService.findAll();

    expect(error.type).to.deep.equal(null);
    expect(error.message[0]).to.deep.equal(product);
  });
  it('Realizando uma operação FIND BY ID com o Service Product', async function () {

    const product = { id: 1, name: 'test' }
    sinon.stub(productModel, 'findByIdBank').resolves([product]);

    const error = await productsService.findById(1);

    expect(error.type).to.deep.equal(null);
    expect(error.message[0]).to.deep.equal(product);
  });
  // it('Realizando uma operação DELETE BY ID com o Service Product', async function () {
  //   sinon.stub(productModel, 'deleteByIdDataBase').resolves(1);

  //   const error = await productsService.serviceDeleteProductbyId(1);

  //   expect(error.type).to.deep.equal('PRODUCT_NOT_FOUND');
  //   expect(error.message).to.deep.equal('Product not found');
  // });
  it('Realizando uma operação SUCESSUFUL DELETE BY ID com o Service Product', async function () {
    const product = { id: 1, name: 'test' }
    sinon.stub(connection, 'execute').resolves([[product]]);

    const error = await productsService.serviceDeleteProductbyId(1);

    expect(error.type).to.deep.equal(null);
    expect(error.message).to.deep.equal('Sucessuful Delete');
  });
});