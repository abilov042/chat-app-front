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
        console.error(e)
      })
      
   }

   let onChangeRoomName = (room)=> {
        setRoomName(room)
        
   }
   
  return (
    <div >
     <div style={{ height:"500px",display:"flex", justifyContent:"center", alignItems:"center"}}>
     <input placeholder='Enter room name' style={{width:"300px", height:"30px", borderRadius:"10px"}} onChange={(e) => onChangeRoomName(e.target.value)} type="text" />
      <button style={{backgroundColor:"#2185d0", color:"white", border:"none", width:"80px", height:"30px", borderRadius:"10px"}} onClick={()=> onClickRoom()}>Send</button>
      {roomResponse?<p>Room finded {roomResponse.roomName}</p>:null}
     </div>
      
    </div>
  )
}

export default ChatRoomRegister
