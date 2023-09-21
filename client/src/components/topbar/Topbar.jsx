import { Link } from "react-router-dom";
import "./Topbar.css";
import { useAuth } from "../../context/authContext";
import { PF } from "../../baseInstance,";

const Topbar = () => {
  // eslint-disable-next-line
  const [user,setUser]= useAuth();

  const handleLogout = () => {
    setUser({...user,token:'',user:{email:'',username:'',profilePic:''}})
    localStorage.clear()
  }
  
  


  return (
    <div className="topbar">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topbarList">
          <Link to="/" className="link">
            <li className="topbarListItem">HOME</li>
          </Link>
          <li className="topbarListItem">ABOUT</li>
          <li className="topbarListItem">CONTACT</li>
          <Link to="/write" className="link">
            <li className="topbarListItem">WRITE</li>
          </Link>
          {user.user.email !==''&& user.user.username !== '' && <li className="topbarListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user.user.email !==''&& user.user.username !== '' ? (
          <Link to="/settings">
            <img
              className="topImg"
              src={user.user.profilePic? PF+user.user.profilePic : ''}
              alt=""
            ></img>
          </Link>
        ) : (
          <ul className="topbarList">
            <li className="topbarListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topbarListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
