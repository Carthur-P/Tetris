document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 400;
    const boardWidth = 16
    const board = document.getElementById('board');
    const startButton = document.getElementById('startButton');
    const score = document.getElementById("score");
    
    //Setting up the tetris grid
    for(i = 0; i < boardSize; i++){
        board.innerHTML += '<div></div>' 
    }

    for(i = 0; i < boardWidth; i++){
        board.innerHTML += '<div class="freeze"></div>' 
    }

    //Stroing all th <div> as an array
    let squares = Array.from(document.querySelectorAll('#board div'));
    console.log(squares);

    //Creating all the tetris blocks and their 4 rotations
    let lShape1 = {
      rotation1: [0, 1, 2, boardWidth],
      rotation2: [0, 1, boardWidth+1, boardWidth*2+1],
      rotation3: [boardWidth*2, boardWidth*2+1, boardWidth*2+2, boardWidth+2],
      rotation4: [1, boardWidth*1+1, boardWidth*2+1, boardWidth*2+2]
    };

    let lShape2 = {
        rotation1: [0, 1, 2, boardWidth+2],
        rotation2: [1, boardWidth+1, boardWidth*2+1, boardWidth*2],
        rotation3: [boardWidth, boardWidth*2, boardWidth*2+1, boardWidth*2+2],
        rotation4: [1, 2, boardWidth+1, boardWidth*2+1]
      };

    let iShape = {
        rotation1: [0, 1, 2, 3],
        rotation2: [2, boardWidth+2, boardWidth*2+2, boardWidth*3+2],
        rotation3: [boardWidth*3, boardWidth*3+1, boardWidth*3+2, boardWidth*3+3],
        rotation4: [1, boardWidth+1, boardWidth*2+1, boardWidth*3+1]
      };

      let tShape = {
        rotation1: [0, 1, 2, boardWidth+1],
        rotation2: [1, boardWidth+1, boardWidth*2+1, boardWidth],
        rotation3: [boardWidth*2, boardWidth*2+1, boardWidth*2+2, boardWidth*1+1],
        rotation4: [1, boardWidth+1, boardWidth*2+1, boardWidth+2]
      };

      let zShape1 = {
        rotation1: [boardWidth*1, boardWidth*1+1, 1, 2],
        rotation2: [1, boardWidth+1, boardWidth+2, boardWidth*2+2],
        rotation3: [boardWidth*1, boardWidth*1+1, 1, 2],
        rotation4: [0, boardWidth, boardWidth+1, boardWidth*2+1]
      };

      let zShape2 = {
        rotation1: [1, 2, boardWidth*1+2, boardWidth*1+3],
        rotation2: [boardWidth*2+1, boardWidth+1, boardWidth+2, 2],
        rotation3: [1, 2, boardWidth*1+2, boardWidth*1+3],
        rotation4: [boardWidth*2, boardWidth, boardWidth+1, 1]
      };

      let squareShape = {
          rotation1: [1, 2, boardWidth*1+1, boardWidth*1+2],
          rotation2: [1, 2, boardWidth*1+1, boardWidth*1+2],
          rotation3: [1, 2, boardWidth*1+1, boardWidth*1+2],
          rotation4: [1, 2, boardWidth*1+1, boardWidth*1+2],
      }

    //seeting up current block position and rotation
    //block will be chosen at random
    const tetrominos = [lShape1, lShape2, iShape, tShape, zShape1, zShape2, squareShape]
    let currentPosition = 6;
    let tetrominoSelector = Math.floor(Math.random() * tetrominos.length);
    let currentTetromino = tetrominos[tetrominoSelector].rotation1;
    
    //drawing the block onto screen
    function draw(){
        currentTetromino.forEach(index => {
            //changing the div css styling
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    //removing block form screen
    function remove(){
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    //check if the blocks should stop
    function freeze(){
        //use .some() so as soon as one square reaches the bottom, the loop breaks instead of using foreach which will go through the whole array.
        currentTetromino.some(index => {
            if(squares[currentPosition + index + boardWidth].classList.contains('freeze')){
                //Adding the class 'freeze' to all the <div> that form the block
                currentTetromino.forEach(index => {
                    squares[currentPosition + index].classList.add('freeze');
                });
                //creating a new block at the top of the board
                currentPosition = 6
                tetrominoSelector = Math.floor(Math.random() * tetrominos.length);
                currentTetromino = tetrominos[tetrominoSelector].rotation1;
                draw();
            }
        });
    }

    function moveLeft(){
        remove();
        currentPosition -= 1;
        draw();
        freeze();
    }

    function moveRight(){
        remove();
        currentPosition += 1;
        draw();
        freeze();
    }

    function moveDown(){
        remove();
        currentPosition += boardWidth;
        draw();
        freeze();
    }

    //starting game timer
    draw();
    const timer = setInterval(() => {
        remove();
        currentPosition += boardWidth;
        draw();
        freeze();
    }, 500);

    //key press event
    document.addEventListener('keyup', (e) => {
        console.log(e.keyCode);
        if(e.keyCode == 37){
            moveLeft();
        }
        else if(e.keyCode == 39){
            moveRight();
        }
        else if(e.keyCode == 40){
            moveDown();
        }
        else if(e.keyCode == 38){
            //rotate
        }
    });
});