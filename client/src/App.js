import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import { Context } from "./context/Context";
import AcceptPost from "./pages/acceptPost/AcceptPost";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPost from "./pages/MyPosts/MyPost";
import Settings from "./pages/settings/Settings";
import Signup from "./pages/signup/Signup";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Signup />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/my-post" element={user ? <MyPost /> : <Login />} />
        <Route
          path="/accept"
          element={user && user.isAdmin ? <AcceptPost /> : <Login />}
        />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
