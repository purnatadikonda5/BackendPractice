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
      await setuserinfo({});
      navigate("/");
      alert("YOU HAVE BEEN LOGGED OUT SUCCESSFULLY");
    }).catch(e=>console.log(err));
  }
  // useEffect(
  //   // ()=>{
  //   //   fetch("http://localhost:8080/profile",{
  //   //     credentials:"include",
  //   //   }).then(response=>{
  //   //     response.json().then(userinfo=>{setuserinfo(userinfo);});
  //   //   }).catch(e=>console.log("err is ,",e));
  //   // },[]
  //   )
    let username= false;console.log(userinfo);
    if(userinfo!=null){username=true}
    // {console.log(userinfo)}
    return (
        <header>
          <Link to="/" className="logo">MY LOGO</Link>
           <nav>
              {(Object.keys(userinfo).length === 0) &&(
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            {!(Object.keys(userinfo).length === 0) && (
              <>
                <Link to="/create">CreateNewPost</Link>
                <a onClick={logout}>Logout</a>
              </>
            ) }
          </nav> 
        </header>
    )
}