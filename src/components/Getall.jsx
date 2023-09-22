import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserService } from "../services/userService";



  
export default function Getall() {
const [users, setUsers] = useState([]);

  useEffect(() => {
   let userService = new UserService();
   userService.getUsers().then(response => setUsers(response.data.data))
  }, []);
  return (
    <div>
      <h1>Salam</h1>
      {users.map((user) => {
        return (
            <div>
                <h1>{user.username}</h1>
            </div>
        )
      })}
    </div>
  );
}
