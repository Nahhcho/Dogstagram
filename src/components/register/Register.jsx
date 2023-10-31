import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Register = () => {

    const navigate = useNavigate();
    const [session, setSession] = useContext(AuthContext);

    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmation: ''
      })

      const updateUsername = (event) => {
        setUser({
          ...user,
          username: event.target.value
        })
      }
  
      const updatePassword = (event) => {
        setUser({
          ...user,
          password: event.target.value
        })
      }

      const updateConfirmation = (event) => {
        setUser({
            ...user,
            confirmation: event.target.value
        })
      }

      const register = (event) => {
        event.preventDefault()
  
        if(user.password == user.confirmation) {
            console.log(user.username)
            console.log(user.password)
            console.log(user.confirmation)
            fetch(`${session.API_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                    confrimation: user.confirmation
                })
            })
            .then(response => response.json())
            .then(results => {
                navigate('/');
              })
            }

        }


  return (
    <form>
        <div className="form-group">
            <label>Username</label>
            <input onChange={(event) => updateUsername(event)} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input onChange={(event) => updatePassword(event)} className="form-control" id='password' placeholder="Password"/>
        </div>
        <div className="form-group">
            <label>Confirm Password</label>
            <input onChange={(event) => updateConfirmation(event)} className="form-control" id='password' placeholder="Password"/>
        </div>
        <button onClick={register} type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Register