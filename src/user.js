let _users;
if (typeof module !== "undefined") {
  _users = require('../data/users');
  Ingredient = require('./Ingredient');
  Recipe = require('./recipe');
  Pantry = require('./pantry');
} else {
  _users = usersData;
}

class User {
  constructor(id) {
    this.id = id;
    const userData = _users.find(obj => obj.id === id);
    this.name = userData.name;
    this.pantry = new Pantry(userData.pantry.map(ing => new Ingredient(ing.ingredient, {amount: ing.amount})));
    this.favoriteRecipes = [];
    this.toCook = [];
  }

  addFavorite(recipeId) {
    this.favoriteRecipes.push(new Recipe(recipeId));
  }

  isFavorite(recipeId) {
    return !!this.favoriteRecipes.find(recipe => recipe.id === Number(recipeId));
  }

  addToCook(recipeId) {
    this.toCook.push(new Recipe(recipeId));
  }
}

if (typeof module !== "undefined") {
  module.exports = User;
}