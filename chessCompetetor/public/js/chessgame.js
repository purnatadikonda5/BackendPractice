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
    if(playerRole=='b'){
        boardElement.classList.add("flipped");
    }
    board.forEach((row,rowind)=>{
        row.forEach((square,squareind)=>{
            let SquareElement=document.createElement("div");
            SquareElement.classList.add("square",
                ((rowind+squareind)%2 ==0)? "light":"dark"
            )
            SquareElement.dataset.row= rowind;
            SquareElement.dataset.col= squareind;
        
            if(square){
                let pieceElement=document.createElement("div");
                pieceElement.classList.add("piece",
                    (square.color=='w')? "white":"black",
                    (playerRole=='b')? "flipped":"no"
                )
                pieceElement.innerHTML=getPieceUnicode(square);
                pieceElement.draggable= playerRole==square.color;
        
                pieceElement.addEventListener("dragstart",(e)=>{
                    draggedPiece=pieceElement;
                    sourseSquare= {row:rowind,col:squareind}
                    e.dataTransfer.setData("text/plain","");
                })
                pieceElement.addEventListener("dragend",()=>{
                    draggedPiece=null;
                    sourseSquare=null;
        
                })
                SquareElement.appendChild(pieceElement);
            }
            SquareElement.addEventListener("dragover",(e)=>{
                e.preventDefault();
            })
            SquareElement.addEventListener("drop",(e)=>{
                e.preventDefault();
                let targetSquare={
                    row: parseInt(SquareElement.dataset.row),
                    col:parseInt(SquareElement.dataset.col)
                }
                handleMove(sourseSquare,targetSquare);
            })
            boardElement.appendChild(SquareElement);
        })
    })
}
let handleMove =(source,target)=>{
    const from=`${String.fromCharCode(97+source.col)}${8-source.row}`;
    const to=`${String.fromCharCode(97+target.col)}${8-target.row}`;
    const possibleMoves = chess.moves({ square: from, verbose: true });
    const isValidMove = possibleMoves.some((move) => move.to === to);

    if (!isValidMove) {
        console.log(`Invalid move: ${from} -> ${to}`);
        return; 
    }
    const move = {
        from:from,
        to:to,
        promotion:'q'
    }
    socket.emit("move",move);
}
let getPieceUnicode=(piece)=>{
    const unicodePieces = {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♔",
        P: "♟",
        R: "♜",
        N: "♞",
        B: "♝",
        Q: "♛",
        K: "♚",
    };
    return unicodePieces[piece.type] || "";    
}

console.log(playerRole);
socket.on("playerRole",(role)=>{
    playerRole=role;
    renderBoard();
})
socket.on("SpectatorRole",()=>{
    playerRole=null;
    renderBoard();
})
socket.on("boardState",(fen)=>{
    chess.load(fen);
    renderBoard();
})
socket.on("move",(move)=>{
    chess.move(move);
    renderBoard();
})
socket.on("invalidMove", (move) => {
    alert(`Invalid move: ${move.from} -> ${move.to}`);
});

renderBoard();