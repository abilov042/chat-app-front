import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';

const ChatApp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/chat');
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
    <div>
      <h1>React WebSocket Chat</h1>
      <div className="message-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Mesajınızı yazın"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
};

export default ChatApp;
