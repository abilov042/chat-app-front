import React from 'react';
import { Layout, theme } from 'antd';
import Stomp from 'stompjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { MessageService } from '../services/messageService';
const { Header, Content, Footer } = Layout;


const ChatWindow = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [randNumberForColor, setRandomNumberForColor] = useState(0);
  const ref = useRef();

  const colorCodes = [
    "#FF5733",   // Açık Kırmızı
    "#33FF57",   // Açık Yeşil
    "#3385FF",   // Açık Mavi
    "#ff0000",   // Sarı
    "#FFA500",   // Turuncu
    "#9B30FF",   // Orta Mor
    "#FFB6C1",   // Açık Pembe
    "#40E0D0",   // Turkuaz
    "#0000ff",   // Altın Rengi
    "#808080"    // Gri
];


 
  useEffect(()=>{
    let messageService = new MessageService()
    let roomid = localStorage.getItem("roomId")
    console.log(roomid)
    console.log('Salam');
     messageService.getMessage(roomid).then((res)=> {
      setMessages(res.data.data)
      console.log("salammm " + res.data.data);
    }).catch(e => {
      console.log(e);
    })

    setRandomNumberForColor( Math.floor(Math.random() * 100));
  },[])
  
  useEffect(() => {

    const socket = new WebSocket('ws://192.168.0.105:8080/chat');
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      console.log('STOMP bağlantısı başarıyla açıldı.');
      setStompClient(client);

      client.subscribe('/topic/message', (message) => {
        const receivedData = JSON.parse(message.body);
        console.log(receivedData.message);
        setMessages((prevMessages) => [...prevMessages, receivedData]);
        
      });
    });
     
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(()=>{
    if (ref.current) {
      ref.current.scrollTop  = ref.current.scrollHeight;
    }
  },[messages])

  const sendMessage = () => {
    if (!messageInput || messageInput.trim() === '') {
      
      return; // Boş mesaj gönderme işlemini engelle
    }

    if (stompClient) {
      
      const data = {
        message: messageInput,
        room: {
          id: localStorage.getItem("roomId"),
          roomName: localStorage.getItem('roomName')
        },
        user: {
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username')
        }
      }
      stompClient.send('/chat', {}, JSON.stringify(data));
      setMessageInput('');
     
    }
  };
  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
      <div style={{width:"550px"}}>
    <Layout >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{display:"flex", justifyContent:"center"}}>
          <h3  style={{color:"white"}}>{localStorage.getItem("roomName")}</h3>
        </div>
      
      </Header>
      <Content
        style={{
          padding: '0 50px',
          overflowY:"auto",
          scrollBehavior: "smooth",
          height:"500px", //https://top-fon.com/uploads/posts/2022-09/1663557622_13-top-fon-com-p-fon-vatsap-serii-foto-16.jpg
          backgroundImage:"url('chatAppBackGroundImg.jpg')"
        }}
        ref={ref}
      >
        
        <Layout
          style={{
            padding: '24px 0',
            
           background: "none",
          }}
        >
          {/* <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            Content
          </Content> */}
          <div  className="message-box">
            
        {messages.map((msg, index) => (
          msg.user.id== localStorage.getItem('id')?(
          <div style={{display:"flex", justifyContent:"end", padding:"2px"} }>
            <div style={{ backgroundColor:"#e7ffdb", borderRadius:"10px", padding:"3px" }}>
            <div style={{padding:"4px", display:"flex", flexDirection:"column", justifyContent:"end"}}>
              <div style={{display:"flex", justifyContent:"end"}}>
                <p style={{ fontSize:"13px",color:colorCodes[(msg.user.id * randNumberForColor)%9], margin:"0px", }}>{msg.user.username}</p>
              </div>
                 
                 <p style={{color:"black"}} key={index}>{msg.message}</p>
              </div>
            </div>
          </div>
          ):(
          <div style={{display:"flex", justifyContent:"start", padding:"3px"} }>
            <div style={{ backgroundColor:"#e7ffdb", borderRadius:"10px", padding:"3px" }}>
              <div style={{padding:"4px", display:"flex", flexDirection:"column", justifyContent:"start"}}>
              <div style={{display:"flex", justifyContent:"start"}}>
                <p style={{ fontSize:"13px",color:colorCodes[(msg.user.id * randNumberForColor)%9], margin:"0px", }}>{msg.user.username}</p>
              </div>
                 <p style={{color:"black"}} key={index}>{msg.message}</p>
              </div>
           
              
            </div>
          </div>
          )
        ))}
      </div>
        </Layout>
       
      </Content>
      <Footer>
         <input
         style={{width:"75%", height:"35px", borderRadius:"8px", border:"none"}}
        type="text"
        placeholder="Mesajınızı yazın"
        value={messageInput}
         onChange={(e) => setMessageInput(e.target.value)}
      />
      
      <button style={{padding:"35" , height:"35px",backgroundColor:messageInput?"#6f8ff7":"#8ea6f5" , border:"none", color:"white",marginLeft:"8px" , borderRadius:"15px"}} disabled={!messageInput} onClick={sendMessage}>Gönder</button>
      </Footer>
    </Layout>

      </div>
    </div>
  );
};
export default ChatWindow;