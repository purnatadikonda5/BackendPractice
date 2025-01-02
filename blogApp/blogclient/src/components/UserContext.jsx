import { createContext, useState } from "react";

export let UserContext= createContext({});

export function UserContextProvider(props){
    let [userinfo,setuserinfo]= useState({});
    return <UserContext.Provider value={{userinfo,setuserinfo}}>
       <div>{props.children}</div>
    </UserContext.Provider>
}