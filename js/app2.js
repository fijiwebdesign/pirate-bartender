'use strict'

$(document).ready(function() {

	var displayQuestion = $('#question')
	var yesButton = $('#yes-btn')
	var noButton = $('#no-btn')
	var nextButton = $('#next-btn')
	var count = 0
	var questionIndex = 0
	// an array of user drinkIngredients preferences
	var drinkIngredientsRequested = []


	// Questions constructor function
	var Questions = function(question) {
		this.question = question;
	};
	// bartenderQuestions object
	var bartenderQuestions = new Questions([
		"Do ye like yer drinks strong?",
		"Do ye like it with a salty tang?",
		"Are ye a lubber who likes it bitter?",
		"Would ye like a bit of sweetness with yer poison?",
		"Are ye one for a fruity finish?"
	])
	//console.log("BARTENDERQUESTIONS" + "\n" + bartenderQuestions.question)

	// Pantry constructor function
	var Pantry = function(pantry) {
		this.pantry = pantry;
	}
	
	Pantry.prototype.getItem = function(pref, index) {
        var item = this.pantry[pref];
        if (!item) {
        	alert("Item does not exist");
        }
		return item[index];
	}
	
	// pantryItems object with key arrays
	var pantryItems = new Pantry({
		strong: ['Rum', 'Whiskey', 'Gin'],
		 salty: ['Olives', 'Salt', 'Bacon'],
		 bitter: ['Lemon Peel', 'Tonic', 'Bitters'],
		 sweet: ['Sugar Cube', 'Honey', 'Cola'], 
		 fruity: ['Orange', 'Cassis', 'Cherry'] 
	})
	//console.log(pantryItems.pantry.strong[0]) //rum
	
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
	Scottish_Maid: ['Famous Grouse Scotch', 'St Germain elderflower liquer', 'cucumber', 'Lemon Juice'],
	Rob_Roy: ['Famous Grouse Scotch', 'Sweet Vermouth', 'Bitters'],
	Blood_and_Sand: ['Famous Grouse Scotch', 'Cherry Heering Brandy', 'Orange Juice', 'Sweet Vermouth']
})

var classics = new Drink({
	Old_Fashioned: ['Bourbon', 'Bitters', 'Orange Juice', 'Local Cane Sugar'],
	Perfect_Manhattan: ['Bourbon', 'Sweet Vermouth'],
	Sazerac: ['Bourbon', 'Bitters', 'Local Cane Sugar', 'Lemon Peel'],
	Moscow_Mule: ['Vodka', 'Lime Juice'],
	Tom_Collins: ['Gin', 'Lemon Juice', 'Local Cane Sugar', 'Soda'],
	John_Collins: ['Bourbon', 'Lemon Peel', 'Local Cane Sugar', 'Soda'],
	The_Brown_Dirby: ['Bourbon', 'Squeezed Grapefruit', 'Local Cane Sugar']
})

console.log(specialties.drinks)

function endQuestions() {
	if (questionIndex == 5) {
			// displays user drink preferences
			var preferences = new Ingredients(drinkIngredientsRequested);
			
			
			var randomNumber = Math.floor(Math.random() * 4) //random number between 0 and 4
			//0 because
			var createDrink = " "

			var randomNumber = Math.floor(Math.random() * 3) //random number between 0 and 4
			//0 because
			var createDrink = " "
			
			var ingredients = [];
			for (var i = 0 ; i < preferences.ingredients.length; i++) {
				 var pref = preferences.ingredients[i];
				 var ingredient = pantryItems.getItem(pref, randomNumber)
				 createDrink += ingredient + ", ";
				ingredients.push(ingredient)
			}

			$("#question").text("William made you a special cocktail with the following ingredients: "  + createDrink);
			
			var bestDrink = null
			var matches_old = 0
            Object.keys(specialties.drinks).forEach(function(name) {
				var matches = 0
				var drink = specialties.drinks[name]
				ingredients.forEach(function(ingredient) {
					if (drink.indexOf(ingredient) != -1) {
						matches++
					}
				})
				if (matches_old < matches) {
					bestDrink = drink
				}
				matches_old = matches
            })

            $("#question").text("William made you a special cocktail with: "  + bestDrink.join(", "));
			

			
			yesButton.remove()
			noButton.remove()
			nextButton.remove()
			
		}
	
}



//displays first question on page load
displayQuestion.append(bartenderQuestions.question[questionIndex]) 


yesButton.click(function(){
	drinkIngredientsRequested.push(drinkIngredients.ingredients[questionIndex])
	console.log(drinkIngredientsRequested)
	count++
	console.log('count', count)
})

$('#next-btn').click(function() {
	questionIndex++;
	console.log('next btn', 'question-index:', questionIndex)
	$('#user-preferences').empty()
	displayQuestion.empty()
	displayQuestion.append(bartenderQuestions.question[questionIndex])
	endQuestions()	
})


})