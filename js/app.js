'use strict'


$(document).ready(function() {



	var questionIndex = 0;
	var count = 0;
	var drinkIngredientsRequested = []; 
	//this will eventually be passed as params to the ingredients object


	


	var Questions = function(question) {
		this.question = question;
	}

	var Pantry = function(pantry) {
		this.pantry = pantry;
	}

	var Ingredients = function(ingredients) {
		this.ingredients = ingredients;
	}
	$('#header-content').fadeIn(2000);
	$('#ok-btn').fadeIn(2000);

	
	//constructor object with an array of questions as a property

	var bartenderQuestions = new Questions([ //the question param -an array
		"Do ya like ya drinks strong?", //0
		"Do ya like it with a salty tang?", //1
		"Are ya a lubber who likes it bitter?", //2
		"A little sweetness with ya poison?",
		"Are ya one for a fruity finish?"
	]);

	





	var pantryItems = new Pantry({ //a literal object with 5 keys containing arrays as a single param
		strong: ['Scotch', 'Whiskey', 'Gin'], 
		salty: ['Olives', 'Salt', 'Bacon'], 
		bitter: ['Lemon Peel', 'Tonic', 'Bitters'], 
		sweet: ['Sweet Vermouth', 'Honey', 'Soda'], 
		fruity: ['Orange', 'Cassis', 'Cherry'] 
	})

	var drinkIngredients = new Ingredients([
		"strong", //0
		"salty", //1
		"bitter",
		"sweet",
		"fruity"
	])





	function yesIngredients() {
		if  (bartenderQuestions.question[questionIndex]) {
				// pushing users preferences to the empty drinkIngredientsRequested array
				drinkIngredientsRequested.push(drinkIngredients.ingredients[questionIndex])
				console.log(drinkIngredientsRequested);
				$('#user-preference').text("You like your drinks " + drinkIngredients.ingredients[questionIndex]);
		}
	}

	function noIngredients() {
		if (bartenderQuestions.question[questionIndex]) {
				//document.getElementById("user-preferences").innerHTML = "No thanks.";
			$('#user-preference').text("No Thanks");
		}
	}

	function endQuestions() {
		if (questionIndex == 5) {
				// displays user drink preferences
				var preferences = new Ingredients(drinkIngredientsRequested);
				
				var randomNumber = Math.floor(Math.random() * 3) 
				var createDrink = " ";
				console.log('random number', randomNumber)

				for (var i = 0 ; i < preferences.ingredients.length; i++) {
					 createDrink+= pantryItems.pantry[preferences.ingredients[i]][randomNumber] + "<br>"
						// console.log(createDrink)
						console.log(pantryItems.pantry[preferences.ingredients[i]])
					$('#drink-results').text("The Pirate Bartender made you a special cocktail with the following ingredients: " + "<br><br>" + preferences.ingredients);
				}
				$('#user-content').hide('puff', function() {
					$('#last-page').show('fade');
				})
				$('#yes-btn').remove()
				$('#no-btn').remove()
				$('#nxt-btn').remove()
				$('.header').remove()
		}
	
	}



	$('#ok-btn').click(function() {
		$(this).hide('slide')
		$('#header-content').hide('drop', function() {
			$('#question-content').show('slide', function() {
				$('#bubble > img').fadeIn(1000, function() {
					$('#question').append(bartenderQuestions.question[questionIndex]);

				});
			})
		});
	});	

	$('#yes-btn').click(function(){
		yesIngredients()
		count++
		console.log(count)
	})



	$('#no-btn').click(function() {
		noIngredients()
		count++
		console.log(count)
	})

	$('#nxt-btn').click(function() {
		questionIndex++;
		console.log(questionIndex)
		$('#user-preferences').empty()
		$('#question').empty()
		$('#question').append(bartenderQuestions.question[questionIndex])
		endQuestions()	
	})

})