let ingredientsData;
if (typeof module !== undefined) {
  ingredientsData = require('../data/ingredients');
} else {
  ingredientsData = window.ingredientsData;
}

class Ingredient {
  constructor(id, quantity) {
    const data = ingredientsData.filter((obj) => obj.id === id)[0];
    if (data !== undefined) {
      this.id = id;
      this.name = data.name;
      this.estimatedCostInCents = data.estimatedCostInCents;
      this.amount = quantity.amount;
      this.unit = quantity.unit;
    } else {
      throw 'Ingredient ID doesn\'t exist'
    }
  }
}

if (typeof module !== "undefined") {
  module.exports = Ingredient;
}
