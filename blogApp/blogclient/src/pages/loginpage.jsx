import { useState } from "react"

export default function LoginPage(){ 
    let [username,setusername]= useState('');
    let [password,setpassword]= useState('');
    return (
        <form  className="login" method="post" action="http://localhost:8080/login">
            <h2>LOGIN</h2>
            <input type="text" name="username" className="username" value={username} onChange={ev=>setusername(ev.target.value)} placeholder="Username" />
            <input type="password" name="password" className="password" value={password} onChange={ev=>setpassword(ev.target.value)} placeholder="Password"/>
            <button className="form-btn"> Login </button>
        </form>
    )
}