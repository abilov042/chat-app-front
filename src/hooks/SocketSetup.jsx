import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketSetUp = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const room = 'your_room_name'; // Qoşulmaq istədiyiniz oda adını burada dəyişin

  useEffect(() => {
    // WebSocket bağlantısını yalnızca bir defa yaratmaq üçün bu əməliyyatı bir dəfə icra edin
    if (!socket) {
      const newSocket = io('ws://localhost:8081', {
        query: { room },
      });

      newSocket.on('get_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
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
      <button onClick={sendMessage}>Göndər</button>
    </div>
  );
};

export default SocketSetUp;
