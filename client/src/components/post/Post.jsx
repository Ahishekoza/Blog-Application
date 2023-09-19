import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ img }) => {
  return (
    <div className="post">
      <img src={img} alt="" className="postImg"></img>
      <div className="postInfo">
        <div className="postCats">
          <Link className="link" to="/post?cat=Music">
            <span className="postCat">Music</span>
          </Link>
          <Link className="link" to="/post?cat=Life">
            <span className="postCat">Life</span>
          </Link>
        </div>
        <Link className="link" to='/post/abc'>
          <span className="postTitle">Lorem ipsum dolor sit amet</span>
        </Link>
        <span className="postDate">1 hour ago</span>
        <p className="postDesc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
          fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
          atque, exercitationem quibusdam, reiciendis odio laboriosam? Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Assumenda officia
          architecto deserunt deleniti? Labore ipsum aspernatur magnam fugiat,
          reprehenderit praesentium blanditiis quos cupiditate ratione atque,
          exercitationem quibusdam, reiciendis odio laboriosam? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Assumenda officia
          architecto deserunt deleniti? Labore ipsum aspernatur magnam fugiat,
          reprehenderit praesentium blanditiis quos cupiditate ratione atque,
          exercitationem quibusdam, reiciendis odio laboriosam?
        </p>
      </div>
    </div>
  );
};

export default Post;
