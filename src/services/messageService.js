import axios from "axios";
import { DOMAIN } from "../static/hostname";

export class MessageService {
  getMessage(roomId) {
    console.log(roomId);
    return axios.post(
      DOMAIN+"/api/messages/getByRoomId?id=" + roomId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
      }
    );
  }
}
