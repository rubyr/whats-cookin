let search = {

  input: document.querySelector("#search"),
  ingredientInput: document.querySelector("#ingredient-search"),
  get query() {
    return this.input.value;
  },
  favorite: false,
  tags: [],
  ingredients: [],

  reapplyFilters() {
    this.showAll();
    if (this.favorite) {
      this.filterByFavorite();
    }
    if (this.toCook) {
      this.filterToCook();
    }
    if (this.tags.length) {
      this.filterByTag();
    }
    if (this.ingredients.length) {
      this.filterByIngredient();
    }
    if (this.query) {
      this.filterByTitle();
    }
  },

  getCards() {
    return recipeHolder.querySelectorAll(".card:not(.hidden)");
  },

  showAll() {
    for (const card of recipeHolder.children) {
      card.classList.remove("hidden");
    }
  },

  filterByTitle() {
    for (const card of this.getCards()) {
      const cardTitle = card.firstElementChild.textContent.toLowerCase();
      if (!cardTitle.includes(this.query)) {
        card.classList.add("hidden");
      }
    }
  },

  filterByFavorite() {
    for (const card of this.getCards()) {
      if (!card.classList.contains("favorite")) {
        card.classList.add("hidden");
      }
    }
  },

  filterToCook() {
    for (const card of this.getCards()) {
      if (!card.classList.contains("to-cook")) {
        card.classList.add("hidden");
      }
    }
  },

  filterByTag() {
    for (const card of this.getCards()) {
      const recipeId = Number(card.dataset.recipeid);
      const recipe = recipeData.find(recipe => recipe.id === recipeId);
      const recipeTags = recipe.tags;
      this.tags.forEach(tag => {
        if (!recipeTags.includes(tag)) {
          card.classList.add("hidden");
        }
      });
    }
  },

  filterByIngredient() {
    for (const card of this.getCards()) {
      const recipeId = Number(card.dataset.recipeid);
      const recipe = recipeData.find(recipe => recipe.id === recipeId);
      let recipeIngredients = recipe.ingredients;
      recipeIngredients = recipeIngredients.map(ing => new Ingredient(ing.id, {}).name.toLowerCase());
      let ingsFound = Array(this.ingredients.length).fill(false);
      recipeIngredients.forEach(ing => {
        this.ingredients.forEach((searchIng, i) => {
          if (ing.includes(searchIng)) {
            ingsFound[i] = true;
          }
        });
      });
      if (!ingsFound.every(a => a)) {
        card.classList.add("hidden");
      }
    }
  }
}
