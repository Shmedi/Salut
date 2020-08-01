// Create a namespace object

const salut = {};

salut.drinkId = "11403";

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
    console.log(result.drinks[0].strIngredient1);
    salut.displayDrink(result);
  });
};

// Add event listener to the submit button
salut.onSubmit = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    salut.getDrink(salut.drinkId);
  });
};

// Add event listeners to the radio buttons
$("input[type=radio]").on("click", function () {
  // Error handle for beverage selection before drink style
  console.log(this);
});

salut.onSubmit();

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

// Check which options user selected and make them a drink

// Call our API function that has our parameter in it

$(function () {});
