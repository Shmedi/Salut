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

// Add event listener to the arrow button ---
salut.arrowClick = function () {
  // When the user clicks, bring them to the form and hide arrow
  $(".arrow").on("click", function () {
    setTimeout(() => {
      $(".arrow").addClass("hide");
    }, 300);
    $("html, body").animate({
      scrollTop: $("main").offset().top,
    });
  });
};

// Add event listeners to the radio buttons ---
salut.handleRadio = function () {
  $("input[type=radio]").on("click", function () {
    // Adds selected styles to user selected radio options
    $(this).parents(".question").find("label").removeClass("selected");
    $(this).parents("label").addClass("selected");

    //Error handle for beverage selection before drink style
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

// Check user options and find the corresponding drink ---
salut.checkOptions = (options) => {
  const beverage = options.beverage;
  const type = options.type;
  const choice = options.choice;

  if (choice === "single") {
    if (beverage === "cocktail" && type === "classic") {
      // Mojito
      salut.drinkId = "11000";
    } else if (beverage === "cocktail" && type === "fancy") {
      // A Night in Old Mandalay
      salut.drinkId = "17832";
    } else if (beverage === "mocktail" && type === "classic") {
      // Strawberry Lemonade
      salut.drinkId = "13036";
    } else if (beverage === "mocktail" && type === "fancy") {
      // Lassi Khara
      salut.drinkId = "12692";
    }
  } else if (choice === "multiple") {
    if (beverage === "cocktail" && type === "classic") {
      // Moscow Mule / Spritz / Sidecar
      const classicCocktails = ["11009", "17215", "12198"];
      salut.randomDrink(classicCocktails);
    } else if (beverage === "cocktail" && type === "fancy") {
      // Gagliardio / Valencia / Blackthorn
      const fancyCocktails = ["12758", "12434", "11106"];
      salut.randomDrink(fancyCocktails);
    } else if (beverage === "mocktail" && type === "classic") {
      // Banana & Strawberry / Iced Coffee / Afterglow
      const classicMocktails = ["12658", "12770", "12560"];
      salut.randomDrink(classicMocktails);
    } else if (beverage === "mocktail" && type === "fancy") {
      // Apello / Egg Cream / Ipamena
      const fancyMocktails = ["15106", "12668", "17176"];
      salut.randomDrink(fancyMocktails);
    }
  }
};

// Selects a random drink ID from the 'multiple' arrays ---
salut.randomDrink = function (array) {
  let randomNumber = Math.floor(Math.random() * 3);
  salut.drinkId = array[randomNumber];
};

// Shows the recipe Card ---
salut.showCard = () => {
  setTimeout(function () {
    $(".recipe").removeClass("hide");
  }, 800);
};

// Hides the form, arrow and intro on submit ---
salut.hideForm = () => {
  $("form").addClass("hide");
  $(".intro").addClass("hide");
  $(".arrow").addClass("hide");
  $("header").addClass("heightAuto");
};

// Display the API results to the recipe card ---
salut.displayRecipe = function (result) {
  // Drink object api variable
  const drinkObj = result.drinks[0];

  // Drink name variable
  const drink = drinkObj.strDrink;

  // Drink ingredient variables
  const ingredient1 = drinkObj.strIngredient1;
  const ingredient2 = drinkObj.strIngredient2;
  const ingredient3 = drinkObj.strIngredient3;
  const ingredient4 = drinkObj.strIngredient4;

  // Ingredient measurement variables
  const measure1 = drinkObj.strMeasure1;
  const measure2 = drinkObj.strMeasure2;
  const measure3 = drinkObj.strMeasure3;
  const measure4 = drinkObj.strMeasure4;

  // Recipe instruction variable
  const instructions = drinkObj.strInstructions;

  // Drink image variable
  const drinkImg = drinkObj.strDrinkThumb;

  // Displays fourth list item only if fourth ingredient is present
  const checkIngredient = (ingredient4) => {
    if (ingredient4 !== null) {
      $(".li4").removeClass("hide");
    }
  };

  // Appends heading
  $(".drinkName").text(drink);

  // Appends ingredient list
  $(".li1").text(`${measure1} ${ingredient1}`);
  $(".li2").text(`${measure2} ${ingredient2}`);
  $(".li3").text(`${measure3} ${ingredient3}`);
  $(".li4").text(`${measure4} ${ingredient4}`);

  // Appends instructions
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
    salut.hideForm();
    salut.showCard();
  });
};

// Reset the page ---
salut.onReset = function () {
  $(".reset").on("click", function () {
    location.reload();
  });
};

// Initializes salut application ---
salut.init = function () {
  salut.arrowClick();
  salut.onSubmit();
  salut.handleRadio();
  salut.onReset();
};

// Document ready ---
$(function () {
  salut.init();
});
