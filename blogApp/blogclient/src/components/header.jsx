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
  {console.log("userinfo",userinfo);}
  useEffect(()=>{
    console.log("fetching");
    fetch("http://localhost:8080/profile",{
      credentials:"include"
    }).then(res=>{
      res.json().then(ress=>setuserinfo(ress))
    }).catch(e=>console.log("err",e))
  },[])
  {console.log("baya",userinfo)}
    return (
        <header>
          <Link to="/" className="logo">MY LOGO</Link>
           <nav>
              {((Object.keys(userinfo).length === 0) || (userinfo==null)) &&(
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            {(!(Object.keys(userinfo).length === 0) && (userinfo!=null)) && (
              <>
                <Link to="/create">CreateNewPost</Link>
                <a onClick={logout}>Logout</a>
              </>
            ) }
          </nav> 
        </header>
    )
}