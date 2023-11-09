const character = document.getElementById('character');

// Initialize the SpeechRecognition object
const recognition = new webkitSpeechRecognition() || SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;

recognition.onresult = function(event) {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // Check the command and move the character accordingly
    if (command.includes('left')) {
        moveCharacter('left');
    } else if (command.includes('right')) {
        moveCharacter('right');
    } else if (command.includes('up')) {
        moveCharacter('up');
    } else if (command.includes('back')) {
        moveCharacter('back');
    }
};

function moveCharacter(direction) {
    const currentPosition = character.getBoundingClientRect();
    let newPosition;

    switch (direction) {
        case 'left':
            newPosition = { left: currentPosition.left - 40, top: currentPosition.top, rotate: 180 };
            break;
        case 'right':
            newPosition = { left: currentPosition.left + 40, top: currentPosition.top, rotate: 0 };
            break;
        case 'up':
            newPosition = { left: currentPosition.left, top: currentPosition.top - 40, rotate: 266 };
            break;
        case 'back':
            newPosition = { left: currentPosition.left, top: currentPosition.top + 40, rotate: 90 };
            break;
    }

    character.style.left = newPosition.left + 'px';
    character.style.top = newPosition.top + 'px';
    character.style.rotate=newPosition.rotate+ '%';
    character.style.transform = `rotate(${newPosition.rotate}deg)`;
}

// Start listening when the page loads
recognition.start();
