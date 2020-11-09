var moles = [
    'images/mole.jfif',
    'images/mole-angry.jfif',
    'images/mole-big-eyes.jfif',
    'images/mole-cute.jfif',
    'images/mole-cute-2.png',
    'images/mole-glasses.png',
    'images/mole-hardhat.jfif',
    'images/mole-looking-up.jfif',
    'images/mole-reading.jfif',
    'images/mole-simple.jfif',
    'images/mole-smiling.jfif',
    'images/mole-tongue.png'
];

var whacks = [
    'images/bam.jpeg',
    'images/bam2.png',
    'images/blankpow.png',
    'images/blankpow2.png',
    'images/boom.jpg',
    'images/pow2.jpg',
    'images/whack.png',
    'images/whack2.webp',
    'images/whack3.png',
    'images/whack4.jfif',
    'images/whack5.jpg'
];

let squares;
let mole;
let timeLeft;
let grid;
let score;

let result = 0;
let hitPosition;
let moleTimerId;

function clearBoard() {
    squares.forEach(element => {
        element.classList.remove('mole');
        element.style.backgroundImage = '';
    });
}

function initializeBoard() {
    squares.forEach(element => {
        element.addEventListener('mouseup', () => {
            if (element.id === hitPosition && element.classList.contains('mole')) {
                clearInterval(moleTimerId); // stop mole move long enough to show the whack message
                const randomWhack = whacks[Math.floor(Math.random() * moles.length)];
                element.style.backgroundImage = `url('${randomWhack}')`;
                element.classList.remove('mole');
                result++;
                score.textContent = result;
                setTimeout(moveMole, 300); // restart the mole moves
            }
        });
    });
}

function moveMole() {
    clearBoard();
    const randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');

    const randomMole = moles[Math.floor(Math.random() * moles.length)];
    randomPosition.style.backgroundImage = `url('${randomMole}')`;

    // assign the id of the randomPosition to hitPosition for use later
    hitPosition = randomPosition.id;

    // Setup for next moveMole call
    const rndTime = Math.random() * 1000 + 400; // sometimes will be over a second but should average about 1 second
    moleTimerId = setTimeout(moveMole, rndTime);
}

function runTimer() {
    setTimeout(() => {
        let timeLeftValue = Number.parseInt(timeLeft.textContent);
        if (timeLeftValue > 0) {
            timeLeftValue--;
            timeLeft.textContent = timeLeftValue;
            runTimer(); // do the same thing in 1 second
        }
        else { // we're done, so stop the moles and clear the board
            clearInterval(moleTimerId);
            clearBoard();
            setTimeout(() => { alert(`GAME OVER! Your final score is ${result}`); }, 200);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    squares = document.querySelectorAll('.square');
    mole = document.querySelectorAll('.mole');
    timeLeft = document.querySelector('#time-left');

    grid = document.querySelector('.grid');
    score = document.getElementById('score');

    initializeBoard();
    moveMole();
    runTimer();
});
