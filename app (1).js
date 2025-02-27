let playGnd = document.querySelector('.playGnd');
let buttons = document.querySelectorAll('.buttons i');
let scoreText = document.querySelector('.score');
let highScoreText = document.querySelector('.highScore');

let score, highScore;



let bodies = [];

let foodX, foodY;
let snakeX = 15,
 snakeY = 15;
let velocityX = 0,
 velocityY = 0;

const foodRandom = () => {
 foodX = Math.floor(Math.random() * 29 + 1);
 foodY = Math.floor(Math.random() * 29 + 1);
}

 score = 0, highScore = 0;

const gameInit = () => {
 
 scoreText.innerHTML = score;
 highScoreText.innerHTML = highScore;
 
 // Check if snake eats the food
 if (snakeX === foodX && snakeY === foodY) {
  bodies.push([foodX, foodY]); // Add a new segment at the tail
  foodRandom(); // Generate new food
  score++;
  if (highScore < score) {
   highScore ++;
  }
 }

 // Move the snake body by shifting positions
 for (let i = bodies.length - 1; i > 0; i--) {
  bodies[i] = [...bodies[i - 1]]; // Copy previous position
 }

 if (bodies.length > 0) {
  bodies[0] = [snakeX, snakeY]; // Set the first segment to the previous head position
 }

 // Move the head
 snakeX += velocityX;
 snakeY += velocityY;

 let divBody = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

 // Draw the snake head
 divBody += `<div class="snake" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

 // Draw the body
 for (let i = 0; i < bodies.length; i++) {
  divBody += `<div class="snake" style="grid-area: ${bodies[i][1]} / ${bodies[i][0]}"></div>`;
 }

 playGnd.innerHTML = divBody;

 // Game over condition
 if (snakeX < 0 || snakeX >= 30 || snakeY < 0 || snakeY >= 30) {
  alert('Game Over');
  snakeX = 15, snakeY = 15, velocityX = 0, velocityY = 0;
  bodies = [];
  foodRandom();
  score = 0;
 }
};

buttons[0].addEventListener('click', () => {
 velocityX = -1;
 velocityY = 0;
});
buttons[1].addEventListener('click', () => {
 velocityX = 0;
 velocityY = -1;
});
buttons[2].addEventListener('click', () => {
 velocityX = 1;
 velocityY = 0;
});
buttons[3].addEventListener('click', () => {
 velocityX = 0;
 velocityY = 1;
});


foodRandom();
setInterval(gameInit, 200);