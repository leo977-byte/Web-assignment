document.addEventListener('DOMContentLoaded', function () {

let role = localStorage.getItem("role");

let defaultRecipes = [
    {
        id: 1,
        title: "Chocolate Chip Cookies 🍪",
        category: "Dessert",
        image: "cookies.jpg",
        ingredients: [
           "2 ¾ cups flour", 
           "2 cups chocolate chips", 
           "1 cup brown sugar",
           "½ cup sugar", 
           "2 ½ sticks unsalted butter", 
           "2 eggs",
            "2 teaspoons vanilla extract", 
            "1 teaspoon baking soda", 
           "¾ teaspoon salt"
        ],
        steps: [
           "Preheat oven to 375°F (190°C).",
            "Line a baking sheet.", 
            "Mix butter and sugar.",
            "Add eggs and vanilla.",
            "Mix dry ingredients.",
            "Add chocolate chips.",
            "Bake 10–12 min."
        ],
        cookingTime: "12 minutes",
        servings: "12 people"
    },
    {
        id: 2,
        title: "Pizza 🍕",
        category: "Main Dish",
        image: "pizza.jpg",
        ingredients: [
            "==Dough==",
             " 1 ½ cups flour",
              "1 teaspoon instant yeast", 
              "¾ cup warm water", 
              "2 teaspoons olive oil",
               "==Topping==", 
               "½ cup tomato sauce",
                "1 ½ cups shredded mozzarella cheese", 
                "¼ cup pepperoni", "==Pizza Sauce==",
                 "6 large tomatoes (peeled and mashed)", 
                 "1 tablespoon vegetable oil", 
                 "1 teaspoon minced garlic",
                  "½ cup finely chopped onion",
                   "½ teaspoon oregano or dried thyme",
                    "2 tablespoons red pepper",
                     "Salt to taste",
             "½ teaspoon sugar"
        ],
        steps: [
           "Dissolve the yeast in warm water and leave it until bubbles form.", 
           "Place the flour in a large bowl and make a hole in the center.",
            "Add the yeast mixture and olive oil.", 
            "Knead the ingredients well until a soft and smooth dough forms.",
            "Place the dough in a greased bowl and leave it to rest.", 
            "Roll the dough into a medium-sized circle in a baking tray.", 
            "Spread the tomato sauce on the dough.", 
            "Add the shredded mozzarella cheese and pepperoni.",
            "Bake the pizza in the oven for about 15 minutes.",
            "Remove from the oven and serve hot.", 
            "==for sauce==", 
            "Heat the oil in a pan over medium heat.",
            "Add garlic and chopped onion and cook until softened.",
            "Add the mashed tomatoes.", "Add oregano, red pepper, and salt.", 
            "Mix well and let the sauce boil for 3 minutes.", "Add sugar, stir well, then remove from heat and let it cool."
        ],
        cookingTime: "20 minutes",
        servings: "2 people"
    }
];


let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

if (!storedRecipes) {
    storedRecipes = defaultRecipes;
    localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
}


function getRecipeId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

let recipeId = getRecipeId();

let selectedRecipe;

if (recipeId) {
    selectedRecipe = storedRecipes.find(r => r.id == recipeId);
} else {
    selectedRecipe = storedRecipes[0];
}

if (!selectedRecipe) {
    document.body.innerHTML = "<h2> Recipe not found</h2>";
    return;
}


function renderUI() {

    document.getElementById("Title").innerText = selectedRecipe.title;
    document.getElementById("category").innerText = "Category: " + selectedRecipe.category;
    document.getElementById("recipeImage").src = selectedRecipe.image;
    const ul = document.getElementById("ingredientsList");
    ul.innerHTML = "";

    selectedRecipe.ingredients.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });

    const ol = document.getElementById("stepsList");
    ol.innerHTML = "";

    selectedRecipe.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        ol.appendChild(li);
    });

    document.getElementById("cookingTime").innerText = selectedRecipe.cookingTime;
    document.getElementById("servings").innerText = selectedRecipe.servings;
}


const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const favBtn = document.getElementById("addToFavBtn");

if (role !== "admin") {
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    favBtn.style.display = "block";
}

editBtn.addEventListener("click", () => {
    localStorage.setItem("currentRecipe", JSON.stringify(selectedRecipe));
});


deleteBtn.addEventListener("click", () => {

    let confirmDelete = confirm("Are you sure?");

    if (confirmDelete) {

        storedRecipes = storedRecipes.filter(r => r.id != selectedRecipe.id);

        localStorage.setItem("recipes", JSON.stringify(storedRecipes));

        window.location.href = "Recipes_List.html";
    }
});

if (!role) {
    favBtn.style.display = "none";
}
favBtn.addEventListener("click", () => {
    if (selectedRecipe) {
        addToFavorites(
            selectedRecipe.id, 
            selectedRecipe.title, 
            selectedRecipe.image, 
            selectedRecipe.category
        );
    }
});

renderUI();

});