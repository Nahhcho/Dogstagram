import { useContext, useState } from 'react'
import './navbar.css'
import { AuthContext } from '../../App'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [session, setSession] = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">DogstaGram</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          {
            session.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className='nav-link' to={`/profile/${session.user}`}>{session.user}</Link>
                </li>
                <li className="nav-item">
                   <Link className='nav-link' to='/logout'>Logout</Link>
                </li>
                <li className="nav-item">
                   <Link className='nav-link' to='/following'>Following</Link>
                </li>
                <li className="nav-item">
                   <Link className='nav-link' to='/messages'>Messages</Link>
                </li>
              </>
              ) : (
                <>
                <li className="nav-item">
                  <Link className='nav-link' to='/register'>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/login'>Log in</Link>
                </li>
                </>
              )
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar