import axios from "axios";


const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
export class UserService{

    async postUserSignup(values){

        return await axios.post("http://localhost:8080/api/auth/signup", values)
    }

   

     async postUserSignin(values) {
        try {
          const response = await axios.post("http://localhost:8080/api/auth/signin", values, config, {
            withCredentials: true,
          });
      
          return response;
        } catch (error) {
          throw error;
        }
      }

    getUsers(){

        return axios.get("http://localhost:8080/api/user/getall")
    }


}