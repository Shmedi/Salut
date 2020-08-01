// Create a namespace object

const salut = {};

salut.drinkId = "";
salut.drinks = [
  {
    name: "Strawberry Lemonade",
    id: "13036",
    style: "mocktail",
    type: "classic",
  },
  {
    name: "Just a Moonmint",
    id: "12688",
    style: "mocktail",
    type: "fancy",
  },
  {
    name: "Mojito",
    id: "11000",
    style: "cocktail",
    type: "classic",
  },
  {
    name: "Funk & Soul",
    id: "17266",
    style: "cocktail",
    type: "fancy",
  },
];

// Call our API using a parameter of selected drink

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
    console.log(result);
    salut.displayDrink(result);
  });
};

// Add event listeners to the radio buttons

// Add event listener to the submit button
salut.onSubmit = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    salut.getDrink(salut.drinkId);
  });
};

salut.displayDrink = function (result) {
  const drink = result.drinks[0].strDrink;
  const base = result.drinks[0].strIngredient1;
  $(".drinkName").text(drink);
  $("ul").append(`<li>${base}</li>`);
};

// Check which options user selected and make them a drink

// Call our API function that has our parameter in it

// Add event listeners to the radio buttons
salut.handleRadio = function () {
  $("input[type=radio]").on("click", function () {
    // Error handle for beverage selection before drink style
    // Select a drink based on the user's choice
    let classic = "";
    let fancy = "";

    if (this.value === "cocktail") {
      classic = salut.drinks[2].name;
      fancy = salut.drinks[3].name;
    } else if (this.value === "mocktail") {
      classic = salut.drinks[0].name;
      fancy = salut.drinks[1].name;
    }

    if (classic === "mojito" && this.value === "classic") {
      console.log(this);
    } else if (classic === "strawberry lemonade" && this.value === "fancy") {
      console.log(this);
    }
  });
};

// Display the results to the page
salut.displayDrink = function (result) {
  // Drink Object
  const drinkObj = result.drinks[0];
  // Drink Name
  const drink = drinkObj.strDrink;

  // Drink Ingredients
  const ingredient1 = drinkObj.strIngredient1;
  const ingredient2 = drinkObj.strIngredient2;
  const ingredient3 = drinkObj.strIngredient3;
  const ingredient4 = drinkObj.strIngredient4;

  // Drink Measurements
  const measure1 = drinkObj.strMeasure1;
  const measure2 = drinkObj.strMeasure2;
  const measure3 = drinkObj.strMeasure3;
  const measure4 = drinkObj.strMeasure4;

  // Instructions
  const instructions = drinkObj.strInstructions;

  // Image
  const drinkImg = drinkObj.strDrinkThumb;

  // Remove hide class only if ingredient4 is present
  const checkIngredient = (ingredient4) => {
    if (ingredient4 !== null) {
      $(".li4").removeClass("hide");
    }
  };

  // Append some stuff to the page the page

  // Heading
  $(".drinkName").text(drink);

  // List
  $(".li1").text(`${measure1} ${ingredient1}`);
  $(".li2").text(`${measure2} ${ingredient2}`);
  $(".li3").text(`${measure3} ${ingredient3}`);
  $(".li4").text(`${measure4} ${ingredient4}`);

  // Instructions
  $(".instructions").text(instructions);
  $(".drinkImg").attr("src", drinkImg).attr("alt", drink);
  checkIngredient(ingredient4);
};

salut.init = function () {
  salut.onSubmit();
  salut.handleRadio();
};

$(function () {
  salut.init();
});
