// Create a namespace object

const salut = {};


salut.drinkId = '11403';

// Call our API using a parameter of selected drink

salut.getDrink = function(drinkId) {
  $.ajax ({
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
    method: 'GET',
    dataType: 'json',
    data: {
      key: '1',
      i: drinkId,
    },
  }).then (function(result) {
    console.log(result.drinks[0].strIngredient1)
    salut.displayDrink(result);
  })
}

// Add event listeners to the radio buttons

// Add event listener to the submit button

salut.onSubmit = function() {
  $('.submit').on('click', function(event) {
    event.preventDefault();
    salut.getDrink(salut.drinkId);
  })
}

salut.onSubmit();

salut.displayDrink = function(result) {
  const drink = result.drinks[0].strDrink;
  const base = result.drinks[0].strIngredient1;
  $('.drinkName').text(drink);
  $('ul').append(`<li>${base}</li>`)
}

  // Check which options user selected and make them a drink

  // Call our API function that has our parameter in it

// Display the results to the page

$(function() {
 
})