import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function Postpage(){
    let [postinfo,setpostinfo]=useState(null);
    let {id}= useParams();
    useEffect(()=>{
        fetch(`http://localhost:8080/post/${id}`).then((res)=>{
            // console.log(res);
            res.json().then((response)=>setpostinfo(response))
        }).catch(e=>console.log(e));
    },[])
    if(!postinfo)return '';
    return (
        <div className="postpage">
            <h2>{postinfo.title}</h2>
            <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
            <div className="author">
                by @<a href="#" ><i>{postinfo.author.Username}</i></a>
            </div>
            <div className="image">
                <img src={`http://localhost:8080/uploads/${postinfo.Cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postinfo.content}}></div>
        </div>
    )
}