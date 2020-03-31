/* eslint-disable no-undef */
const recipeHolder = document.querySelector(".recipe-holder");
const recipeOverlay = document.querySelector(".recipe-overlay");
const userSelect = document.querySelector("#user-select");
let currentUser = null;
window.addEventListener("load", loadHomePage);

recipeHolder.addEventListener("click", function(event) {
  if (event.target.closest(".card") !== undefined) {
    const id = event.target.closest(".card").dataset.recipeid;
    showRecipe(Number(id));
  }
});

userSelect.addEventListener("change", function() {
  saveCurrentUser(event.target.value);
  reload();
});

search.input.addEventListener("keyup", function() {
  search.filterByTitle();
});

function loadHomePage() {
  loadRecipes();
  loadUserSelect();
  loadCurrentUser();
  makePantry(currentUser.id);
}

function loadRecipes() {
  const recipesToDisplay = recipes.reduce((acc, recipe) => {
    if (recipe.id > 0) {
      acc.push(new Recipe(recipe.id));
    }
    return acc;
  }, []);
  recipesToDisplay.forEach(recipe => {
    const getHue = function(str) {
      let hash = 0;
      if (str.length === 0) {
        return hash;
      }
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
      return hash % 360;
    };
    let str = `
      <section class="card" data-recipeid='${recipe.id}'>
      <h2>${recipe.name}</h2>
      <div class="card-image">
        <img src="${recipe.image}">
        <svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
      </div>
      <section class="tag-list">`;
    recipe.tags.forEach(tag => {
      str += `
        <div class="tag" style="background-color: hsl(${
  getHue(tag)}, 60%, 41%)">${tag}</div>
        `;
    });
    str += `
      </section>
    </section>
    `;
    recipeHolder.innerHTML += str;
  });
}

function loadUserSelect() {
  usersData.forEach(user => {
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
  currentUser = new User(Number(userId));
  document.querySelector("#name-display").textContent =
    "Welcome, " + currentUser.name.split(" ")[0] + "!";
}

function saveCurrentUser(userId) {
  localStorage.setItem("currentUser", userId);
}

function showRecipe(recipeId) {
  const recipeData = recipes.find(recipe => recipe.id === recipeId);
  const recipeView = document.querySelector(".recipe-view");
  recipeOverlay.classList.remove("hidden");
  let totalCost = 0;
  const favorited = currentUser.isFavorite(recipeId);
  recipeView.innerHTML += `
  <section class="recipe-view-options">
    <div>  
      <button id="close-recipe" onclick="hideRecipe()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></button>
      <label>Close</label>
    </div>
    <div>
      <button class="${favorited ? "button-applied" : ""}" id="favorite-recipe" onclick="favoriteRecipe(${recipeId})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg></button>
      <label>Add to Favorites</label>
    </div>
    <div>
      <button id="add-to-cook" onclick="addToCook(${recipeId})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
      <label>Add to Cook List</label>
    </div>
  </section>
  <h2>${recipeData.name}</h2>
  <img src="${recipeData.image}">
  <h3>Ingredients</h3>
  <ul>
  ${recipeData.ingredients
    .reduce((acc, ing) => {
      const ingredient = new Ingredient(ing.id, ing.quantity);
      totalCost += ingredient.estimatedCostInCents;

      acc.push(
        `<li>${+ingredient.amount.toFixed(2)} ${ingredient.unit} ${
          ingredient.name
        }</li>`
      );

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

function makePantry(userId) {
  let currentUser = usersData[userId];
  let str0 = `<h1>${currentUser.name.split(" ")[0]}'s Pantry</h1>
</br>`;
  document.querySelector(".pantry-holder").innerHTML =
    str0 + document.querySelector(".pantry-holder").innerHTML;
  let str = `<ul>`;
  usersData[currentUser.id].pantry.forEach(item => {
    let newIngredient = new Ingredient(item.ingredient, {
      amount: item.amount,
      unit: ""
    });
    str += `
<li>
  ${newIngredient.name}
</li>
`;
  });
  str += `</ul>`;
  document.querySelector(".pantry-items").innerHTML = str;
}

function showPantry() {
  document.querySelector(".pantry-holder").classList.toggle("hidden");
}

function reload() {
  location.reload();
}

function favoriteRecipe(recipeId) {
  if (currentUser !== null) {
    currentUser.toggleFavorite(recipeId);
  }
  document
    .querySelector(`.card[data-recipeid="${recipeId}"]`)
    .classList.toggle("favorite");
  document.querySelector(".recipe-view-options #favorite-recipe")
    .classList.toggle("button-applied");
}

function filterFavorite() {
  search.favorite = !search.favorite;
  if (search.favorite) {
    search.filterByFavorite();
    document.querySelector("#filter-favorite-button").classList.add("selected");
  } else {
    search.showAll();
    document.querySelector("#filter-favorite-button").classList.remove("selected");
  }
}