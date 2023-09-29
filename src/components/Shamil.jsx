import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';

const Shamil = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // STOMP istemcisini oluştur
    const socket = new WebSocket('ws://localhost:8080/chat',); // WebSocket sunucusunun URL'sini ayarlayın
    const stomp = Stomp.over(socket);

    // WebSocket açıldığında
    socket.addEventListener('open', (event) => {
      console.log('WebSocket bağlantısı başarıyla açıldı.');

      // STOMP istemcisini başlat
      stomp.connect({}, (frame) => {
        console.log('STOMP bağlantısı başarıyla açıldı.');
        setStompClient(stomp);
      });
    });

    // Mesaj alındığında
    stomp.connect({}, (frame) => {
      console.log("Aqil")
      stomp.subscribe('/topic/message', (message) => {
        console.log(message);
        const receivedData = JSON.parse(message.message);
        setMessages((prevMessages) => [...prevMessages, receivedData]);
      });
    });

    // WebSocket kapanırsa
    socket.addEventListener('close', (event) => {
      console.log('WebSocket bağlantısı kapatıldı.');

      // STOMP istemcisini kapat
      if (stompClient) {
        stompClient.disconnect();
      }
    });

    // Komponentin temizlenmesi sırasında bağlantıları kapat
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message.trim() !== '') {
      const data = {
        //username: username,
        message: message,
      };
      stompClient.send('/chat', {}, JSON.stringify(data));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>React WebSocket Chat</h1>
      <div className="message-box">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Kullanıcı Adınız"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mesajınızı yazın"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
};

export default Shamil;
