import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useAuth } from '../../context/authContext'
import './Home.css'

const Home = () => {

  //  eslint-disable-next-line
  const [user,setUser] = useAuth()

  return (
    <div>
        <Header/>
        <div className="home">
            <Posts  class={user.token && user.user ? 'posts':'posts_without_sidebar'}   />
            {
              user.token && user.user  && <Sidebar/>
            }
        </div>
    </div>
  )
}

export default Home