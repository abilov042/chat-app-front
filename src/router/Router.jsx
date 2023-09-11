import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import ChatWindow from "../components/ChatWindow";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<ChatWindow />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
