import './Login.css'
import {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
const userData = {
  email :'',
  password :'',
  profilePic:''

}

const Login = () => {
 
  const [userInfo,setUserInfo] = useState(userData)
  const [user,setUser] = useAuth()

  const handleLogin = async(e) => {
    e.preventDefault()
    await axios.post('/user/login',{email:userInfo.email,password:userInfo.password}).then((response)=>{
      setUser({...user,token:response.data.User.token,user:{ email: response.data.User.email,username:response.data.User.username,profilePic:response.data.User.profilePic}})
      
      localStorage.setItem('authToken',response.data.User.token) 
      localStorage.setItem('authUser',JSON.stringify({...response.data.User,token:'',password:''}))
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm">
            <label htmlFor="">Email</label>
            <input type="text" className='loginInput'placeholder='Enter your Email...' onChange={(e)=> setUserInfo({...userInfo,email:e.target.value})} />
            <label>Password</label>
            <input type='password' className='loginInput' placeholder='Enter your Password ...' autoComplete='on'  onChange={(e)=> setUserInfo({...userInfo,password:e.target.value})}/>
            <button className='loginButton' onClick={handleLogin}>Login</button>
        </form>
        {/* <button className='loginRegistrationButton'>Register</button> */}
    </div>
  )
}

export default Login