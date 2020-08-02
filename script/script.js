// Namespace object ---
const salut = {};

//Chosen drink ID ---
salut.drinkId = "";

// User options object ---
salut.options = {
  beverage: "",
  type: "",
  choice: "",
};

// Calls API and finds selected drink ---
salut.getDrink = function (drinkId) {
  $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
    method: "GET",
    dataType: "json",
    data: {
      key: "1",
      i: drinkId,
    },
  }).then(function (result) {
    salut.displayRecipe(result);
  });
};

// Add event listeners to the radio buttons ---
salut.handleRadio = function () {
  $("input[type=radio]").on("click", function () {
    // Error handle for beverage selection before drink style
    // Select a drink based on the user's choice
    switch (this.value) {
      case "cocktail":
        salut.options.beverage = "cocktail";
        break;
      case "mocktail":
        salut.options.beverage = "mocktail";
        break;
      case "classic":
        salut.options.type = "classic";
        break;
      case "fancy":
        salut.options.type = "fancy";
        break;
      case "multiple":
        salut.options.choice = "multiple";
        break;
      case "single":
        salut.options.choice = "single";
        break;
    }
  });
};

// Check user options and find the corresponding drink
salut.checkOptions = (options) => {
  const beverage = options.beverage;
  const type = options.type;
  if (beverage === "cocktail" && type === "classic") {
    // mojito
    salut.drinkId = "11000";
  } else if (beverage === "cocktail" && type === "fancy") {
    // Funk & Soul
    salut.drinkId = "17832";
  } else if (beverage === "mocktail" && type === "classic") {
    // Strawberry Lemonade
    salut.drinkId = "13036";
  } else if (beverage === "mocktail" && type === "fancy") {
    // Just a moonmint
    salut.drinkId = "12688";
  }
};

salut.randomDrink = function () {
  const classicCocktails = ["11009", "17252", "12198"];
  const fancyCocktails = ["12758", "12434", "11106"];
  const classicMocktails = ["12704", "17176", "12560"];
  const fancyMocktails = ["12742", "12668", "15092"];

  let randomNumber = Math.floor(Math.random() * 3);
  console.log(classicMocktails[randomNumber]);
};

// Display the API results to the recipe card ---
salut.displayRecipe = function (result) {
  // drink object api variable
  const drinkObj = result.drinks[0];

  // drink name variable
  const drink = drinkObj.strDrink;

  // drink ingredient variables
  const ingredient1 = drinkObj.strIngredient1;
  const ingredient2 = drinkObj.strIngredient2;
  const ingredient3 = drinkObj.strIngredient3;
  const ingredient4 = drinkObj.strIngredient4;

  // ingredient measurement varibales
  const measure1 = drinkObj.strMeasure1;
  const measure2 = drinkObj.strMeasure2;
  const measure3 = drinkObj.strMeasure3;
  const measure4 = drinkObj.strMeasure4;

  // recipe instruction variable
  const instructions = drinkObj.strInstructions;

  // drink image variable
  const drinkImg = drinkObj.strDrinkThumb;

  // displays fourth list item only if fourth ingredient is present
  const checkIngredient = (ingredient4) => {
    if (ingredient4 !== null) {
      $(".li4").removeClass("hide");
    }
  };

  // appends heading
  $(".drinkName").text(drink);

  // appends ingredient list
  $(".li1").text(`${measure1} ${ingredient1}`);
  $(".li2").text(`${measure2} ${ingredient2}`);
  $(".li3").text(`${measure3} ${ingredient3}`);
  $(".li4").text(`${measure4} ${ingredient4}`);

  // appends instructions
  $(".instructions").text(instructions);
  $(".drinkImg").attr("src", drinkImg).attr("alt", drink);
  checkIngredient(ingredient4);
};

// Add event listener to the submit button ---
salut.onSubmit = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    salut.checkOptions(salut.options);
    salut.getDrink(salut.drinkId);
  });
};

// Initializes salut application ---
salut.init = function () {
  salut.onSubmit();
  salut.handleRadio();
};

// Document ready ---
$(function () {
  salut.init();
});
