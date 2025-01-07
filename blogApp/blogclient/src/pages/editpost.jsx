import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import {Navigate, useParams} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
let modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

 let formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export function EditPostpage(){
    let {id}= useParams();
    let[title,settitle]= useState('');
    let[summary,setsummary]= useState('');
    let[file,setfile]= useState(null);
    let[content,setcontent]= useState('');
    let[info,setinfo]=useState({});
    let[redirect,setredirect]= useState(false);
    useEffect(()=>{
        fetch(`http://localhost:8080/post/${id}`).then(res=>{
            res.json().then(
                (ress)=>{
                    settitle(ress.title);
                    setsummary(ress.summary);
                    setcontent(ress.content);
                }
            )
        }).catch(e=>console.log(e));
    },[])
     function EditPost(ev){
        ev.preventDefault();
        // console.log(title,summary,content);
        let data= new FormData();
        data.set('title',title);
        data.set('id',id);
        data.set('summary',summary);
        if(file?.[0]){
            data.set('file',file?.[0]);
        }
        data.set('content',content);
        fetch("http://localhost:8080/post",{
            method:'PUT',
            body: data,
            credentials:"include"
        }).then((res)=>{
            setredirect(true);
        }).catch(e=>console.log(e));
    }
    if(redirect){
        return <Navigate to={`/post/${id}`}></Navigate>
    }
    return (
    <>
        <form onSubmit={EditPost} >
            <h2 style={{textAlign:"center"}}>Edit Post</h2>
            <input type="text" name="title" placeholder="Title" value={title} onChange={ev=>settitle(ev.target.value)}/>
            <input type="text" name="summary" placeholder="Summary" value={summary} onChange={ev=>setsummary(ev.target.value)}/>
            <input type="file" name="image" onChange={(ev)=>{setfile(ev.target.files)}}/>
            <ReactQuill name="content" value={content} modules={modules} onChange={newval=>setcontent(newval)} formats={formats} placeholder='Content' ></ReactQuill>
            <button className="form-btn">UpdatePost</button>
        </form>

    </>
        );
}   