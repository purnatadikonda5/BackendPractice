import {formatISO9075} from 'date-fns'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Post({_id,title,summary,author,Cover,createdAt}){
  let [info,setinfo]= useState({});
  useEffect(()=>{
    fetch("http://localhost:8080/profile",{
      credentials:"include",
    }).then((res)=>{
      res.json().then(ress=>setinfo(ress));
    })
    .catch(e=>console.log(e));
  },[])
    return (
        <div className="post">
          <Link to={'post/'+_id}>
          <div className="image"><img src={'http://localhost:8080/uploads/'+Cover} alt="THIS IS MY IMAGE" className="post-img" /></div>
          </Link>
          <div className="content">
          <Link to={'post/'+_id}>
          <h2 className="post-head">{title}</h2>
          </Link>
          <p className="info"><a href="" className="author"><i>{author ? author.Username : "KittuGreat"}</i>
          </a>&nbsp;&nbsp;&nbsp;&nbsp;<time>{formatISO9075(new Date(createdAt))}</time> </p>
          {console.log(" i am id you know ",_id)}
          {(Object.keys(info).length>0 && info.id==author._id)&& (<div className="editbtnbox"><Link to={`/editpostpage/${_id}`}><button className="editbtn">Edit your post</button></Link></div>)}
          <p className="post-dis"> {summary}</p>
          </div>
        </div>
    );
}