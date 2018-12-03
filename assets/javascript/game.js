var wordsList = ["messi", "hazard", "kante", "alonso", "pobga", "busquets", "david luis", "christiano ronaldo", "ruben loftus cheek", "aguero"];

var alphabetLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wins = 0;
var losses = 0;

var guessesLeft = 8;
var guessesSoFar = [];
var userGuess = null;
var wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
var arrayFromWord = [];

var html = "<p><h1>";

function breakWordIntoArray() {
	for (var i = 0, j = 0; i < wordToBeGuessed.length; i++) {
		arrayFromWord[j] = wordToBeGuessed.charAt(i);
		j++
		if (wordToBeGuessed.charAt(i) != " ") {
			arrayFromWord[j] = false;
		} else {
			arrayFromWord[j] = true;
		}
		j++
	}
}

function consoleLogs() {
	console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
	console.log("guessesLeft: " + guessesLeft + "\n");
	console.log("guessesSoFar: " + guessesSoFar + "\n");
	console.log("wordToBeGuessed: " + wordToBeGuessed + "\n");
	console.log("arrayFromWord: " + arrayFromWord + "\n");
	console.log("--------------------------------");
}

function resetGame() {
    guessesLeft = 8;
	guessesSoFar = [];
	wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
	arrayFromWord = [];
	breakWordIntoArray();
	var htmlInstructions="<p><h3>Press any key to begin guessing</p></h3>";
	document.querySelector("#instructions").innerHTML = htmlInstructions;
    var htmlGameInitial = "<p><h1>";
    
	for (var i = 0; i < wordToBeGuessed.length; i++) {
		if (wordToBeGuessed.charAt(i) == " ") {
			htmlGameInitial += "&nbsp;&nbsp;";
		} else {
			htmlGameInitial += "_&nbsp;";
		}
	}
	
	htmlGameInitial += "</h1></p>"
	document.querySelector("#game").innerHTML = htmlGameInitial;
	var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#stats").innerHTML = htmlStats;
}

function displayProgress() {
	
	for (i = 0, j = 0; i < (arrayFromWord.length / 2); i++) {
			if (arrayFromWord[j+1] == true) {
			html += arrayFromWord[j];
		} else {
			html += "_";
		}
		html += "&nbsp;";
		j=j+2;
	}
	html += "</h1></p>"	
	
	document.querySelector("#game").innerHTML = html;


	htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#stats").innerHTML = htmlStats;

	htmlGuesses = "<p><h3>"
	for (var i = 0; i < guessesSoFar.length; i++) {
		htmlGuesses += guessesSoFar[i] + "&nbsp;";
	}
	htmlGuesses += "</h3></p>";
	document.querySelector("#guesses").innerHTML = htmlGuesses;
}

function validateUserGuess() {
    if (arrayFromWord.indexOf(userGuess) < 0 && guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesLeft--;
        var audio = new Audio("assets/audio/beep.wav");
		audio.play();

    }

    (guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0); {
        guessesSoFar[guessesSoFar.length]=userGuess;
    }

    for (var i = 0; i < arrayFromWord.length; i++) {
      
        if (arrayFromWord[i] === userGuess) {
            // if the letter wasn't previously guessed then play crying sound
            if (arrayFromWord[i+1] == false) {
                var audio = new Audio("assets/audio/beep2.mp3");
                audio.play();
            }

            arrayFromWord[i+1] = true;
        }
    }    
}

function hasUserWon() {
	
	if (arrayFromWord.indexOf(false) < 0 ) {
        console.log("USER WINS");
        wins++;
		
		var audio = new Audio("assets/audio/happy.wav");
        audio.play(); 
        
        var messiThinking="<img src=\"assets/images/goal.gif\" class=\"img-responsive\" alt=\"Goal\">";
		document.querySelector("#messiThinking").innerHTML = messiThinking;
	
		resetGame();
	}	
}

function hasUserLost() {
	
	if (guessesLeft == 0) {
		console.log("USER LOSES");
		
		losses++;
		
		var audio = new Audio("assets/audio/sad.mp3");
		audio.play();
		
		var messiThinking="<img src=\"assets/images/miss.gif\" class=\"img-responsive\" alt=\"miss\">";
		document.querySelector("#messiThinking").innerHTML = messiThinking;
		
		resetGame();
	}

}

function resetHtmlVariable() {
	html="<p><h1>";

}
breakWordIntoArray();


resetGame();


consoleLogs();


document.onkeyup = function(event) {

	
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    
    
	validateUserGuess();

	
	displayProgress();


	consoleLogs();

	
	resetHtmlVariable();

	
	hasUserWon();

	
	hasUserLost();

	
	consoleLogs();
}