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


var Pantry = function(pantry) {
		this.pantry = pantry;
	}
	// pantryItems object with key arrays
	var pantryItems = new Pantry({
		strong: ['Famous Grouse Scotch', 'Bourbon', 'Vodka', 'Gin'],
		 salty: ['Olives', 'Salt', 'Bacon', 'Salt'],
		 bitter: ['Lemon Peel', 'Lime Juice', 'Tonic', 'Bitters'],
		 sweet: ['St. Germain elderflower liquer', 'Cherry Heering Brandy', 'Local Cane Sugar', 'Sweet Vermouth'], 
		 fruity: ['Orange Juice', 'Cucumber', 'Cherry', 'Squeezed Grapefruit'] 
	})

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

			for (var i = 0 ; i < preferences.ingredients.length; i++) {
				 createDrink += pantryItems.pantry[preferences.ingredients[i]][randomNumber] + ", ";
				$("#question").text("William made you a special cocktail with the following ingredients: "  + createDrink);
			}
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