import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketSetUp = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const room = 'your_room_name'; // Bağlanmak istediğiniz oda adını burada değiştirin

  useEffect(() => {
    // WebSocket bağlantısını yalnızca bir kez oluşturun
    if (!socket) {
      const newSocket = io('ws://localhost:8081', {
        query: { room },
      });

      newSocket.on('connect', () => {
        console.log('WebSocket bağlantısı kuruldu.');
      });

      newSocket.on('get_message', (receivedMessage) => {
        setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [socket, room]);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('send_message', { message, room });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
};

export default SocketSetUp;
