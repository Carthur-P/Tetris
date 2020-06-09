document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 160;
    let board = document.getElementById('board');
    let startButton = document.getElementById('startButton');
    let score = document.getElementById("score");
    
    //Setting up the tetris grid
    for (i = 0; i < boardSize; i++){
        board.innerHTML += '<div></div>' 
    }

    let squares = Array.from(document.querySelectorAll('#board div'));
    squares.forEach((element, index) => {
        console.log(index + " " + element);
    });
});