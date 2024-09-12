const container = document.querySelector('.container');

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

        numberOfBoxes--;
    }
}

container.addEventListener('click', function (event) {
  const element = event.target;

  const state = element.getAttribute('data-state');
  const number = element.getAttribute('data-number');

  if (state === 'hidden'){
    element.setAttribute('data-state', "shown");
    element.textContent = number;
    console.log(state);
  } else {
    element.setAttribute('data-state', "hidden");
    element.textContent = '';
  }
});

createRandomElements(6);

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
    };

    // Optionally, hide the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
};
