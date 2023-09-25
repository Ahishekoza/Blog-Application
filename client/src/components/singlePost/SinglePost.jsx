import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { PF } from "../../baseInstance,";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

const SinglePost = () => {
  const navigate =  useNavigate()
  // -- use PostId to get a single post info
  const { postId } = useParams()
  const [singlepost, setSinglePost] = useState({})
  const [updateBlog, setUpdateBlog] = useState(false)
  const [file, setFile] = useState(null)
  const [open,setOpen] = useState(false)
  const [message,setMessage] = useState("")

  const SinglePost = async () => {
    await axios.get(`/post/${postId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }).then((response) => {
      setSinglePost(response.data.BlogPost)
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleUpdate = async () => {

    const updatedPostData = new FormData()
    updatedPostData.append('title', singlepost.title)
    updatedPostData.append('desc', singlepost.desc)
    updatedPostData.append('username', singlepost.username)
    if (file) {
      updatedPostData.append('blogPost', file)
    }

    await axios.put(`/post/update/${postId}`, updatedPostData, { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }).then((response) => {
      setOpen(true)
      setMessage(response.data.message)
    }).catch((err) => {
      setMessage(err)
    })

  }
  
  const handleClose = ()=>{
    setOpen(false)
    setMessage("")
    setUpdateBlog(false)
    navigate('/')
  }

  useEffect(() => {
    SinglePost()
    //  eslint-disable-next-line
  }, [postId])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={file ? URL.createObjectURL(file) : singlepost.blogPost !== '' ? PF + singlepost.blogPost : ''}
          alt=""
          srcset=""
        />
        {
          updateBlog ?
            <>
              <div className="singlePostUpdate">
                <div>
                  <label htmlFor="file"><i className="writeIcon fas fa-plus" style={{ cursor: "pointer" }}></i></label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}></input>
                </div>
                <div className="singlePostUpdateTitle">
                  <label id="updateTitle">Title:</label>
                  <input type="text" id="updateTitle" value={singlepost.title} onChange={(e) => setSinglePost({ ...singlepost, title: e.target.value })} />
                </div>
                <div className="singlePostUpdateButton">
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={()=>setUpdateBlog(false)}>Undo</button>
                </div>
              </div>


            </>
            :
            <> <h1 className="singlePostTitle">
              {singlepost.title}
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateBlog(true)}></i>
                <i className="singlePostIcon far fa-trash-alt"></i>
              </div>
            </h1></>
        }

        <div className="singlePostInfo">
          {
            updateBlog ?
              <>
                <span>
                  Author:
                  <b className="singlePostAuthor">{singlepost.username}</b>
                </span>
              </>
              :
              <>
                <span>
                  Author:
                  <b className="singlePostAuthor">{singlepost.username}</b>
                </span>
                <span>{new Date(singlepost.updatedAt).toDateString()}</span></>
          }

        </div>
        {
          updateBlog ?
            <>
              <textarea className="writeInput writeText" placeholder={singlepost.desc} onChange={(e) => setSinglePost({ ...singlepost, desc: e.target.value })}>
              </textarea>
            </>
            :
            <>
              <p className="singlePostDesc">
                {singlepost.desc}
              </p>

            </>
        }
      </div>


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
  );
};

export default SinglePost;
