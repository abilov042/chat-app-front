import React from 'react'
import { MailMessageSenderService } from '../services/mailMessageSenderService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();


  let submit = ()=>{
    let mailMessageSenderService = new MailMessageSenderService()
    let obj = {
      userId: parseInt(localStorage.getItem("id")),
      code: inputValue
    }
    mailMessageSenderService.checkCode(obj).then(res => {
      if(res.status == 200){
        navigate("/login");
      }
    });
    
  }

  let change = (value)=>{
    setInputValue(value);
  }

  return (
    <div>
      <input style={{width:"150px", height:"50px",fontSize:"30px", border:"0.5px black solid", borderRadius:"5px"}} placeholder='xxx-xxx' onChange={(e)=>change(e.target.value)} type="text" />
      <button style={{border:"none", borderRadius:"10px", width:"80px", height:"50px",color:"white", backgroundColor:"#2185d0"}} onClick={()=>submit()}>send code</button>
    </div>
  )
}

export default Verification
