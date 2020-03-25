let recipes;
let Ingredient = require('./Ingredient')
if (typeof module !== undefined) {
  recipes = require('../data/recipes');
} else {
  recipes = recipeData;
}

class Recipe {
  constructor(id){
    this.id = id;
    let recipeData = recipes.find(obj => obj.id === id)
    this.name = recipeData.name;
    this.image = recipeData.image;
    this.tags = recipeData.tags;
    this.instructions = recipeData.instructions;
    this.ingredients = recipeData.ingredients.map(ing => new Ingredient(ing.id, ing.quantity))
  }

  calculateCost() {
    return this.ingredients.reduce((total,ing)=>total+(ing.estimatedCostInCents * ing.amount), 0)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
