import React, { useContext, useEffect, useState } from 'react'
import './workouts.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'

const Workouts = () => {

  const [posts, setPosts] = useState([])
  const [session, setSession] = useContext(AuthContext);

  useEffect(() => {
    fetch(`${session.API_URL}/all_posts`)
    .then(response => response.json())
    .then(posts => {
      console.log(posts)
      setPosts(posts)
      
    })
  }, [])

  return (
    <div className='card-container'>
    {
      posts?.length > 0 ? (
        posts.map(post => (
          <Link to='/'>
          <div className="card" key={post.id}>
            <img className="card-img-top" src={post.img} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">{post.caption}</p>
            </div>
          </div>
          </Link>
        ))
      ) : (null)
    }
    </div>
  )
}

export default Workouts