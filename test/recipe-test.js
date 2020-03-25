const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe');
const Ingredient = require('../src/Ingredient')

describe('Recipe', function() {
let recipe
this.beforeEach(function() {
  recipe = new Recipe(595736);
});
it('should be a function', function() {
  expect(Recipe).to.be.a('function');
})

it('should create a new instance', function() {
  expect(recipe).to.be.an.instanceof(Recipe);
});

it('should have an ID', function() {
  expect(recipe.id).to.equal(595736)
});

it('should have a name', function() {
  expect(recipe.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
})

it('should have an image', function() {
  expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg')
})

it('should have an tags', function() {
  expect(recipe.tags).to.deep.equal([
    "antipasti",
    "starter",
    "snack",
    "appetizer",
    "antipasto",
    "hor d'oeuvre"
  ])
})

it('should have an instructions', function() {
  expect(recipe.instructions).to.deep.equal([{
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    },
    {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    },
    {
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "number": 3
    },
    {
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "number": 4
    },
    {
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "number": 5
    },
    {
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
      "number": 6
    }
  ])
});

it('should have ingredients', function() {
  expect(recipe.ingredients).to.deep.equal([
    new Ingredient(20081, {
      "amount": 1.5,
      "unit": "c"
    }),
    new Ingredient(18372, {
      "amount": 0.5,
      "unit": "tsp"
    }),
    new Ingredient(1123, {
      "amount": 1,
      "unit": "large"
    }),
    new Ingredient(19335, {
      "amount": 0.5,
      "unit": "c"
    }),
    new Ingredient(19206, {
      "amount": 3,
      "unit": "Tbsp"
    }),
    new Ingredient(19334, {
      "amount": 0.5,
      "unit": "c"
    }),
    new Ingredient(2047, {
      "amount": 0.5,
      "unit": "tsp"
    }),
    new Ingredient(1012047, {
      "amount": 24,
      "unit": "servings"
    }),
    new Ingredient(10019903, {
      "amount": 2,
      "unit": "c"
    }),
    new Ingredient(1145, {
      "amount": 0.5,
      "unit": "c"
    }),
    new Ingredient(2050, {
      "amount": 0.5,
      "unit": "tsp"
    })
  ]);
});

it('should be able to calculate the cost of the recipe', function() {
  expect(recipe.calculateCost()).to.be.equal(17776)
});

});
