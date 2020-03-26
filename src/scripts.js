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
    let str = `
    <section class="card" data-recipeid='${recipe.id}'>
      <h2>${recipe.name}</h2>
      <div class="card-image">
        <img src="${recipe.image}">
      </div>
      <section class="tag-list">`;
    recipe.tags.forEach(tag => {
      str += `
        <div class="tag" style="background:#ba2211">${tag}</div>
        `
    })
    str += `
        </section>
      </section>
    </section>
    `
    recipeHolder.innerHTML += str;
  })
}
