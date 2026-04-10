const searchInput = document.getElementById("search");
const recipes = document.querySelectorAll(".recipe");


document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
});

searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLowerCase();

    recipes.forEach(recipe => {
        const text = recipe.textContent.toLowerCase();

        if (text.includes(value)) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
});

const favButtons = document.querySelectorAll(".fav-btn");

favButtons.forEach(button => {
    button.addEventListener("click", function () {
        alert("Recipe added to favorites! ❤️");
    });
});


const role = localStorage.getItem("role");

const adminElements = document.querySelectorAll(".admin-only");
const userElements = document.querySelectorAll(".user-only");

if (role === "admin") {
    userElements.forEach(el => el.style.display = "none");
} else {
    adminElements.forEach(el => el.style.display = "none");
}
