document.addEventListener("DOMContentLoaded", function () {


    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");


    let recipe = recipes.find(r => r.id == recipeId);

    if (!recipe) {
        alert("Recipe not found ❌");
        return;
    }


    document.getElementById("recipe_id").value = recipe.id;
    document.getElementById("recipe_name").value = recipe.title;
    document.getElementById("course_name").value = recipe.category;
    document.getElementById("description").value = recipe.description || "";

    const tbody = document.getElementById("ingredients_table");
    tbody.innerHTML = "";

    (recipe.ingredients || []).forEach((ing, index) => {
        tbody.innerHTML += `
            <tr>
                <td><input type="text" value="${index + 1}" readonly></td>
                <td><input type="text" name="ingredient_name[]" value="${ing.name || ing}"></td>
                <td><input type="text" name="ingredient_qty[]" value="${ing.qty || ""}"></td>
                <td><button type="button" class="btn btn-remove" onclick="removeRow(this)">✕ Remove</button></td>
            </tr>
        `;
    });

    //next id
    let nextId = tbody.querySelectorAll("tr").length + 1;

    //add ingredient
    window.addIngredient = function () {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="text" value="${nextId++}" readonly></td>
            <td><input type="text" name="ingredient_name[]"></td>
            <td><input type="text" name="ingredient_qty[]"></td>
            <td><button type="button" class="btn btn-remove" onclick="removeRow(this)">✕ Remove</button></td>
        `;

        tbody.appendChild(row);

        row.querySelector('input[name="ingredient_name[]"]').focus();
    };

    window.removeRow = function (btn) {

        btn.closest("tr").remove();

        const rows = tbody.querySelectorAll("tr");

        nextId = 1;

        rows.forEach((row, index) => {
            row.querySelector("td input").value = index + 1;
            nextId++;
        });
    };

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

 
        recipe.title = document.getElementById("recipe_name").value;
        recipe.category = document.getElementById("course_name").value;
        recipe.description = document.getElementById("description").value;

  
        let names = document.querySelectorAll('input[name="ingredient_name[]"]');
        let qtys = document.querySelectorAll('input[name="ingredient_qty[]"]');

        let updatedIngredients = [];

        for (let i = 0; i < names.length; i++) {
            if (names[i].value.trim() !== "") {
                updatedIngredients.push({
                    name: names[i].value,
                    qty: qtys[i].value
                });
            }
        }

        recipe.ingredients = updatedIngredients;

        // update array
        let index = recipes.findIndex(r => r.id == recipeId);
        recipes[index] = recipe;

        // save to localStorage
        localStorage.setItem("recipes", JSON.stringify(recipes));

        alert("Recipe updated successfully");


        window.location.href = "Recipes_List.html";
    });

});