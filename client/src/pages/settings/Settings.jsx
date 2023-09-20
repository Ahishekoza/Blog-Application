
import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from 'react';

const Settings = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    profilePic:''
  });

  const PF = "http://localhost:8080/"

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('authUser'));
    if (loggedInUser) {
      setUser({
        email: loggedInUser.email || '',
        username: loggedInUser.username || '',
        password: loggedInUser.password || '',
        profilePic: loggedInUser.profilePic
      });
    }
  }, []);

  console.log(user.profilePic)

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
              src={user.profilePic ? PF+user.profilePic : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e)=> setUser({...user,profilePic:e.target.files[0].name})}
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;