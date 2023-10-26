import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import { Navbar, Workouts } from '..'
import { AuthContext } from '../../App'
import Posts from '../posts/Posts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000'

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams()
  const user = params.user
  const [session, setSession] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    followerCount: 0,
    followingCount: 0,
    posts: 0,
    followers: [],
    profile_pic: ''
  })

  const getProfile = () => {
    fetch(`${API_URL}/profile/${user}`)
    .then(response => response.json())
    .then(user => {
      console.log(user)
      setUserInfo({
        followerCount: user.follower_count,
        followingCount: user.following_count,
        posts: user.post_count,
        followers: user.followers,
        profile_pic: user.profile_pic
      })
    })
  }

  const message = () => {
    fetch(`${API_URL}/messages/${session.user}`)
    .then(response => response.json())
    .then(conversations => {
      let found = false;
      conversations.forEach(conversation => {
        let userArray = [];
        conversation.users.forEach(user => {
          userArray.push(user.username)
        })
        if(userArray.includes(session.user) && userArray.includes(user)) {
          navigate(`/conversation/${conversation.id}`)
          found = true
        }
      })
      if(found === false) {navigate(`/newConversation/${user}`)}
      
    })
  }

  useEffect(() => {
    getProfile();
  }, [user])

  const updateFollowers = () => {
    fetch(`${API_URL}/profile/${user}`, {
      method: 'PUT',
      body: JSON.stringify({
        follower: session.user
      })
    })
    .then(response => response.json())
    .then(results => {
      console.log(results)
      getProfile();
    })

  }


  return (
    <div>
      <div className='profile-header'>
        <img src={userInfo.profile_pic} className='pfp' />
        <div className='info-container'>
          <h3>{user}</h3>
          {
            session.user !== user && session.isLoggedIn ? (
              <>
              <button className='follow-button' onClick={updateFollowers}>
                {
                  userInfo.followers.includes(session.user) ? (<>Unfollow</>) : (<>Follow</>)
                }
              </button>
              <button class='message-button' onClick={message}>Message</button>
              </>) : (null)
          }
          <section>
            <div>
              {userInfo.posts} posts
            </div>
            <div>
              {userInfo.followerCount} followers
            </div>
            <div>
              {userInfo.followingCount} following
            </div>
          </section>
          
        </div>
      </div>
      
      <hr />
      <Posts user={user} />
    </div>
  )
}

export default Profile