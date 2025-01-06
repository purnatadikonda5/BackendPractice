import { useEffect, useState } from "react";
import Post from "../components/post";

export default function Indexpage(){
    let [posts,setposts]=useState({});
    useEffect(()=>{
        fetch('http://localhost:8080/post').then((response=>{
            response.json().then(po=>setposts(po));
        }))
    },[])
    return (
        <>
        {/* <Post /> */}
            {((Object.keys(posts).length >0)) &&(
                posts.map(post=>(
                    <Post {...post}/>
                ))
            )}
        </>
      
    )
}