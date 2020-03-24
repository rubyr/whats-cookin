let ingredientsData;
if (typeof module !== undefined) {
  ingredientsData = require('../data/ingredients');
} else {
  ingredientsData = window.ingredientsData;
}

class Pantry {
  constructor(ingList){
    this.ingredients = ingList;
  }
  
  updateIngredient(ingID, pantryAmount) {
    let ingredientObj = this.ingredients.find(ing => ing.itemID === ingID);
    let ingLoc = this.ingredients.indexOf(ingredientObj);
    this.ingredients[ingLoc].quantityInPantry = pantryAmount.amount;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
