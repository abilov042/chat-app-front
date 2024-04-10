import axios from "axios";
import { URL } from "../static/hostname";

export class MailMessageSenderService{

    sendMessage(value){
        
        return axios.post(URL+"/api/chatapp/mail/sendMessage?email="+value)
    }

    checkCode(value){

        return axios.post(URL+"/api/chatapp/mail/checkCode", value)
    }
}