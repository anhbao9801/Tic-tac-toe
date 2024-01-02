import { useState } from "react"

function Player( {name , symbol , isActive,onChangeName} ) {
    const [ changePlayer , setChangePlayer] = useState(name)
    const [isEditing,setIsEditing] = useState(false)
    function handleChangePlayer(event){
        setChangePlayer(event.target.value)
    }
    function handleClickEditing(){
        setIsEditing((editing)=>!editing) //mình dùng 1 hàm ở đây để cho react biết mình luôn 
        //sẳn sàng làm việc với 1 trạng thái được cập nhật mới nhất
        //setIsEditing(!isEditing) ko nên dùng kiểu này vì react sẽ ko nhật được trạng thái làm việc mới nhất
        if(isEditing){
        onChangeName(symbol,changePlayer)
      }
    }
    let playername = <span className="player-name">{changePlayer}</span>
    let btn = "Edit"
    if(isEditing){
        playername = 
        <input type="text" required value={changePlayer} onChange={handleChangePlayer}/>
        btn = "Save"
    }
  return (
      <li className={isActive ? 'active' : undefined}>
        {/** câu trên là để điều kiện xem trạng thái nào đang hoạt động để active css cho player đó */}
        <span className="player">
          {playername}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClickEditing}>{btn}</button>
      </li>
  )
}

export default Player