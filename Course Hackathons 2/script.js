let guesses_taken = 0 
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("randomNumber: ", randomNumber)
//wait for the Dom to be fully loaded before accessing the elements
document.addEventListener("DOMContentLoaded", function() {  
    // Changing the size of the button while mouse over the button
    const playButton = document.getElementById("playButton");
    playButton.addEventListener("mouseover", function() {
        playButton.style.transform = "scale(1.1)";
    });
    playButton.addEventListener("mouseout", function() {
        playButton.style.transform = "scale(1)";
    });
});
//function to check users guess
function checkGuess(event) {
  event.preventDefault();
  let user_guessInput = document.getElementById("guessInput").value;
  user_guessInput = parseInt(user_guessInput)
  if (user_guessInput === " " || isNaN(user_guessInput) || user_guessInput == 0) {
    //displaying error message for invalid output
    document.getElementById("feedback").innerText = "Error, please enter a number between 1 and 100.";
    return;
  }
  //increment guesses only if the input is valid
  guesses_taken++
    if (user_guessInput === randomNumber) {
      //changing the background colour when the user guesses the correct number
      document.getElementById("playAgain").disabled = false;
      document.getElementById("close").disabled = false;
      document.body.style.backgroundColor = "green";    
      document.getElementById("attempts").innerHTML = " "
      document.getElementById("score").innerHTML = "You got it in, "  + guesses_taken  + " guesses.";
      document.getElementById("feedback").innerHTML = " ";
      document.getElementById("clapEmoji").value = " ";
      return
} else if (user_guessInput > randomNumber && user_guessInput < 101) {
      document.getElementById("feedback").innerHTML = "Error, the number you inserted is greater than the guess, please try again with a lower number!";
      document.getElementById("attempts").innerHTML = "No of Attempts Taken to guess the random number:" + guesses_taken;
} else if (user_guessInput > 100 || user_guessInput <0) {
      alert("ERROR: PLEASE CHANGE THIS NUMBER TO A NUMBER BETWEEN 1 AND 100\n")
} else {
      document.getElementById("feedback").innerHTML = "Error, this number you have inserted is less than the randomNumber, please try again with a higher number!";
      document.getElementById("attempts").innerHTML = "No of Attempts Taken to guess the random number:" + guesses_taken;
}    
} 

//function to reset the game
function onClose(){

  if(document.getElementById('playAgain').checked == true) {   
location.reload();
} else {  
        document.body.innerHTML = "<h1>Thank for playing Guess the Number Game</h1>";  
} 
}

