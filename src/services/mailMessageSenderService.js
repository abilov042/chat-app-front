import axios from "axios";
import { DOMAIN } from "../static/hostname";

export class MailMessageSenderService{

    sendMessage(value){
        
        return axios.post(DOMAIN+"/api/chatapp/mail/sendMessage?email="+value)
    }

    checkCode(value){

        return axios.post(DOMAIN+"/api/chatapp/mail/checkCode", value)
    }
}