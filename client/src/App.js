import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {Navigate, Route , Routes} from 'react-router-dom';
import { useAuth } from "./context/authContext";


function App() {
  // eslint-disable-next-line
  const [user,setUser] = useAuth()
  return (
    < >
      <Topbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/register" element={user.user.email !==''? <Navigate to='/' /> : <Register/>}></Route>
        <Route exact path="/login" element={user.user.email !== '' ? <Navigate to='/' /> : <Login/>}></Route>
        <Route exact path="/write" element={user.user.email !== ''? <Write/> : <Navigate to='/login'/>}></Route>
        <Route exact path="/settings" element={user.user.email !== ''? <Settings/> : <Navigate to='/login'/>}></Route>
        <Route exact path="/post/:postId" element={user.user.email !== ''? <Single/> : <Navigate to='/login'/>}></Route>
      </Routes>
    </>
    
  );
}

// implement the logic for user already registered when user try to register again

export default App;
