let socket= io();
const chess= new Chess();
let boardElement= document.querySelector(".chessboard");
let draggedPiece= null;
let sourseSquare=null;
let playerRole=null;
function renderBoard(){
    let board= chess.board();
    console.log(board);
    boardElement.innerHTML="";
    board.forEach((row,rowind)=>{
        row.forEach((square,squareind)=>{
            let SquareElement=document.createElement("div");
            SquareElement.classList.add("square",
                ((rowind+squareind)%2 ==0)? "light":"dark"
            )
        })
    })

    SquareElement.dataset.row= rowind;
    SquareElement.dataset.col= squareind;

    if(square){
        let pieceElement=document.createElement("div");
        pieceElement.classList.add("piece",
            (square.color=='w')? "white":"black"
        )
        pieceElement.innerHTML="";
        pieceElement.draggable= playerRole==square.color;
    }
}
renderBoard();