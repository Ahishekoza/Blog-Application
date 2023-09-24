/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react'
import './Write.css'
import { useAuth } from '../../context/authContext'
import { PF } from '../../baseInstance,'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Write = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line 
  const [user,setUser] = useAuth()
  const [post,setPost] = useState({
    title:'',
    desc:'',
    username:user.user.username ,
    blogPost:null
  })
  const [file,setFile] = useState()
  const [open,setOpen] = useState(false)
  const [message,setMessage]= useState("")

  const handlePost = async(e) =>{
    e.preventDefault()
    const postData = new FormData()
    postData.append('title',post.title)
    postData.append('desc',post.desc)
    postData.append('username',post.username)
    if(file){
      postData.append('blogPost',file)
    }
    console.log(postData)
   await axios.post('/post/',postData,{headers:{Authorization: `Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>{
    setOpen(true)
    setMessage("Blog Post Created Successfully!")
    console.log(response);
   }).catch((error) =>{
       setMessage(error.message)
   })

    
  }


  const handleClose = () => {
    setOpen(false)
    setMessage("")
    navigate('/')
  }
 

  return (
    <div className='write'>
        <img src={file? URL.createObjectURL(file) : PF+post.blogPost} alt="Blog Image" className="writeImg" />
        <form className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
                </label>
                <input type="file" id='fileInput'  className='writeInput' style={{display:'none'}}  onChange={(e)=>setFile(e.target.files[0])}/>
                <input type='text' placeholder='Title' className='writeInput' value={post.title} onChange={(e)=>setPost({...post,title:e.target.value})} />
            </div>
            <div className="writeFormGroup">
                <textarea className="writeInput writeText" placeholder='Tell Your Story' value={post.desc} onChange={(e)=>setPost({...post,desc:e.target.value})}>
                </textarea>
            </div>
            <button className='writeSubmit' onClick={handlePost}>Publish</button>
        </form>

        <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default Write