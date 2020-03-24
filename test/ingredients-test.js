const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient', function() {

  it('should be a function', function() {
    const ingredient = new Ingredient();
    expect(Ingredient).to.be.a('function')
  });

  it('should be an instance of ingredient', function() {
    const ingredient = new Ingredient()
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should take in an ingredient ID', function() {
    const ingredient = new Ingredient(20081)
    expect(ingredient.itemID).to.equal(20081)
  });

  it('should have a name associated with ID', function() {
    const ingredient = new Ingredient(20081)
    expect(ingredient.name).to.be.equal("wheat flour");
  });

  it('should have an estimated cost in cents', function() {
    const ingredient = new Ingredient(20081)
    expect(ingredient.estimatedCostInCents).to.be.equal(142);
  });

  it('should have a default quantity required for recipe', function() {
    const ingredient = new Ingredient(20081)
    expect(ingredient.quantityRequired).to.be.equal(0);
  });

  it('should have a default quantity present in the pantry', function() {
    const ingredient = new Ingredient(20081)
    expect(ingredient.quantityInPantry).to.be.equal(0);
  });

  it('should have a quantity needed to make recipe', function() {
    const ingredient = new Ingredient(20081,30)
    expect(ingredient.quantityRequired).to.be.equal(30);
  });

  it('should have a quantity present in the pantry', function() {
    const ingredient = new Ingredient(20081, 30, 40)
    expect(ingredient.quantityInPantry).to.be.equal(40);
  });

  it('should check if there is enough ingredient in pantry to make recipe', function(){
    const ingredient1 = new Ingredient(20081, 40, 50)
    const ingredient2 = new Ingredient(18372, 23, 18)
    ingredient1.checkQuantity();
    ingredient2.checkQuantity();
    expect(ingredient1.checkQuantity).to.be.equal(true);
    expect(ingredient2.checkQuantity).to.be.equal(false);
  });
});