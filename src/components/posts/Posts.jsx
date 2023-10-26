import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Comments from '../comments.jsx/Comments'
import './posts.css'
import { AuthContext } from '../../App'
import Post from '../post/Post'

const API_URL = 'http://127.0.0.1:8000'

const Posts = ({user}) => {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState();
    const [session, setSession] = useContext(AuthContext);
    
    useEffect(() => {
        if(user === 'all') {
            fetch(`${API_URL}/all_posts`)
            .then(response => response.json())
            .then(posts => {
              console.log(posts)
              setPosts(posts)
            })
        }
        else if(user === 'following') {
          fetch(`${API_URL}/profile/${session.user}`)
          .then(response => response.json())
          .then(user => {
            let users = ""
            user.followings.forEach(follow => {
              if(user.followings.indexOf(follow) === user.followings.length - 1) {users += `${follow}`}
              else {users += `${follow},`}
            })
            fetch(`${API_URL}/posts/${users}`)
            .then(response => response.json())
            .then(posts => {
                setPosts(posts)
              }) 
            })
          }
        else {
            fetch(`${API_URL}/posts/${user}`)
            .then(response => response.json())
            .then(posts => {
              console.log(posts)
              setPosts(posts)
              
            })        
        }
    }, [user])

    return (
      
        <div className='card-container'>
        {posts?.length > 0 ? (
          posts.map(post => (
            <Post post={post}/>
          ))
        ) : null}
      </div>
      
    )
}

export default Posts