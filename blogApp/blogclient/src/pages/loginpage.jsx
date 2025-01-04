import { useContext, useState } from "react"
import {Navigate, useNavigate} from "react-router-dom"
import { UserContext } from "../components/UserContext";
export default function LoginPage(){ 
    let [username,setusername]= useState('');
    let [password,setpassword]= useState('');
    const navigate= useNavigate();
    let {userinfo,setuserinfo}= useContext(UserContext);
    async function handleSubmit(e){
       e.preventDefault();
        let response= await fetch("http://localhost:8080/login",{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials:"include"
       });
       if(response.ok){
           response.json().then(async(res)=>{
            await setuserinfo(res);
            navigate("/");
            }).catch(e=>console.log(e));
       }
       else{
        alert("wrong Credentials");
       }
    }
    return (
        <form  className="login" onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <input type="text" name="username" className="username" value={username} onChange={ev=>setusername(ev.target.value)} placeholder="Username" />
            <input type="password" name="password" className="password" value={password} onChange={ev=>setpassword(ev.target.value)} placeholder="Password"/>
            <button className="form-btn"> Login </button>
        </form>
    )
}