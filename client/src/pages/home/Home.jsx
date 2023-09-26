import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/authContext";
import "./Home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  //  eslint-disable-next-line
  const [user, setUser] = useAuth();
  const [posts, setPosts] = useState([]);
  const [nopost,setNoPost] = useState("")

  const {search} = useLocation()

  const getAllPosts = async () => {
    if (user.user.username.trim() === "") {
      // Set posts to null when the username is empty
      setPosts([]);
      return;
    }

   else if(search === ""){

      try {
        const response = await axios.get(`/post?user=${user.user.username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setPosts(response.data.BlogPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }

    else{
      try {
        const response = await axios.get(`/post${search}`, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        });
        if(response.data.BlogPosts.length === 0){

        }
        setPosts(response.data.BlogPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }

  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, [user.user.username,search]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts
          posts={posts}
          class={user.token && user.user ? "posts" : "posts_without_sidebar"}
        />
        {user.token && user.user ? (
          <>
            <Sidebar />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
