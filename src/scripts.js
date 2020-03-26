window.addEventListener('load', loadHomePage);

function loadHomePage() {
  displayRecipes();
}

function displayRecipes() {
  const recipeHolder = document.querySelector('.recipe-holder');
  const recipesToDisplay = recipes.reduce((acc, recipe) => {
    if (recipe.id > 0) {
      acc.push(new Recipe(recipe.id))
    }
    return acc
  }, []);
  recipesToDisplay.forEach(recipe => {
    recipeHolder.innerHTML += `
    <section class="card" data-recipeid='${recipe.id}'>
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}">
      <section class="tag-list">`
    recipe.tags.forEach(tag => {
      recipeHolder.innerHTML += `
        <div class="tag" style="background:#ba2211">${tag}</div>
        `
    })
    recipeHolder.innerHTML += `
        </section>
      </section>
    </section>
    `
  })
}
