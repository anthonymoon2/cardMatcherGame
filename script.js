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
