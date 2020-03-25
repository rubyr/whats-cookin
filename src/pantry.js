let Ingredient;
if (typeof module !== 'undefined') {
  Ingredient = require('./Ingredient');
}

class Pantry {
  constructor(ingList) {
    this.ingredients = ingList;
  }

  findIngredient(ingID) {
    let ingredientObj = this.ingredients.find(ing => ing.id === ingID);
    let ingLoc = this.ingredients.indexOf(ingredientObj);
    return ingLoc;
  }
  
  updateIngredient(ingID, newAmount) {
    let ingLoc = this.findIngredient(ingID);
    this.ingredients[ingLoc].amount = newAmount;
  }

  compareIngredients(recipe) {
    return recipe.ingredients.reduce((acc, recipeIng) => {
      const ingLoc = this.findIngredient(recipeIng.id)
      if (ingLoc === -1) {
        acc.push({id: recipeIng.id, quantity: {amount: recipeIng.amount}});
      } else {
        if (this.ingredients[ingLoc].amount < recipeIng.amount) {
          acc.push({id: recipeIng.id, quantity: {amount: recipeIng.amount - this.ingredients[ingLoc].amount}});
        }
      }
      return acc;
    }, []);
  }

  subtractIngredients(recipe) {
    if (this.compareIngredients(recipe).length > 0) {
      return;
    }
    recipe.ingredients.forEach(recipeIng => {
      console.log(this.ingredients);
      let prevAmount = this.ingredients[this.findIngredient(recipeIng.id)].amount;
      this.updateIngredient(recipeIng.id, prevAmount - recipeIng.amount);
    });
    this.ingredients = this.ingredients.reduce((acc, ing) => {
      if (ing.amount > 0) {
        acc.push(ing);
      }
      return acc;
    }, []);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
