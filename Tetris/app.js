document.addEventListener("DOMContentLoaded", () => {
  const boardSize = 400;
  const boardWidth = 16;
  const previewBoardSize = 16;
  const previewBoardWidth = 4;
  const board = document.getElementById("board");
  const previewBoard = document.getElementById('previewBoard');
  const startButton = document.getElementById("startButton");
  const score = document.getElementById("score");

  //setting up the tetris board
  for(i = 0; i < boardSize; i++) {
    board.innerHTML += "<div></div>";
  }

  //setting up bottom of board
  for(i = 0; i < boardWidth; i++) {
    board.innerHTML += '<div class="freeze"></div>';
  }

  //setting up sample board that shows next block
  for(i = 0; i < previewBoardSize; i ++){
    previewBoard.innerHTML += "<div></div>";
  }

  //stroing all the <div> that makes the board as an array
  let squares = Array.from(document.querySelectorAll("#board div"));

  //storing all the <div> that makes up the preview board as an array
  let previewSquares = Array.from(document.querySelectorAll("#previewBoard div"));

  //creating all the tetris blocks and their 4 rotations
  let lShape1 = [
    [0, 1, 2, boardWidth],
    [0, 1, boardWidth + 1, boardWidth * 2 + 1],
    [boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2, boardWidth + 2],
    [1, boardWidth * 1 + 1, boardWidth * 2 + 1, boardWidth * 2 + 2]
  ];

  let lShape2 = [
    [0, 1, 2, boardWidth + 2],
    [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 2],
    [boardWidth, boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2],
    [1, 2, boardWidth + 1, boardWidth * 2 + 1]
  ];

  let iShape = [
    [0, 1, 2, 3],
    [2, boardWidth + 2, boardWidth * 2 + 2, boardWidth * 3 + 2],
    [boardWidth * 3, boardWidth * 3 + 1, boardWidth * 3 + 2, boardWidth * 3 + 3],
    [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 3 + 1]
  ];

  let tShape = [
    [0, 1, 2, boardWidth + 1],
    [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth],
    [boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2, boardWidth * 1 + 1],
    [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth + 2]
  ];

  let zShape1 = [
    [boardWidth * 1, boardWidth * 1 + 1, 1, 2],
    [1, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 2],
    [boardWidth * 1, boardWidth * 1 + 1, 1, 2],
    [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1]
  ];

  let zShape2 = [
    [1, 2, boardWidth * 1 + 2, boardWidth * 1 + 3],
    [boardWidth * 2 + 1, boardWidth + 1, boardWidth + 2, 2],
    [1, 2, boardWidth * 1 + 2, boardWidth * 1 + 3],
    [boardWidth * 2, boardWidth, boardWidth + 1, 1]
  ];

  let squareShape = [
    [1, 2, boardWidth * 1 + 1, boardWidth * 1 + 2],
    [1, 2, boardWidth * 1 + 1, boardWidth * 1 + 2],
    [1, 2, boardWidth * 1 + 1, boardWidth * 1 + 2],
    [1, 2, boardWidth * 1 + 1, boardWidth * 1 + 2]
  ];

  //array container all the tetrimonoe blocks
  const tetrominos = [lShape1, lShape2, iShape, tShape, zShape1, zShape2, squareShape];

  //setting up preview tetromino components
  const nextTetrominos = [
    [0, 1, 2, previewBoardWidth],
    [0, 1, 2, previewBoardWidth + 2],
    [0, 1, 2, 3],
    [0, 1, 2, previewBoardWidth + 1],
    [previewBoardWidth * 1, previewBoardWidth * 1 + 1, 1, 2],
    [1, 2, previewBoardWidth * 1 + 2, previewBoardWidth * 1 + 3],
    [1, 2, previewBoardWidth * 1 + 1, previewBoardWidth * 1 + 2],
  ];

  //setting up random number generator
  let random = () => Math.floor(Math.random() * tetrominos.length);

  //create current tetromino
  let currentPosition = 6;
  let rotationSelector = 0;
  let tetrominoSelector = tetrominos[random()];
  let currentTetromino = tetrominoSelector[rotationSelector];

  //drawing the block onto screen
  function draw(){
    currentTetromino.forEach((index) => {
      //changing the div css styling
      squares[currentPosition + index].classList.add("tetromino");
    });
  }


  //removing block form screen
  function remove(){
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  //check if the blocks should stop
  function freeze(){
    //use .some() so as soon as one square reaches the bottom, the loop breaks instead of using foreach which will go through the whole array.
    //arrow function => with no curly brackets {} is an explicit one line return code 
    if(currentTetromino.some(index => squares[currentPosition + index + boardWidth].classList.contains("freeze"))){
      //Adding the class 'freeze' to all the <div> that form the block
      currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.add("freeze");
      });
      //creating a new block at the top of the board
      currentPosition = 6;
      currentTetromino = nextTetromino;
      console.log(nextTetromino);
      draw();
    }
  }

  //moving the blocks left by changing the current position
  function moveLeft(){
    remove();
    //checking to see if the block is at the left edge of the board
    if(!currentTetromino.some(index => (currentPosition + index) % boardWidth === 0)){
      //move block left if it is not at the left edge of the board
      currentPosition -= 1;
    }
    //bounce the block back if it incounters a freeze block while moving left
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('freeze'))){
      currentPosition += 1;
    }
    draw();
  }

  //moving the blocks right by changing the current position
  function moveRight(){
    remove();
    //checking to see if the block is at the right edge of the board
    if(!currentTetromino.some(index => (currentPosition + index) % (boardWidth) === boardWidth - 1)){
      //move block right if it is not at the left edge of the board
      currentPosition += 1;
    }
    //bounce the block back if it incounters a freeze block while moving right
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('freeze'))){
      currentPosition -= 1;
    }
    draw();
  }

  function moveDown(){
    remove();
    currentPosition += boardWidth;
    draw();
    freeze();
  }

  function rotate(){
    remove();
    rotationSelector ++;
    if(rotationSelector == currentTetromino.length){
      rotationSelector = 0;
    }
    currentTetromino = tetrominoSelector[rotationSelector]
    draw();
  }

  //starting game timer
  draw();
  drawNext();
  const timer = setInterval(() => {
    remove();
    currentPosition += boardWidth;
    draw();
    freeze();
  }, 500);

  //key press event
  document.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
      moveLeft();
    } else if (e.keyCode == 39) {
      moveRight();
    } else if (e.keyCode == 40) {
      moveDown();
    } else if (e.keyCode == 38) {
      rotate();
    }
  });
});
