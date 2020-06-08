document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 600;
    let board = document.getElementById('board');
    
    //Setting up the tetris grid
    for (i = 0; i < boardSize; i++){
        board.innerHTML += '<div></div>' 
    }

    let squares = Array.from(document.querySelectorAll('#board div'));
    console.log(squares);
});