import axios from "axios";

export class RoomService {

    postRoom(roomName){

        return axios.post('http://localhost:8080/api/room/check?roomName='+roomName)
    }
    

}

