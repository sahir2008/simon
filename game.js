
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function(){
	if (started === false) {
	$("#level-title").text("Level " + level);
	nextSequence();	
	started = true;
	}
});

$(".btn").on("click", function(event){

var userChosenColour = event.target.attributes.id.value;

	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);	

	checkAnswer(userClickedPattern.length-1);

});
		

//  Functions Section

function playSound(name){
	
	var sound = new Audio("sounds/"+name+".mp3");
  	sound.play();
}

function nextSequence() {
	userClickedPattern = [];
	var randomNumber =	Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour).fadeOut(150).fadeIn(150);
	playSound(randomChosenColour);
	level++;
	$("#level-title").text("Level " + level);
	}

function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	},100)
}

function checkAnswer(currentLevel){

	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function(){
			nextSequence();
			},1000)
		}
	}else{
		gameOver();
	}

}

function gameOver(){
		playSound("wrong");
  		$("body").addClass("game-over");

  		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);

  		$("#level-title").text("Game Over, Press Any Key to Restart");
  		startOver();
}

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}

// ************************** Made with ♥ coded by XspellforceX ***********************