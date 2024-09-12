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