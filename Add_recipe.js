const addBtn = document.getElementById('addRow');
const removeBtn = document.getElementById('removeRow');
const tableBody = document.querySelector('#ingredientsTable tbody');

addBtn.onclick = function() {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" name="Ingredient ID" placeholder="ID"></td>
        <td><input type="text" name="Ingredient Name" placeholder="Name"></td>
        <td><input type="text" name="Quantity" placeholder="Qty"></td>
    `;
    tableBody.appendChild(newRow);
};

removeBtn.onclick = function() {
    let rows = tableBody.getElementsByTagName('tr');
    if (rows.length > 1) {
        tableBody.removeChild(rows[rows.length - 1]);
    }
};


document.querySelector('form').onsubmit = function(e) {
    e.preventDefault(); 

    
    let ingredients = [];
    let rows = document.querySelectorAll('#ingredientsTable tbody tr');
    rows.forEach(row => {
        let inputs = row.querySelectorAll('input');
        if(inputs[1].value) { 
            ingredients.push({
                name: inputs[1].value,
                qty: inputs[2].value
            });
        }
    });

 
    const newRecipe = {
        id: document.getElementById('RecipeID').value , 
        name: document.getElementById('RecipeName').value,
        course: document.getElementById('namecourse').value,
        description: document.getElementById('description').value,
        ingredients: ingredients,
        image: "pizza.jpg" 
    };

    
    let allRecipes = JSON.parse(localStorage.getItem('myCustomRecipes')) || [];
    allRecipes.push(newRecipe);
    localStorage.setItem('myCustomRecipes', JSON.stringify(allRecipes));

    alert("Recipe Added Successfully! ❤️");
    window.location.href = "Recipes_List.html"; 
};