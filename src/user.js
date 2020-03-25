let _users;
let Ingredient;
let Recipe;
if (typeof module !== undefined) {
  _users = require('../data/users');
  Ingredient = require('./Ingredient');
  Recipe = require('./recipe');
} else {
  _users = usersData;
}

class User {
  constructor(id) {
    this.id = id;
    const userData = _users.find(obj => obj.id === id);
    this.name = userData.name;
    this.pantry = userData.pantry.map(ing => new Ingredient(ing.ingredient, {amount: ing.amount}));
    this.favoriteRecipes = [];
    this.toCook = [];
  }

  addFavorite(recipeId) {
    this.favoriteRecipes.push(new Recipe(recipeId));
  }

  addToCook(recipeId) {
    this.toCook.push(new Recipe(recipeId));
  }
}

if (typeof module !== undefined) {
  module.exports = User;
}