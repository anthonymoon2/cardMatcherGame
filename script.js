const container = document.querySelector('.container');

// global variable to keep track of if two boxes are clicked
let numBoxesClicked = 0;
let firstCard;
let secondCard;

let numOfBoxes = 6;

window.onload = start();

function start() {
    // create boxes on load
    createRandomElements(numOfBoxes);

    // Get modal elements
    var modal = new bootstrap.Modal(document.getElementById('exampleModal')); // Initialize Bootstrap modal
    var startGameBtn = document.getElementById('startGameBtn');
    var playerNameInput = document.getElementById('playerName');

    // Display the modal when the page loads
    modal.show();

    // Hide the modal and create player object when the 'Start Game' button is clicked
    startGameBtn.onclick = function() {
        var playerName = playerNameInput.value.trim();
        if (playerName) {
            var player = {
                name: playerName,
                fastestTime: null // Initialize fastest time as null
            };
            // Store the player object in localStorage
            localStorage.setItem('player', JSON.stringify(player));
        }
        modal.hide(); // Hide the modal using Bootstrap's API

        // start timer and flip
        startTimer();
        startingFlip();
    };
};

function startTimer(){
    let timeRemaining = 120; //2 minutes in seconds
    const timerDisplay = document.querySelector('#timer h3');
    const startTime = Date.now(); // Record the start time

    const timerInterval = setInterval(function(){

        //Convert time into minutes and seconds for accurate display
        const minutes = Math.floor(timeRemaining/60);
        const seconds = timeRemaining % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Update the timer display
        timerDisplay.textContent = `Time Left: ${formattedMinutes}:${formattedSeconds}`;

        timeRemaining--;

        if(timeRemaining == 0){
            clearInterval(timerInterval);
            timerDisplay.textContent = `Times up`;
            endingModal(startTime);
        }

    }, 1000);
};

function deleteElements(numOfBoxes){
    const allCards = document.querySelectorAll(".boxContainer");

    for (let i = 0; i < numOfBoxes; i++){
        allCards[i].remove();
    }
} 

// randomizes numbers behind boxes and adds to container
function createRandomElements(numberOfBoxes){
    let boxElement = document.createElement("div");
    //boxElement.setAttribute("data-number", "");
    //boxElement.setAttribute("data-state", "hidden");
    boxElement.setAttribute("data-ismatched", "false");

    // Divide by two because there will be two of each
    let numBoxes = numberOfBoxes/2;
    // Create array of numbers to add
    let numBoxArray = []
    // Add two of each number to array
    while (numBoxes !== 0){
        numBoxArray.push(numBoxes);
        numBoxArray.push(numBoxes);
        numBoxes--;
    }
    
    while (numberOfBoxes !== 0){
        // Get a random number between 0 and the number of boxes left 
        let randomIndex = Math.floor(Math.random() * numBoxArray.length);
        let randomNum = numBoxArray[randomIndex];
        // remove that box from array
        numBoxArray.splice(randomIndex, 1);
        
        // create div box and add to container
        let boxContainer = document.createElement("div");
        let boxFront = document.createElement("div");
        let boxBack = document.createElement("div");

        // add front and back divs to box container
        boxContainer.appendChild(boxFront);
        boxContainer.appendChild(boxBack);

        // add class list for css from style.css
        boxContainer.classList.add("boxContainer");
        boxFront.classList.add("boxFront");
        boxBack.classList.add("boxBack");

        boxFront.textContent = '?';
        boxContainer.setAttribute("data-number", randomNum);
        boxContainer.setAttribute("data-state", "hidden");
        boxContainer.setAttribute("data-ismatched", "false");
        container.appendChild(boxContainer);


        numberOfBoxes--;
    }
}

// function for when box is clicked
container.addEventListener('click', function (event) {
  const element = event.target.closest(".boxContainer");

  if (element.getAttribute("data-ismatched") === "false"){
    if (element){
        const state = element.getAttribute('data-state');
        const number = element.getAttribute('data-number');
        const front = element.querySelector('.boxFront');
        const back = element.querySelector('.boxBack');
      
        if (state === 'hidden'){
          element.classList.add("flipped");
          front.textContent = '?';
          back.textContent = number;
          element.setAttribute('data-state', "shown");
        } else {
          element.classList.remove("flipped");
          front.textContent = '?';
          element.setAttribute('data-state', "hidden");
        }

          // update global variable of boxes clicked
        numBoxesClicked++;

        if (numBoxesClicked === 1){
            firstCard = element;
        } else {
            secondCard = element;
            matchCheck();
        }
    }
  } else{
    console.log("This is already matched");
  }
});

// check if the cards match
function matchCheck(){
    // get the first card and second card's back value
    const firstCardNumber = firstCard.getAttribute('data-number');
    const secondCardNumber = secondCard.getAttribute('data-number');

    //check if they match
    if (firstCardNumber === secondCardNumber){
        firstCard.classList.add("flipped");
        firstCard.setAttribute('data-state', "shown");
        secondCard.classList.add("flipped");
        secondCard.setAttribute('data-state', "shown");

        // change data set for ismatched so they can't be flipped again
        firstCard.setAttribute("data-ismatched", "true");
        secondCard.setAttribute("data-ismatched", "true");

        console.log(firstCard.getAttribute("data-number"));
        console.log(secondCard.getAttribute("data-number"));
        console.log("matched!");

        // reset number of boxes clicked
        numBoxesClicked = 0;

        // remove from global cards
        firstCard = undefined;
        secondCard = undefined;

        checkAllFlipped();
    } else { // if they don't match
        // reset number of boxes clicked
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            firstCard.setAttribute('data-state', "hidden");
            secondCard.classList.remove("flipped");
            secondCard.setAttribute('data-state', "hidden");
    
            console.log(firstCard.getAttribute("data-number"));
            console.log(secondCard.getAttribute("data-number"));
            console.log("not matched!");
    
            // remove from global cards
            firstCard = undefined;
            secondCard = undefined;

            numBoxesClicked = 0;
        }, 400);
    }
    
}

// function which flips cards on start for two seconds
function startingFlip(){
    const allCards = document.querySelectorAll(".boxContainer");
    const front = document.querySelectorAll(".boxFront");
    const back = document.querySelectorAll(".boxBack");

    // for loop to flip all cards
    for(let i=0; i<allCards.length; i++){
        const number = allCards[i].getAttribute('data-number');
        allCards[i].classList.add("flipped");
        front[i].textContent = '?';
        back[i].textContent = number;
        allCards[i].setAttribute('data-state', 'shown');
    }

    // flip back over after two seconds 
    setTimeout(() => {
        for(let i=0; i<allCards.length; i++){
            allCards[i].classList.remove("flipped");
            allCards[i].setAttribute('data-state', 'hidden');
        }
    }, 2000);
}

function checkAllFlipped(){
    const allCards = document.querySelectorAll(".boxContainer");
    let numCardsMatched = 0;

    for(let i = 0; i < numOfBoxes; i++){
        if(allCards[i].getAttribute("data-isMatched") === "false"){
            break
        }else{
            numCardsMatched++;
        }
    }

    if(numOfBoxes === numCardsMatched){
        endingModal();
    }
}


function endingModal(startTime){
    const endTime = Date.now();
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000); // Time taken in seconds

    // Convert timeTakenInSeconds to minutes and seconds
    const minutes = Math.floor(timeTakenInSeconds / 60);
    const seconds = timeTakenInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Update the modal content
    document.getElementById('formattedTime').textContent = `${formattedMinutes}:${formattedSeconds}`;

    // Show the modal
    const endGameModal = new bootstrap.Modal(document.getElementById('endGameModal'));
    endGameModal.show();

    // Add event listener for the "Play Again" button
    document.getElementById('playAgainBtn').addEventListener('click', function () {
        endGameModal.hide();

        //delete current cards
        deleteElements(numOfBoxes);

        // start game again
        start();
    });
}
