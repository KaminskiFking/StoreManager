const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)


const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');

describe('Testes de unidade do Model de Products', function () {
  afterEach(sinon.restore);
  it('Realizando uma operação FIND com o Model Product', async function () {
    const product = { id: 1, name: 'test' }
    sinon.stub(connection, 'execute').resolves([[product]]);

    const result = await productModel.findAllBank();

    expect(result).to.deep.equal(product);
  });
  it('Realizando uma operação FIND BY ID com o Model Product', async function () {
    const product = { id: 1, name: 'test' }
    sinon.stub(connection, 'execute').resolves([[product]]);

    const result = await productModel.findByIdBank(1);

    expect(result).to.deep.equal(product);
  });
});