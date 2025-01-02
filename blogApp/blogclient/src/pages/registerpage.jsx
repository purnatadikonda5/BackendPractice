import { useState } from "react";

export default function RegisterPage(){ 
    let [username,setusername]= useState('');
    let [password,setpassword]= useState('');
    let [email,setemail]= useState('');
    async function handleSubmit(e){
        e.preventDefault();
        let response= await fetch("http://localhost:8080/register",{
            method:'POST',
            body: JSON.stringify({username,password,email}),      
            headers: {'Content-Type':'application/json'},
        });
        if(response.status==200){
            alert("REGISTERED SUCCSSFULLY");
        }
        else{
            alert("registration failed");
        }
    }
    return (
        <form  className="register" onSubmit={handleSubmit}>
            <h2>REGISTER</h2>
            <input type="text" name="email" className="Email" value={email} onChange={ev=>setemail(ev.target.value)} placeholder="Email" />
            <input type="text" name="username" className="username" value={username} onChange={ev=>setusername(ev.target.value)} placeholder="Username" />
            <input type="password" name="password" className="password" value={password} onChange={ev=>setpassword(ev.target.value)} placeholder="Password"/>
            <button className="form-btn"> Register </button>
        </form>
    )
}