import axios from "axios";
import { URL } from "../static/hostname";

export class MessageService {
  getMessage(roomId) {
    console.log(roomId);
    return axios.post(
      URL+"/api/messages/getByRoomId?id=" + roomId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    );
  }
}
