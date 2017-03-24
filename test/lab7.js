/**
 * Created by austin on 3/5/17.
 */
process.env.NODE_ENV = 'testing';

/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../lab7/src/utils/config');
const app = require('../lab7/app');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

const Db = require('mongodb').Db;

describe('Main', () => {
  it('should respond with 404 requests', () => {
    return chai.request(app)
        .get('/doesntexists')
        .send()
        .then((res) => {
          throw new Error(`Didn't throw error: ${res}`);
        })
        .catch((res) => {
          expect(res).to.have.status(HttpStatus.NOT_FOUND);
        });
  });
});

describe('Recipes', () => {
  const testData = {
    _id: 'bd8fa389-3a7a-4478-8845-e36a02de1b7b',
    title: 'Fried Eggs',
    ingredients: [
      {
        name: 'Egg',
        amount: '2 eggs',
      },
      {
        name: 'Olive Oil',
        amount: '2 tbsp',
      },
    ],
    steps: [
      'First, heat a non-stick pan on medium-high until hot',
      'Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.',
      'Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!',
      'Gently pour the egg from the bowl onto the oil',
      'Wait for egg white to turn bubbly and completely opaque (approx 2 min)',
      'Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)',
      'Remove from oil and plate',
      'Repeat for second egg',
    ],
    comments: [],
  };

  it('GET /recipes should get a list of Recipes in spec', () => {
    return chai.request(app)
        .get('/recipes')
        .send()
        .then((res) => {
          expect(res).to.have.status(HttpStatus.OK);
          const data = res.body;
          expect(Array.isArray(data)).to.be.true;
          data.map((recipe) => {
            expect(recipe).to.have.property('title');
            expect(recipe).to.have.property('_id');
            // SPEC
            expect(recipe).not.to.have.property('ingredients');
          });
        });
  });

  it('POST /recipes should get a list of Recipes in spec', () => {
    return chai.request(app)
        .post('/recipes')
        .send(testData)
        .then((res) => {
          expect(res).to.have.status(HttpStatus.CREATED);
          const data = res.body;
          expect(data).to.have.property('title', testData.title);
          expect(data).to.have.property('ingredients');
          Array.isArray(data.ingredients).should.be.true;
          data.ingredients.length.should.be.equal(testData.ingredients.length);
          expect(data).to.have.property('steps');
          Array.isArray(data.steps).should.be.true;
          expect(data).to.have.property('_id');
          expect(data._id).to.be.not.equal(testData._id);
        });
  });
});

