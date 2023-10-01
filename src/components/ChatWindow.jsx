import React from 'react';
import { Layout, theme } from 'antd';
import Stomp from 'stompjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
const { Header, Content, Footer } = Layout;


const ChatWindow = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [receivedDataS, setReceivedDataS] = useState("")
  const ref = useRef();
 
  
  
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop  = ref.current.scrollHeight;
    }


    const socket = new WebSocket('ws://192.168.0.105:8080/chat');
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      console.log('STOMP bağlantısı başarıyla açıldı.');
      setStompClient(client);

      client.subscribe('/topic/message', (message) => {
        
        const receivedData = JSON.parse(message.body);
        setReceivedDataS(receivedData)
        setMessages((prevMessages) => [...prevMessages, receivedData.message]);
        
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [receivedDataS]);

  const sendMessage = () => {
    if (!messageInput || messageInput.trim() === '') {
      return; // Boş mesaj gönderme işlemini engelle
    }

    if (stompClient) {
      const data = {
        message: messageInput,
      };
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
      
      </Header>
      <Content
        style={{
          padding: '0 50px',
          overflowY:"auto",
          height:"500px", 
          backgroundImage:"url('https://top-fon.com/uploads/posts/2022-09/1663557622_13-top-fon-com-p-fon-vatsap-serii-foto-16.jpg')"
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
          <div style={{display:"flex", justifyContent:"end", padding:"2px"} }>
            <div style={{ backgroundColor:"#e7ffdb", borderRadius:"10px", padding:"3px" }}>
              <p style={{color:"black", padding:"10px"}} key={index}>{msg}</p>
            </div>
          </div>
          
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