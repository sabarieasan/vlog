import React from "react";
import { useBlogContext } from "../context/blogContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  const { setIsLogin } = useBlogContext();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLogin(false);
    });
  };

  return (
    <>
      <nav>
        <Link to="/"> Home </Link>

        <Link to="/create"> Create Post </Link>
        <button onClick={signUserOut}> Log Out</button>

        <Link to="/profile"> Profile </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;
