import React, { useState, useEffect, useContext, createContext } from "react";
import { Workouts, Navbar, Login, Register, UserContext } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import Logout from "./components/Logout";
import Profile from "./components/profile/Profile";
import NewPost from "./components/newPost/NewPost";
import Home from "./containers/home/Home";
import Comments from "./components/comments.jsx/Comments";
import Following from "./components/following/Following";
import MessagePage from "./containers/messagePage/MessagePage";
import Conversation from "./components/conversation/Conversation";
import NewConversation from "./components/newConversation/NewConversation";


export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    isLoggedIn: false,
    user: null,
    //API_URL: 'http://127.0.0.1:8000'
    API_URL: 'https://dogstagram-server-0ef1dc993c02.herokuapp.com'
  });

  return (
    <AuthContext.Provider value={[session, setSession]}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {


  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:user" element={<Profile />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/following" element={<Following />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/conversation/:conversationId" element={<Conversation />} />
        <Route path="/newConversation/:user" element={<NewConversation />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

