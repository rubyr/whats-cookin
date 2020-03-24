const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/pantry');
const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('pantry', function() {
  let pantry, ing1, ing2, ing3, ing4, ingList, recipe;
  this.beforeEach(function() {
    ing1 = new Ingredient(20081, { amount: 200, unit: 'c'   });
    ing2 = new Ingredient(18372, { amount: 4,   unit: 'tsp' });
    ing3 = new Ingredient(1123,  { amount: 1,   unit: 'l'   });
    ing4 = new Ingredient(19206, { amount: 5,   unit: 'cm'  });

    ingList = [ing1, ing2, ing3, ing4];

    pantry = new Pantry(ingList);

    recipe = new Recipe(); // TODO: Recipe class needs to be filled in
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
    pantry.updateIngredient(1123, { amount: 15, unit: 'l' });
    expect(pantry.ingredients[1123].amount).to.equal(15);
  });

  it.skip('should be able to compare a recipe\'s ingredients with its own', function() {
    const result = pantry.compareIngredients(recipe);
    // i'm gonna be honest i have no clue what to expect here, we'll come back to this
  });

  it.skip('should be able to subtract a recipe\'s ingredients from its own', function() {
    pantry.subtractIngredients(recipe);
    expect(pantry.ingredients).to.deep.equal(
    {
      1123: {	
        "quantity": {	
            "amount": 1,	
            "unit": "large"	
        }	
      },
    });
  });
});