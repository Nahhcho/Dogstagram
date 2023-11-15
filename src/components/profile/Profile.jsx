import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import { Navbar, Workouts } from '..'
import { AuthContext } from '../../App'
import Posts from '../posts/Posts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams()
  const user = params.user
  const [session, setSession] = useContext(AuthContext);
  const [edit, setEdit] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState(null)
  const [newUsername, setNewUsername] = useState('')
  const [userInfo, setUserInfo] = useState({
    id: null,
    followerCount: 0,
    followingCount: 0,
    posts: 0,
    followers: [],
    profile_pic: ''
  })

  const getProfile = () => {
    fetch(`${session.API_URL}/profile/${user}`)
    .then(response => response.json())
    .then(user => {
      console.log(user)
      setUserInfo({
        id: user.id,
        followerCount: user.follower_count,
        followingCount: user.following_count,
        posts: user.post_count,
        followers: user.followers,
        profile_pic: user.profile_pic
      })
    })
  }

  const message = () => {
    fetch(`${session.API_URL}/messages/${session.user}`)
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
    fetch(`${session.API_URL}/profile/${user}`, {
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

  const editProfile = () => {
    if(newProfilePic === null && newUsername === '') {
      return alert('Enter something to edit.')
    }
    const formData = new FormData();
    formData.append('newUsername', newUsername);
    formData.append('newProfilePic', newProfilePic);
    fetch(`${session.API_URL}/user/${userInfo.id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(results => {
      console.log(results.message);
      setSession({
        ...session,
        user: results.username
      })
      navigate('/');
    })
  }

  const updateProfilePic = (e) => {
    setNewProfilePic(e.target.files[0]);
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
          {
            session.user === user ? (
              <button class='edit-button' data-toggle="modal" data-target="#exampleModal">Edit</button>
            ) : (null)
          }
          
  
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  <div class="modal-body">
                    Username: <input type="text" placeholder={user} value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}} />
                    <br />
                    <br />
                    Profile Picture: <input type="file" onChange={(e) => {updateProfilePic(e)}} />
                  </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={editProfile}>Save changes</button>
                    </div>
                  </div>
                </div>
              </div> 
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