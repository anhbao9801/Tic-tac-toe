import { useState } from "react"


import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
  // này để tạo ma trận bảng để làm game
] 

function deriveActivePayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
  // câu lệnh này để kiểm tra lượt chơi mới nhất của player
}

function App() {
  //const [ activePlayer, setActivePlayer] = useState("X") mình có thể loại  ỏ trạng thái này cho bên dưới đã có update nên có thể tận dụng lại
  const [gameTurns , setGameTurns] = useState([])
  const [player,setPlayer] = useState({
    X : "Player 1",
    O : "Player 2"
    }
  )
  const activePlayer = deriveActivePayer(gameTurns)
//
  let gameBoard = [...initialGameBoard.map(InnerArray => [...InnerArray])]
  let winner
    for(const Turn of gameTurns){
        const { square , player } = Turn;
        const { row , col } = square;

        gameBoard[row][col] = player;
    }

    for(const combination of WINNING_COMBINATIONS){
      const  firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const  secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const  thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
      console.log(firstSquareSymbol)
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = player[firstSquareSymbol]
      }
    }
    const hasDraw = gameTurns.length === 9 && !winner

  function handleDraw(){
    setGameTurns([])
  }

  function handleChangeNamePlayer(symbol,newName){
    setPlayer(prePlayer => {
      return {
        ...prePlayer,
        [symbol] : newName
      }
      }
    )
  }

  function handleSelectSquare( rowIndex , colIndex ){
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    //câu lệnh này có nghĩa là tạo điều kiện để thay đổi symbol 'X' với 'O'
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePayer(prevTurns)
      
      // câu lệnh này để kiểm tra lượt chơi mới nhất của player
    const updateTurns = [
      {square : {row : rowIndex , col : colIndex} , player : currentPlayer }, ...prevTurns,
      ];
      return updateTurns 
    })
    
    // setGameturn đây là 1 cách để cập nhât trạng thái mới cho gameboard khi ko dùng cách cũ
    // sử dụng cách này sẽ làm mình ít sử dụng useState để quản lý trạng thái ở những trang khác sẽ tối ưu hơn
  }
  return (
    <>
      <header>
         <img src="game-logo.png" alt="game-tic-tac-toe"/>
         <h1>TIC-TAC-TOE</h1>
       </header>
    <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name="Player 1" symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handleChangeNamePlayer}/>
            <Player name="Player 2" symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handleChangeNamePlayer}/>
           </ol>
            {(winner || hasDraw) && <GameOver winner = {winner} onRestart = {handleDraw}/>}
            <GameBoard onSelectSquare={handleSelectSquare} 
            board = {gameBoard}/>
         </div>
         <Log turns = {gameTurns}/>
    </main>
    </>
  )
}

export default App
