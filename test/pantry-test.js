const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/pantry');
const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('pantry', function() {
  let pantry, ing1, ing2, ingList, recipe1, recipe2;
  this.beforeEach(function() {
    ing1 = new Ingredient(20081, { amount: 200, unit: 'c'   });
    ing2 = new Ingredient(18372, { amount: 4,   unit: 'tsp' });

    ingList = [ing1, ing2];

    pantry = new Pantry(ingList);

    recipe1 = new Recipe(-1); 

    recipe2 = new Recipe(-2);
  });

  it('should be a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should instantiate a new Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should hold a list of ingredients', function() {
    expect(pantry.ingredients).to.deep.equal(ingList);
  });

  it('should be able to update an ingredient', function() {
    pantry.updateIngredient(20081, 15);
    expect(pantry.ingredients[0].amount).to.equal(15);
  });

  it('should be able to compare a recipe\'s ingredients with its own', function() {
    const result = pantry.compareIngredients(recipe2);
    expect(result).to.deep.equal([
      {
        "id": 20081,
        "quantity": {
          "amount": 300,
        }
      },
    ]);
  });

  it('should be able to subtract a recipe\'s ingredients from its own', function() {
    pantry.subtractIngredients(recipe1);
    expect(pantry.ingredients).to.deep.equal([]);
  });
});
