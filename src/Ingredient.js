let ingredientsData;
if (typeof module !== undefined) {
  ingredientsData = require('../data/ingredients');
} else {
  ingredientsData = window.ingredientsData;
}

class Ingredient {
  constructor(id, required = 0, present = 0) {
    const data = ingredientsData.filter((obj) => obj.id === id)[0];
    if (data !== undefined) {
      this.itemID = id;
      this.name = data.name;
      this.estimatedCostInCents = data.estimatedCostInCents;
      this.quantityRequired = required;
      this.quantityInPantry = present;
    }
  }

  checkQuantity() {
    return this.quantityRequired <= this.quantityInPantry;
  }
}

if (typeof module !== "undefined") {
  module.exports = Ingredient;
}