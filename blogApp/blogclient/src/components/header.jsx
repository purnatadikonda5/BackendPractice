import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  let {userinfo,setuserinfo}= useContext(UserContext);
  const navigate= useNavigate();
  let logout=()=>{
    fetch("http://localhost:8080/logout",{
      credentials:"include",
      method:'POST'
    }).then(async()=>{
      await setuserinfo(null);
      navigate("/");
      alert("YOU HAVE BEEN LOGGED OUT SUCCESSFULLY");
    }).catch(e=>console.log(err));
  }
  useEffect(
    ()=>{
      fetch("http://localhost:8080/profile",{
        credentials:"include",
      }).then(resoponse=>{
        resoponse.json().then(UserInfo=>setuserinfo(UserInfo));
      })
    },[]
    )
    return (
        <header>
          <Link to="/" className="logo">MY LOGO</Link>
          <nav>
            {(userinfo!=null && userinfo.username!=null) && (
              <>
                <Link to="/create">CreateNewPost</Link>
                <a onClick={logout}>Logout</a>
              </>
            ) }
            {(userinfo==null) &&(
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
    )
}