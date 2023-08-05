let help = document.querySelector('.help');
let resetBtn = document.querySelector('.reset');
let cellSquare = document.querySelector('.cell-square');
let currentPlayer = 'X';

const WINNING_COMBOS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]
let moves = []
let xList = [];
let oList = [];
let winner = false;
let winningMove;

// Functions
function playerMove(cellClicked) {
    let data = cellClicked.getAttribute('data-cell');
    const styleFunc = moveStyle();


    if(!moves.includes(parseInt(data)) & (!winner)){
        if(currentPlayer === 'X'){
            addsMovetoList(cellClicked)
            cellClicked.textContent= "X";
            styleFunc.xMove(cellClicked)
        } else {
            addsMovetoList(cellClicked)
            cellClicked.textContent="O"
            styleFunc.oMove(cellClicked)
        }

    } else {
        return
    }

        checkWinner(
        (currentPlayer === 'X' ? xList : oList),
        WINNING_COMBOS,
        cellClicked.innerText
    )

    if(winner){
        styleFunc.winningStyle(winningMove);

        resetBtn.style.visibility = 'visible';
        resetBtn.addEventListener('click', reset)
    } else if (moves.length == 9){
        setTimeout(() =>{ 
            help.innerText = 'Draw';
            resetBtn.style.visibility = 'visible';
            resetBtn.addEventListener('click', reset);
        }, 500)
    }
    
    changePlayer();
}

function addsMovetoList(cellClicked){
    let data = cellClicked.getAttribute('data-cell')

    if(currentPlayer === 'X'){
        xList.push(parseInt(data))
        moves.push(parseInt(data))
    }
    else{
        oList.push(parseInt(data))
        moves.push(parseInt(data))
    }

}

function changePlayer(){
    currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
}

function moveStyle(){


    const xMove = (cellClicked) => {

        cellClicked.classList.toggle('x')
    }
    const oMove = (cellClicked) => {

        cellClicked.classList.toggle('o')

    }

    const winningStyle = (winningMove) => {
        let dataCell = document.querySelectorAll('.cell-square')
        let count = 0
        // let data = cellClicked.getAttribute('data-cell');


        dataCell.forEach(data => {
            if(data.getAttribute('data-cell') === winningMove[count]){
                data.classList.toggle('winner');
                count++
            } else {
                return 'faslses'
            }
        } )
    }

    return {xMove, oMove, winningStyle}
}

function checkWinner(moveList, winningCombos, cellClicked){

    for(let i=0; i<winningCombos.length; ++i ){
        let combo = winningCombos[i];
        const hasWinningPosition = combo.every(position => moveList.includes(position));

        if (hasWinningPosition) {
            // help.innerText = `Winner ${cellClicked}: winning combo is ${combo}`
            help.innerText = `Winner ${cellClicked}`
            
            winner = true
            winningMove = combo;
        }
    
    }

}

function reset(){
    //reset the variable
    let squares = document.querySelectorAll('.cell-square');
    squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('x');
        square.classList.remove('o');
        // square.style.backgroundColor = 'antiquewhite'
    });
    help.innerText = '';

    xList = [];
    oList = [];
    moves = []
    winner = false;
    currentPlayer = 'X'

    resetBtn.style.visibility = 'hidden';

    resetBtn.removeEventListener('click', reset)
}

function gameStart() {
    let squares = document.querySelectorAll('.cell-square');

    squares.forEach(square => square.addEventListener('click', function(){
        playerMove(square)
    }))
}

gameStart();