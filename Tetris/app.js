document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 200;
    let board = document.getElementById('board');
    
    //Setting up the tetris grid
    for (i = 0; i <= boardSize; i++){
        board.innerHTML += '<div></div>' 
    }
});