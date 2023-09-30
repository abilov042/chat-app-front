import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import ChatWindow from "../components/ChatWindow";
import GetAll from '../components/Getall'
import Shamil from "../components/Shamil";


export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatRoom" element={<ChatWindow/>}/>
      </Routes>
    </div>
  );
}
