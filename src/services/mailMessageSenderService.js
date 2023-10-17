import axios from "axios";

export class MailMessageSenderService{

    sendMessage(value){
        
        return axios.post("http://localhost:8080/api/chatapp/mail/sendMessage?email="+value)
    }

    checkCode(value){

        return axios.post("http://localhost:8080/api/chatapp/mail/checkCode", value)
    }
}