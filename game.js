//Arrays that store the click patterns and randomly generated gamePattern
buttonColors = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
gamePattern= [];
//A variable that stores the game level
var level = 0;
var started =false;

//A keypress event listener that calls nextSequence()
$("body").on("keydown", function(){
    if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

//A click event listener that listens to button clicks and stores them in an array
$(".btn").on("click", function(){
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});
//A function that randomly selects the buttons and stores them in an array
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    var selectedButton = $("#" + randomColorChosen);
    selectedButton.fadeOut(100).fadeIn(100);

    playSound(randomColorChosen);
}
    //A function that plays sound audio based on the selected audio
    function playSound(color){
        var audio = new Audio('sounds/'+ color +'.mp3');
        audio.play();
    }
    //A function that animates button clicks 
    function animatePress(currentColor){
        var clickedButton = $("#" + currentColor)
        $(clickedButton).addClass("pressed");

        setTimeout(function(){
            $(clickedButton).removeClass("pressed");
        }, 100);
    }
    //A function that checks the user pattern against the game pattern
    function checkAnswer(currentLevel){
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                nextSequence(); 
                }, 1000);
            }
        }else{
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
        
    }
    //A function that resets the game when the game is over
    function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
    }
// nextSequence();