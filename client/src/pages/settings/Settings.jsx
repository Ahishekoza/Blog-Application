
import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from 'react';
import { HTTP, PF } from "../../baseInstance,";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const naviagte = useNavigate()
  const [user, setUser] = useState({
    id:'',
    email: '',
    username: '',
    password: '',
    profilePic:''
    
  });
  const [file, setFile] = useState(user.profilePic);
  const [open,setOpen] = useState(false)


  const handleUpdate = async(e) => {
    e.preventDefault()
   const userData =  new FormData()
   userData.append('email', user.email)
   userData.append('username', user.username)
   if(user.password!==''){
   userData.append('password', user.password)
  }
   if(file){
    userData.append('profilePic',file)
   }
  

    await HTTP.put(`/user/update/${user.id}`,userData).then((response)=>{
      console.log(response);
      localStorage.removeItem('authUser')
      localStorage.setItem('authUser',JSON.stringify({...response.data.User,token:'',password:''}))
      setOpen(true)
    }).catch((error)=>{
      console.log(error);
    })

   
  }

  const handleClose = () => {
    setOpen(false)
    naviagte('/')
  }


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));
    if (loggedInUser) {
      setUser({
        id: loggedInUser._id,
        email: loggedInUser.email || '',
        username: loggedInUser.username || '',
        password: loggedInUser.password || '',
        profilePic : loggedInUser.profilePic
      });
    }
  }, []);


  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              className="settingsImg"
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e)=> setFile(e.target.files[0])}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Safak"
            name="name"
            value={user.username} // Corrected this to user.username
            onChange={(e) => setUser({ ...user, username: e.target.value })} // Corrected this to set username
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="safak@gmail.com"
            name="email"
            value={user.email} // Bind the value to user.email
            onChange={(e) => setUser({ ...user, email: e.target.value })} // Update email
          />
          {/* <label>Password</label> */}
          {/* <input
            type="password"
            placeholder="Password"
            name="password"
          /> */}
          <button className="settingsSubmitButton" type="submit" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
      <Sidebar />

      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Updated Successfully
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

export default Settings;