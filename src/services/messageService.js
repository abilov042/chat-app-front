import axios from "axios";

export class MessageService {
  getMessage(roomId) {
    return axios.post(
      "http://localhost:8080/api/messages/getByRoomId?id=" + roomId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    );
  }
}
