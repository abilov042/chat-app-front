import React from 'react';
import { Layout, theme } from 'antd';
import Stomp from 'stompjs';
import { useState } from 'react';
import { useEffect } from 'react';
const { Header, Content, Footer } = Layout;


const ChatWindow = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.105:8080/chat');
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      console.log('STOMP bağlantısı başarıyla açıldı.');
      setStompClient(client);

      client.subscribe('/topic/message', (message) => {
        
        const receivedData = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedData.message]);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

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
          overflowY:"scroll",
          height:"500px",
          backgroundImage:"url('https://top-fon.com/uploads/posts/2022-09/1663557622_13-top-fon-com-p-fon-vatsap-serii-foto-16.jpg')"
        }}
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
          <div style={{display:"flex", justifyContent:"end"}}>
            <div style={{ backgroundColor:"green", borderRadius:"10px", padding:"5px" }}>
              <h3 style={{color:"white", padding:"10px"}} key={index}>{msg}</h3>
          </div>
          </div>
          
        ))}
      </div>
        </Layout>
       
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
         <input
         style={{width:"80%"}}
        type="text"
        placeholder="Mesajınızı yazın"
        value={messageInput}
         onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Gönder</button>
      </Footer>
    </Layout>

      </div>
    </div>
  );
};
export default ChatWindow;