import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useAuth } from '../../context/authContext'
import './Home.css'
import axios from 'axios'

const Home = () => {

  //  eslint-disable-next-line
  const [user,setUser] = useAuth()
  const [posts,setPosts] = useState([])

  const getAllPosts = async() =>{
    await axios.get('/post/',{headers:{Authorization: `Bearer ${localStorage.getItem('authToken')}`}}).then((response)=>{
      setPosts(response.data.BlogPosts)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{      
    getAllPosts()
  },[])


  return (
    <div>
        <Header/>
        <div className="home">
          
            <Posts posts={posts}  class={user.token && user.user ? 'posts':'posts_without_sidebar'}   />
            {
              user.token && user.user  && <Sidebar/>
            }
        </div>
    </div>
  )
}

export default Home