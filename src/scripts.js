/* eslint-disable no-undef */
const recipeHolder = document.querySelector(".recipe-holder");
const recipeOverlay = document.querySelector(".recipe-overlay");
const userSelect = document.querySelector("#user-select");

window.addEventListener("load", loadHomePage);

recipeHolder.addEventListener("click", function(event) {
  if (event.target.closest(".card") !== undefined) {
    const id = event.target.closest(".card").dataset.recipeid;
    showRecipe(Number(id));
  }
});

userSelect.addEventListener('change', function() {
  saveCurrentUser(event.target.value);
  reload();
});

search.input.addEventListener('keyup', function() {
  search.filterByTitle();
})

function loadHomePage() {
  loadRecipes();
  loadUserSelect();
  loadCurrentUser();
}

function loadRecipes() {
  const recipesToDisplay = recipes.reduce((acc, recipe) => {
    if (recipe.id > 0) {
      acc.push(new Recipe(recipe.id));
    }
    return acc;
  }, []);
  recipesToDisplay.forEach(recipe => makeRecipeCard(recipe));
}

function makeRecipeCard(recipe) {
  const getHue = str => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return hash % 360;
  }
  let str = `
    <section class="card" data-recipeid='${recipe.id}'>
      <h2>${recipe.name}</h2>
      <div class="card-image">
        <img src="${recipe.image}">
      </div>
      <section class="tag-list">`;
  recipe.tags.forEach(tag => {
    str += `
        <div class="tag" style="background-color: hsl(${getHue(tag)}, 60%, 41%)">${tag}</div>
        `;
  });
  str += `
      </section>
    </section>
    `;
  recipeHolder.innerHTML += str;
}

function loadUserSelect() {
  usersData.forEach(user => {
    console.log("user", user.id);
    const newUser = new User(user.id);
    userSelect.innerHTML += `
    <option value="${newUser.id}">${newUser.name}</option>`;
  });
}

function loadCurrentUser() {
  let userId = localStorage.getItem("currentUser");
  if (userId === null) {
    userId = 1;
  }
  let user = new User(Number(userId));
  document.querySelector("#name-display").textContent = "Welcome, " + user.name.split(" ")[0] + "!";
}

function saveCurrentUser(userId) {
  localStorage.setItem("currentUser", userId);
}

function showRecipe(recipeId) {
  const recipeData = recipes.find(recipe => recipe.id === recipeId);
  const recipeView = document.querySelector(".recipe-view");
  recipeOverlay.classList.remove("hidden");
  let totalCost = 0;
  recipeView.innerHTML += `
  <button id="close-recipe" onclick="hideRecipe()">&times;</button>
  <h2>${recipeData.name}</h2>
  <img src="${recipeData.image}">
  <h3>Ingredients</h3>
  <ul>
  ${recipeData.ingredients.reduce(
    (acc, ing) => {
      const ingredient = new Ingredient(ing.id, ing.quantity);
      totalCost += ingredient.estimatedCostInCents;

      acc.push(`<li>${
        +ingredient.amount.toFixed(2)
      } ${
        ingredient.unit
      } ${
        ingredient.name
      }</li>`);

      return acc;
    }, [])
    .join("")}
  </ul>
  <br>
  <p>Total recipe cost: $${(totalCost / 100).toFixed(2)}</p>
  <hr>
  <h3>Instructions</h3>
  <ol>
  ${recipeData.instructions
    .reduce((acc, instruction) => {
      acc[instruction.number] = `<li>${instruction.instruction}</li>`;
      return acc;
    }, [])
    .join("")}
  </ol>
  `;
}

function hideRecipe() {
  const recipeView = document.querySelector(".recipe-view");
  recipeView.scrollTop = 0;
  recipeView.innerHTML = "";
  recipeOverlay.classList.add("hidden");
}

function reload() {
  location.reload();
}