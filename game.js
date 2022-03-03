var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

//To dectect the first keypress
$(document).on("keydown", function(){

    if(!started)
    {

        $("#level-title").text("Level - "+level);
        nextSequence();
        started = true;
    }
})


//Handler Function to detect the button being clicked

$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})


//Function to play sounds

function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();


}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed"); 
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Sucess");

        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else
    {
        console.log("Wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over !, Press Any Key to Restart");

    //To reset the value of parameters
        startOver();
    }
}

function startOver()
{
    level = 0;
    started = false;
    gamePattern=[];
}

//Function to ganerate randome color sequence

function nextSequence(){

// Re-assigning the values of user clicked pattern in order to check each value from the beginning to the current level
    userClickedPattern=[];

    //Level
        level++;
        $("#level-title").text("Level - "+level);
        var randomNumber = Math.floor(Math.random()*4);
    
        var randomChosenColor = buttonColors[randomNumber];
        
        gamePattern.push(randomChosenColor);
    
    //Button animation 
    
        $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    
    //Audio play
        playSound(randomChosenColor);
       
    }