import axios from "axios";

export class UserService{

    async postUserSignup(values){

        return await axios.post("http://localhost:8080/api/auth/signup", values)
    }

    async postUserSignin(values){

        return await axios.post("http://localhost:8080/api/auth/signin", values)
    }

    getUsers(){

        return axios.get("http://localhost:8080/api/user/getall")
    }
}