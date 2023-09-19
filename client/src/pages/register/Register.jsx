import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
const userData = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate()
  const [user, SetUser] = useState(userData);
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios
      .post("/user/register", {
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.message === "User already registered") {
          setOpen(true);
          
        }
        if(response.data.message === "User saved successfully"){
          setRegister(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 const  handleClose = () => {
   setOpen(false);
   setRegister(false);
   navigate('/login')
 }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) =>  SetUser({ ...user, username: e.target.value })}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => SetUser({ ...user, email: e.target.value })}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => SetUser({ ...user, password: e.target.value })}
        />
        <button className="registerButton" onClick={handleRegister}>
          Register
        </button>
      </form>
{/* This Dialog box will open once already registered user trys to re -register again */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Already Registered, Please Proceed to Login
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

{/* This Dialog Box will open once new user is registered successfully */}
      <Dialog
        open={register}
        onClose={() => setRegister(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Is Registered Successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>


      {/* <button className="registerLoginButton">Login</button> */}
    </div>
  );
};

export default Register;
