import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";

export const useSocket = (room) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    room: "",
    message: "",
    username: "",
    messageType: "",
    createdDateTime: "",
  });
  const [isConnected, setConnected] = useState(false);
  const sendData = useCallback(
    (payload) => {
      socket.emit("send_message", {
        content: payload.content,
      });
    },
    [socket, room]
  );
  useEffect(() => {
    const s = io("http://localhost:8081", {
      reconnection: false,
      query: `room=${room}`, //"room=" + room+",username="+username,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    s.on("read_message", (res) => {
      console.log(res);
      setSocketResponse({
        message: res.content,
      });
    });
    return () => {
      s.disconnect();
    };
  }, [room]);

  return { socketResponse, isConnected, sendData };
};
