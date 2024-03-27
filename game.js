//ARRAYS
var buttonColors=["red","blue","green","yellow"]
var userClickedPattern= []
var gamePattern = []

//VARIABLES
var randomNumber
var randomChosenColour
var audio
var level = 0
var gameStarted = 0

//FUNCTIONS
function playSound(name){                           //sound playing function
    audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){               //animate press function
    $('#'+currentColour).addClass("pressed")

    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },50)
}

function checkAnswer(currentLevel)                  //compares the answer to the current sequence
{
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
        {
            console.log("success")
            if (userClickedPattern.length === gamePattern.length) 
                {
                    setTimeout(function(){
                    userClickedPattern=[];
                    nextSequence();},1000)

                }
        }

        else
            {
                console.log("wrong");
                userClickedPattern=[];
                gamePattern=[];
                gameStarted = 0;
                level = 0;
                $("h1").text("Press A key to Start")
                playSound("wrong")
            }
}

function setTime(seq){
    setTimeout(function(){
        $("."+gamePattern[seq]).animate({opacity: 0.25}, 120).animate({opacity: 1}, 120)
        playSound(gamePattern[seq])}, 500 * seq)
}

$(document).on("keydown",function(){                // starts game on the beginning
    if(gameStarted === 0){nextSequence(); gameStarted = 1}
    else { return }
})

function nextSequence()
{
    
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)
    level++;
    $("h1").text("Level "+ level)
    for(let i = 0; i < gamePattern.length;i++)
    {
        setTime(i)       
    }

}

 $(".btn").click(function(){
    if(gameStarted===0){alert("press any key to start")}
    else{
    //this changes the look of the button for each press
    var userChosenColour = $(this).attr("id")
    animatePress(userChosenColour)
    $("."+userChosenColour).animate({opacity: 0.25}, 120).animate({opacity: 1}, 120)
    playSound(userChosenColour)
    //this adds the button press to an array
    userClickedPattern.push(userChosenColour)
    //console.log(userClickedPattern)
    //this is to check if pattern is still right
    checkAnswer(userClickedPattern.length-1)
    }
 }
 )



