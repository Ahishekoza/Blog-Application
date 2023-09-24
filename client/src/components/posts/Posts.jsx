import Post from "../post/Post";
import "./Posts.css";
import { useAuth } from "../../context/authContext";

const Posts = (props) => {
  // eslint-disable-next-line
  const [user, setUser] = useAuth();
  return (
    <div className={props.class}>
      {props.posts.map((post) => {
        return (
          <Post
            class={user.token && user.user ? "post" : "post_without_sidebar"}
            post={post}
          />
        );
      })}
    </div>
  );
};

export default Posts;
