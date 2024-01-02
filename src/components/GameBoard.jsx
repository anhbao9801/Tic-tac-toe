

{/**const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
    // này để tạo ma trận bảng để làm game
] di chuyển những đoạn code này qua app components để tính toán */}
function GameBoard({ onSelectSquare ,board}) { 
   {/**let gameBoard = initialGameBoard

    for(const Turn of Turns){
        const { square , player } = Turn;
        const { row , col } = square;

        gameBoard[row][col] = player;
    } */}
{/** const [GameBoard,setGameBoard] = useState(initialGameBoard)

function handleSelectSquare(rowIndex,colIndex){
    setGameBoard((prevGameBoard) => {
    const updateGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    // câu lệnh trên sao chép lại mảng để cập nhật lại trạng thái
    //...innerArray là để truy xuất vào từng phần tử của mảng cũ  
    updateGameBoard[rowIndex][colIndex] = ActivePlayerSymbol//ActivePlayerSymbol trạng thái state đã thay đổi liên tục
    return(updateGameBoard)
    })

    onSelectSquare();
}*/}
  return (
    <ol id="game-board">
        {board.map((row,rowIndex) => (
        <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex,colIndex)} 
                        disabled={playerSymbol !== null}
                        >
                            {playerSymbol}</button>
                    </li>
                    ))}
            </ol>
        </li>
        ))}
    </ol>
  )
}

export default GameBoard