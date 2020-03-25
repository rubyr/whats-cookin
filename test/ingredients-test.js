const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient', function() {
  let ingredient;
  this.beforeEach(function(){
    ingredient = new Ingredient(20081, { amount: 200, unit: 'c'});
  });

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function')
  });

  it('should be an instance of ingredient', function() {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should take in an ingredient ID', function() {
    expect(ingredient.itemID).to.equal(20081)
  });

  it('should have a name associated with ID', function() {
    expect(ingredient.name).to.be.equal("wheat flour");
  });

  it('should have an estimated cost in cents', function() {
    expect(ingredient.estimatedCostInCents).to.be.equal(142);
  });

  it('should have a quantity', function() {
    expect(ingredient.amount).to.be.equal(200);
  });

  it('should have a unit', function() {
    expect(ingredient.unit).to.be.equal('c');
  });

  // tests for invalid id error
  it('should give an error if ID is invalid', function() {
    expect(function(){new Ingredient(231231,{amount: 2, unit:'tbs'})}).to.throw('Ingredient ID doesn\'t exist');
  });
});
