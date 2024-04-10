import axios from "axios";
import { URL } from "../static/hostname";

export class RoomService {

    postRoom(roomName){

        return axios.post(URL+'/api/room/check?roomName='+roomName)
    }
    

}

