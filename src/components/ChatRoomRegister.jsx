import React from 'react'
import { useState } from 'react'
import { RoomService } from '../services/roomService'
import { useNavigate } from 'react-router-dom'

const ChatRoomRegister = () => {
   const [roomName, setRoomName] = useState("")
   const [roomResponse, setRoomResponse] = useState(null)
   const navigate = useNavigate();

   let onClickRoom = () => {
      let roomService = new RoomService()
      roomService.postRoom(roomName).then((res)=> {
        setRoomResponse(res.data.data)
        localStorage.setItem("roomName",res.data.data.roomName)
        localStorage.setItem("roomId", res.data.data.id)
        
        if(res.status===200){
          setTimeout(() => navigate('/chatRoom'), 2000)
          
        }
      }).catch((e)=> {
        console.log(e)
      })
      
   }

   let onChangeRoomName = (room)=> {
        setRoomName(room)
        
   }
   
  return (
    <div>
      <input onChange={(e) => onChangeRoomName(e.target.value)} type="text" />
      <button onClick={()=> onClickRoom()}>join room</button>
      {roomResponse?<p>Room finded {roomResponse.roomName}</p>:null}
    </div>
  )
}

export default ChatRoomRegister
