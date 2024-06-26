import axios from "axios";
import { URL } from "../static/hostname";


const apiUrl = URL+'/api/';


const customApiConfig = {
  headers:{'Authorization' : 'Bearer ' + localStorage.getItem("jwtToken"),
    'Content-Type': 'application/json',
  }
 
};

export class UserService {
  async postUserSignup(values) {
    try {
      const response = await axios.post(
        apiUrl + "auth/signup",
        values,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

   async postUserSignin(values) {
    try {
      const response = await axios.post(
         apiUrl+ "auth/signin",
        values,
       
       
      );
      
      return response;
    } catch (error) {
      throw error;
    }
  }

   getUsers() {
   
    return  axios.get(apiUrl+ "user/getall",
    {headers:{'Authorization' : 'Bearer ' + localStorage.getItem("jwtToken"),
    'Content-Type': 'application/json',
  }});
  }

  async getTest(){

    return await axios.get(apiUrl+ "user/getTest",customApiConfig)
  }
}
