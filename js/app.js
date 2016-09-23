'use strict'

$(document).ready(function() {



	var $displayQuestion = $('#question')
	var $yesButton = $('#yes-btn')
	var $noButton = $('#no-btn')
	var $nextButton = $('#nxt-btn')
	var $okButton = $('#ok-btn')
	var $userPreference = $('#user-preference')
	var $bubbleChat = $('#bubble > img')
	var	$introductionPage = $('#intro-content')
	var $barPage = $('#question-content')
	var count = 0
	var questionIndex = 0
	// an array of user drinkIngredients preferences
	var drinkIngredientsRequested = []
	$displayQuestion.hide();

	// Questions constructor function
	var Questions = function(question) {
		this.question = question;
	};
	
	var bartenderQuestions = new Questions([
		'"Do ya like your drinks strong?"',
		'"Do ya like it with a salty tang?"',
		'"Ya like em bitter?"',
		'"A little sweetness with your poison?"',
		'"Are ya one for a fruity finish?"'
	])
	

	// Pantry constructor function
	var Pantry = function(pantry) {
		this.pantry = pantry;
	}

	
	// pantryItems object with key arrays
	var pantryItems = new Pantry({
		strong: ['Vodka', 'Bourbon', 'Gin', 'Famous Grouse Scotch', 'Scotch'],
		 salty: ['Olives', 'Salt', 'Bacon'],
		 bitter: ['Lemon Peel', 'Tonic', 'Bitters', 'Lemon Juice'],
		 sweet: ['Local Cane Sugar', 'Honey', 'Soda', 'Syrup'], 
		 fruity: ['Freshly Squeezed Orange Juice', 'Freshly Squeezed Grapefruit Juice', 'Cucumber', 'Orange Peel'] 
	})

	//method that all instances of the obj Pantry can utilize
	Pantry.prototype.getItem = function(pref, index) {
        var item = this.pantry[pref];
        if (!item) {
        	alert("Item does not exist");
        }
		return item[index];
	}

	//method that all instances of the obj Pantry can utilize
	Pantry.prototype.getItemList = function(pref) {
        var item = this.pantry[pref];
        if (!item) {
        	alert("Item does not exist");
        }
		return item;
	}

	
	// Ingredients constructor function
	var Ingredients = function(ingredients) {
		this.ingredients = ingredients;
	}
	//drinkIngredients object
	var drinkIngredients = new Ingredients([
		"strong",
		"salty",
		"bitter",
		"sweet",
		"fruity"
	])


var Drink = function(drinks) {
	this.drinks = drinks;
}

var specialties = new Drink({
	Grouse_Hiball: ['Lemon Juice', 'Soda', 'Scotch'],
	Scottish_Maid: ['Famous Grouse Scotch', 'St Germain elderflower liquer', 'Cucumber', 'Lemon Juice'],
	Rob_Roy: ['Famous Grouse Scotch', 'Sweet Vermouth', 'Bitters'],
	Blood_and_Sand: ['Famous Grouse Scotch', 'Cherry Heering Brandy', 'Freshly Squeezed Orange Juice', 'Sweet Vermouth']
})

var classics = new Drink({
	Old_Fashioned: ['Bourbon', 'Bitters', 'Freshly Squeezed Orange Juice', 'Local Cane Sugar'],
	Perfect_Manhattan: ['Bourbon', 'Sweet Vermouth'],
	Sazerac: ['Bourbon', 'Bitters', 'Local Cane Sugar', 'Lemon Peel'],
	Moscow_Mule: ['Vodka', 'Lime Juice'],
	Tom_Collins: ['Gin', 'Lemon Juice', 'Local Cane Sugar', 'Soda'],
	John_Collins: ['Bourbon', 'Lemon Peel', 'Local Cane Sugar', 'Soda'],
	The_Brown_Dirby: ['Bourbon', 'Freshly Squeezed Grapefruit Juice', 'Local Cane Sugar']
})

console.log(specialties.drinks);
var grouse = Object.keys(specialties.drinks);
console.log(grouse);
var loop = grouse.forEach(function(drinkName) {
	//console.log(drinkName);
	var drinkArray = [];
	drinkArray.push(drinkName);
	console.log(drinkArray)
})


function yesIngredients() {
	if  (bartenderQuestions.question[questionIndex]) {
			// pushing users preferences to the empty drinkIngredientsRequested array
			drinkIngredientsRequested.push(drinkIngredients.ingredients[questionIndex])
			$userPreference.text("You like your drinks " + drinkIngredients.ingredients[questionIndex]);
	}
}

function noIngredients() {
	if (bartenderQuestions.question[questionIndex]) {
			$userPreference.text("No thanks.");
	}
}

function endQuestions() {
	if (questionIndex == 5) {
			// displays user drink preferences
			var preferences = new Ingredients(drinkIngredientsRequested);
			
			
			var randomNumber = Math.floor(Math.random() * 3) //random number between 0 and 3, if added + 1, it'll be between 1 and 3
			//0 because
			var createDrink = " "
			
			var ingredients = [];
			var pantryList = [];
			for (var i = 0 ; i < preferences.ingredients.length; i++) {
				 var pref = preferences.ingredients[i]; //lists each item in preferences
				 console.log('preference: ', pref)
				 var list = pantryItems.getItemList(pref);
				 console.log('Concat', pantryList, list)
				 pantryList = pantryList.concat(list);
				 var ingredient = pantryItems.getItem(pref, randomNumber) //sends each pref and the randomNum as index
				 createDrink += ingredient + ", ";
				 console.log('random selection for '+ pref + ' is ', createDrink)
				ingredients.push(ingredient)
			}

			console.log('pantryList', pantryList)

			//$displayQuestion.text("William made you a special cocktail with the following ingredients: "  + createDrink);
			
			var bestDrink = null
			var bestDrinkName
			var matches_old = 0
            Object.keys(classics.drinks).forEach(function(name) {
				var matches = 0
				var drink = classics.drinks[name]
				pantryList.forEach(function(ingredient) {
					if (drink.indexOf(ingredient) != -1) {
						matches++
					}
				})
				if (matches_old <= matches) {
					bestDrink = drink
					bestDrinkName = name.replace(/_/g, " ")
				}
				matches_old = matches
            })

            Object.keys(specialties.drinks).forEach(function(name) {
				var matches = 0
				var drink = specialties.drinks[name]
				pantryList.forEach(function(ingredient) {
					if (drink.indexOf(ingredient) != -1) {
						matches++
					}
				})
				if (matches_old <= matches) {
					bestDrink = drink
					bestDrinkName = name.replace(/_/g, " ")
				}
				matches_old = matches
            })

            //$('#cocktail-item').text("William made you a " + bestDrinkName + " using: "  + bestDrink.join(", "));
			$barPage.hide('puff', function() {
				
				$('#results').fadeIn(1000, function() {
					$('#drink-shaker').toggle('shake', { times: 30 }, 'slow', function() {
						$(this).hide();
						$('#drink-results').prepend("<li>William made you a " + bestDrinkName + " using: "  + bestDrink.join(", ") +"</li>").show();
					});
				});
			})
		}	
	}
	


$introductionPage.fadeIn(2000);
	$okButton.fadeIn(2000); 


$okButton.click(function() {
	$(this).hide('slide')
	$introductionPage.hide('drop', function() {
		$barPage.show('slide', function() {
			$displayQuestion.append(bartenderQuestions.question[questionIndex]);
			$bubbleChat.fadeIn(1000);
			$displayQuestion.fadeIn(1000);
		})
	})
})	

$yesButton.click(function(){
	yesIngredients()
	count++
	console.log('count', count)
	$userPreference.show('slide')
	$nextButton.show('slide');
})

$noButton.click(function() {
	noIngredients()
	count++
	console.log(count)
	$userPreference.show('slide')
	$nextButton.show('slide');

})

$nextButton.click(function() {
	questionIndex++;
	console.log('next btn clicked and question-index:', questionIndex)
	$bubbleChat.fadeOut(500);
	$displayQuestion.fadeOut(500, function() {
		$(this).empty()
		$(this).append(bartenderQuestions.question[questionIndex])
		endQuestions();	
	})
	$bubbleChat.fadeIn(500);
	$displayQuestion.fadeIn(500);
	$userPreference.hide('slide', function() {
		$userPreference.empty();
	});
})


})


