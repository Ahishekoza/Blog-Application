import { useParams } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { PF } from "../../baseInstance,";

const SinglePost = () => {

  // -- use PostId to get a single post info
  const {postId} = useParams()
  const [singlepost,setSinglePost] = useState({})

  const SinglePost = async() => {
    await axios.get(`/post/${postId}`,{headers:{Authorization:`Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>{
      setSinglePost(response.data.BlogPost)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(()=>{
    SinglePost()
  })

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={singlepost.blogPost !== '' ? PF+singlepost.blogPost : ''}
          alt=""
          srcset=""
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{singlepost.username}</b>
          </span>
          <span>{new Date(singlepost.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
         {singlepost.desc}
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
