let search = {

  input: document.querySelector("#search"),
  get query() {
    return this.input.value;
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
  }
}