import axios from "axios";
import { DOMAIN } from "../static/hostname";

export class RoomService {

    postRoom(roomName){

        return axios.post(DOMAIN+'/api/room/check?roomName='+roomName)
    }
    

}

