import Post from '../post/Post'
import './Posts.css'
import { useAuth } from '../../context/authContext'

const Posts = (props) => {
  // eslint-disable-next-line
  const [user,setUser] = useAuth()
  return (
    <div className={props.class}>
      <Post class={user.token && user.user ? 'post':'post_without_sidebar'} img='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'/>
      <Post class={user.token && user.user ? 'post':'post_without_sidebar'} img='https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
      <Post class={user.token && user.user ? 'post':'post_without_sidebar'} img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
      <Post class={user.token && user.user ? 'post':'post_without_sidebar'} img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
      <Post class={user.token && user.user ? 'post':'post_without_sidebar'} img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
    </div>
  )
}

export default Posts