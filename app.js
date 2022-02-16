const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const endTime = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
let time = 0; 
let score = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreasTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreasTime() {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
}

function setTime (value) {
    endTime.innerHTML = `00:${value}`;
}

function finishGame() {
    endTime.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const circleSize = getRandomNumber(10, 60);
    const color = getRandColor();
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - circleSize);
    const y = getRandomNumber(0, height - circleSize);

    circle.classList.add('circle');
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function setRandomColor(element) {
    const color = getRandColor()
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}