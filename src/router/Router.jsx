import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import ChatWindow from "../components/ChatWindow";
import ChatRoomRegister from "../components/ChatRoomRegister";
import Verification from "../components/Verification";


export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<ChatRoomRegister />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatRoom" element={<ChatWindow/>}/>
        <Route path="/verification" element={<Verification/>}/>
      </Routes>
    </div>
  );
}
