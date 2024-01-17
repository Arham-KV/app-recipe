let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let userInp = document.getElementById("user-inp");
let suggestionsList = document.getElementById("suggestions");

userInp.addEventListener("input", () => {
    let userInput = userInp.value.trim();
    if (userInput.length > 0) {
        // Suggestions fetch karen aur suggestions list ko update karen
        fetch(url + userInput)
            .then(response => response.json())
            .then(data => {
                let meals = data.meals;
                suggestionsList.innerHTML = ""; // Clear previous suggestions
                if (meals) {
                    meals.forEach(meal => {
                        let listItem = document.createElement("li");
                        listItem.textContent = meal.strMeal;
                        suggestionsList.appendChild(listItem);

                        // Click event listener to set selected suggestion in input field
                        listItem.addEventListener("click", () => {
                            userInp.value = meal.strMeal;
                            suggestionsList.innerHTML = ""; // Clear suggestions after selection
                        });
                    });
                }
            })
            .catch(() => {
                console.error("Error fetching suggestions");
            });
    } else {
        suggestionsList.innerHTML = ""; // Clear suggestions when input is empty
    }
});

// let userInp = document.getElementById("user-inp").Value;

searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;

    if (!userInp.length) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    } else {
        fetch(url + userInp).then(response => response.json())
            .then((data) => {
                console.log(data);
                let myMeal = data.meals[0];
                console.log(myMeal);
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strInstructions);
                let count = 1;
                let ingredients = [];
                for (let i in myMeal) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myMeal[i]) {
                        ingredient = myMeal[i];
                        measure = myMeal[`strMeasure` + count];
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }
                console.log(ingredients);

                result.innerHTML = `<img src=${myMeal.strMealThumb}>
        <div class="details">
        <h2>${myMeal.strMeal}</h2> 
        <h4>${myMeal.strMeal}</h4>
        </div> 
        <div id="ingredient-con"></div> 
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
        `;
                let ingredientcon = document.getElementById("ingredient-con");
                let parent = document.createElement("ul");
                let recipe = document.getElementById("recipe");
                let hideRecipe = document.getElementById("hide-recipe");
                let showRecipe = document.getElementById("show-recipe");
                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientcon.appendChild(parent);
                });

                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });
            }).catch(() => {
                result.innerHTML = `<h3> Invalid input</h3>`
            })
    }

});



