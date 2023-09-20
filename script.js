const canva = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const button = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const background = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let foodX;
let foodY;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
   scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 200);
  }
  else{
    displayGameOver()
  }
}

function clearBoard() {
  context.fillStyle = background;
  context.fillRect(0, 0, gameWidth, gameHeight)
}

function createFood() {
  function randomFood(min, max) {
    const randNumb =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNumb;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
// console.log(foodX);

function drawFood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = {x: snake[0].x + xVelocity,
     y: snake[0].y + yVelocity}
  snake.unshift(head);

  //if food is eating
  if(snake[0].x == foodX && snake[0].y == foodY) {
    score +=1;
    scoreText.textContent = score
      createFood()
  }else{
    snake.pop()
  }

 
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  console.log(keyPressed);

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
  const goingRight = (xVelocity == unitSize);

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -unitSize
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      yVelocity = -unitSize
      xVelocity = 0;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize
      yVelocity = 0
      break;
    case keyPressed == DOWN && !goingUp:
      yVelocity = unitSize
      xVelocity = 0
      break;
      
  }
}

function checkGameOver() {
  switch (true) {
    case (snake[0].x < 0):
      running = false;

      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
      case (snake[0].y < 0):
        running = false
        break;
        case (snake[0].y >= gameHeight):
          running = false
          break;

          
  }
    for(let i = 1; i < snake.length; i++) {

          if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false

          }

          
  
          
      }
}

function drawSnake() {}

function displayGameOver() {

  context.font = "50px MV Bola"
context.fllStyle = 'red'
context.textAlign = 'center'
context.fillText('GAME OVER', gameHeight/2, gameWidth/2 );
  

}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ]
  gameStart()
}
function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
      context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
      context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
  }

