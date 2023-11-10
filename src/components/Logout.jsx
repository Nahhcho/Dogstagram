import React, { useContext } from 'react'
import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [session, setSession] = useContext(AuthContext);
  const navigate = useNavigate();

  setSession({...session, isLoggedIn: false, user: null});
  navigate('/');
}

export default Logout