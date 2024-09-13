const container = document.querySelector('.container');



function startTimer(){
    let timeRemaining = 120; //2 minutes in seconds
    const timerDisplay = document.querySelector('#timer h3');

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
        }

    }, 1000);
};

// box object
const BoxElements = {
  boxes: [],
}

// randomizes numbers behind boxes and adds to container
function createRandomElements(numberOfBoxes){
    let boxElement = document.createElement("div");
    boxElement.setAttribute("data-number", "");
    boxElement.setAttribute("data-state", "hidden");

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

    console.log(numBoxArray);
    
    while (numberOfBoxes !== 0){
        // Get a random number between 0 and the number of boxes left 
        let randomIndex = Math.floor(Math.random() * numBoxArray.length);
        let randomNum = numBoxArray[randomIndex];
        // remove that box from array
        numBoxArray.splice(randomIndex, 1);
        
        // create div box and add to container

        let boxElement = document.createElement("div");
        boxElement.setAttribute("data-number", randomNum);
        boxElement.setAttribute("data-state", "hidden");
        boxElement.classList.add("box");
        container.appendChild(boxElement);

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
        container.appendChild(boxContainer);


        numberOfBoxes--;
    }
}

// function for when box is clicked
container.addEventListener('click', function (event) {

  const element = event.target.closest('.boxContainer');
  console.log(element);

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
  }
});

function startingFlip(){
    const allCards = document.querySelectorAll(".boxContainer");
    const front = document.querySelectorAll(".boxFront");
    const back = document.querySelectorAll(".boxBack");

    for(let i=0; i<allCards.length; i++){
        const number = allCards[i].getAttribute('data-number');
        allCards[i].classList.add("flipped");
        front[i].textContent = '?';
        back[i].textContent = number;
        allCards[i].setAttribute('data-state', 'shown');
    }

    console.log(front);
    console.log(back);

    //flip to back
    //allCards.classList.add("flipped");

    setTimeout(() => {
        for(let i=0; i<allCards.length; i++){
            allCards[i].classList.remove("flipped");
            allCards[i].setAttribute('data-state', 'hidden');
        }
    }, 3000);
    
}


window.onload = function() {
    // Get modal elements
    var modal = document.getElementById('modal');
    var startGameBtn = document.getElementById('startGameBtn');
    var playerNameInput = document.getElementById('playerName');

    // Display the modal when the page loads
    modal.style.display = 'block';

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
        modal.style.display = 'none';
        startTimer();
        startingFlip();
    };

    // Optionally, hide the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
};

createRandomElements(6);