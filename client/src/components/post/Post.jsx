import { PF } from "../../baseInstance,";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {

  
  return (
    <div className={props.class}>
      <img src={props.post.blogPost !== '' ? PF+props.post.blogPost :''} alt="" className="postImg"></img>
      <div className="postInfo">
        <div className="postCats">
          <Link className="link" to="/post?cat=Music">
            <span className="postCat">Music</span>
          </Link>
          <Link className="link" to="/post?cat=Life">
            <span className="postCat">Life</span>
          </Link>
        </div>
        <Link className="link" to={`/post/${props.post._id}`}>
          <span className="postTitle">{props.post.title}</span>
        </Link>
        <span className="postDate">{new Date(props.post.updatedAt).toDateString()}</span>
        <p className="postDesc">
          {props.post.desc}
        </p>
      </div>
    </div>
  );
};

export default Post;
