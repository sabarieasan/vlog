import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { useBlogContext } from "./context/blogContext";
import NavBar from "./component/NavBar";
import Profile from "./profileUpdation/profile";

function App() {
  const { isLogin } = useBlogContext();

  return (
    <main>
      <Routes>
        <Route path="/" element={isLogin ? <NavBar /> : <SignUp />}>
          <Route index={true} element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
