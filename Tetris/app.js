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

    const tetrominos = [lShape1, lShape2, iShape, tShape, zShape1, zShape2, squareShape]
    let currentPosition = 4
    let currentTetromino = tetrominos[5].rotation;
    
    function draw(){
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    draw();
});