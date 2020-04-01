let search = {

  input: document.querySelector("#search"),
  get query() {
    return this.input.value;
  },
  favorite: false,
  tags: [],

  showAll() {
    for (const card of recipeHolder.children) {
      card.classList.remove("hidden");
    }
  },

  filterByTitle() {
    for (const card of recipeHolder.children) {
      const cardTitle = card.firstElementChild.textContent.toLowerCase();
      if (!cardTitle.includes(this.query)) {
        card.classList.add("hidden");
      } else {
        card.classList.remove("hidden");
      }
    }
  },

  filterByFavorite() {
    for (const card of recipeHolder.children) {
      if (!card.classList.contains("favorite")) {
        card.classList.add("hidden");
      }
    }
  },

  filterToCook() {
    for (const card of recipeHolder.children) {
      if (!card.classList.contains("to-cook")) {
        card.classList.add("hidden");
      }
    }
  },

  filterByTag() {
    for (const card of recipeHolder.children) {
      const recipeId = Number(card.dataset.recipeid);
      const recipe = recipeData.find(recipe => recipe.id === recipeId);
      const recipeTags = recipe.tags;
      this.tags.forEach(tag => {
        if (!recipeTags.includes(tag)) {
          card.classList.add("hidden");
        }
      });
    }
  }
}
