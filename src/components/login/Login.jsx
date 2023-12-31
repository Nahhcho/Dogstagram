import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Login = () => {
    const navigate = useNavigate();
    const [session, setSession] = useContext(AuthContext);

    const [userAttempt, setUserAttempt] = useState({
      username: '',
      password: ''
    })

    const updateUsername = (event) => {
      setUserAttempt({
        ...userAttempt,
        username: event.target.value
      })
    }

    const updatePassword = (event) => {
      setUserAttempt({
        ...userAttempt,
        password: event.target.value
      })
    }

    const login = (event) => {
      event.preventDefault()

      fetch(`${session.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userAttempt.username,
            password: userAttempt.password
          })
      })
      .then(response => response.json())
      .then(results => {
        console.log(results);
          if(results.message != 'invalid credentials') {
            console.log('successful login');
            setSession({...session, isLoggedIn: true, user: results.username});
            navigate('/')
          }
        })
      }
  
  

  return (
    <form>
        <div className="form-group">
            <label>Username</label>
            <input onChange={(event) => updateUsername(event)} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input onChange={(event) => updatePassword(event)} type="password" className="form-control" id='password' placeholder="Password"/>
        </div>
        <button onClick={login} type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login