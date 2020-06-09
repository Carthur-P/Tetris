document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 160;
    const boardWidth = 10
    const board = document.getElementById('board');
    const startButton = document.getElementById('startButton');
    const score = document.getElementById("score");
    
    //Setting up the tetris grid
    for (i = 0; i < boardSize; i++){
        board.innerHTML += '<div></div>' 
    }

    let squares = Array.from(document.querySelectorAll('#board div'));

    let LShape = {
      rotation1: [1, 2, boardWidth+1, boardWidth*2+1],
      rotation2: [boardWidth+1, boardWidth+2, boardWidth+3, boardWidth*2+3],
      rotation3: [1, boardWidth+1, boardWidth*2+1, boardWidth*2],
      rotation4: [boardWidth, boardWidth*2, boardWidth*2+1, boardWidth*2+2]
    };

    let IShape = {
        rotation1: [1, boardWidth+2, boardWidth*2+2, boardWidth*3+2],
        rotation2: [0, 1, 2, 3],
        rotation1: [1, boardWidth+2, boardWidth*2+2, boardWidth*3+2],
        rotation4: [0, 1, 2, 3]
      };

    //   let LShape = {
    //     rotation1: [1, 2, boardWidth+2, boardWidth*2+2],
    //     rotation2: [boardWidth+1, boardWidth+2, boardWidth+3, boardWidth*2+3],
    //     rotation3: [1, boardWidth+2, boardWidth*2+2, boardWidth*2+1],
    //     rotation4: [boardWidth+1, boardWidth*2+1, boardWidth*2+2, boardWidth*2+3]
    //   };

    //   let LShape = {
    //     rotation1: [1, 2, boardWidth+2, boardWidth*2+2],
    //     rotation2: [boardWidth+1, boardWidth+2, boardWidth+3, boardWidth*2+3],
    //     rotation3: [1, boardWidth+2, boardWidth*2+2, boardWidth*2+1],
    //     rotation4: [boardWidth+1, boardWidth*2+1, boardWidth*2+2, boardWidth*2+3]
    //   };

    //   let LShape = {
    //     rotation1: [1, 2, boardWidth+2, boardWidth*2+2],
    //     rotation2: [boardWidth+1, boardWidth+2, boardWidth+3, boardWidth*2+3],
    //     rotation3: [1, boardWidth+2, boardWidth*2+2, boardWidth*2+1],
    //     rotation4: [boardWidth+1, boardWidth*2+1, boardWidth*2+2, boardWidth*2+3]
    //   };

    const tetrominos = [LShape, IShape]
    let currentPosition = 14
    let currentTetromino = tetrominos[0].rotation4;
    
    function draw(){
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    draw();
});