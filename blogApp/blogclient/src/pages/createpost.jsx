import { useState } from 'react';
import ReactQuill from 'react-quill';
import {Navigate} from 'react-router-dom'
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

export function CreatePost(){
    let[title,settitle]= useState('');
    let[summary,setsummary]= useState('');
    let[file,setfile]= useState('');
    let[content,setcontent]= useState('');
    let[redirect,setredirect]= useState(false);
    async function CreateNewPost(ev){
        ev.preventDefault();
        console.log(title,summary,content);
        let data= new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('file',file[0]);
        data.set('content',content);
        const res=await fetch("http://localhost:8080/post",{
            method:'POST',
            body: data,
            credentials:"include"
        });
       if(res.ok){
            setredirect(true);
       }
    }
    if(redirect){
        return <Navigate to="/"></Navigate>
    }
    return (
    <>
        <form onSubmit={CreateNewPost} >
            <h2 style={{textAlign:"center"}}>Creat New Post</h2>
            <input type="text" name="title" placeholder="Title" value={title} onChange={ev=>settitle(ev.target.value)}/>
            <input type="text" name="summary" placeholder="Summary" value={summary} onChange={ev=>setsummary(ev.target.value)}/>
            <input type="file" name="image" onChange={(ev)=>{setfile(ev.target.files)}}/>
            <ReactQuill name="content" value={content} modules={modules} onChange={newval=>setcontent(newval)} formats={formats} placeholder='Content' ></ReactQuill>
            <button className="form-btn">CreatePost</button>
        </form>

    </>
        );
}   