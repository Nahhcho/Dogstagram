import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';


const Jumbotron = () => {
    const navigate = useNavigate();

    const [session, setSession] = useContext(AuthContext);
    const [newPost, setNewPost] = useState({
        img: '',
        caption: ''
    })
    const [warned, setWarned] = useState(false)

    const updateCaption = (e) => {
        setNewPost({...newPost, caption: e.target.value})
    }

    const updateImg = (e) => {
        setNewPost({...newPost, img: e.target.files[0]})
    }

    const post = () => {
      setWarned(false)
        if(newPost.caption === '') {
            alert("Caption can't be empty!")
        }
        else if(newPost.img === '') {
            alert("Post A Picture")
        }
        else {
          const formData = new FormData();
          formData.append('caption', newPost.caption);
          formData.append('img', newPost.img);
          formData.append('poster', session.user);
            fetch(`${session.API_URL}/new_post`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(results => {
              if (results.message === "That's not a dog!") {
                setWarned(true);
              }
              else {
                console.log(results)
                navigate(`profile/${session.user}`)
              }
            })
        }
    }


    return (
      <>
      {
        warned ? (
          <div class="alert alert-warning" role="alert">
            That's not a dog!
          </div>
        ) : (null)
      }
      
    <div class="jumbotron">
        <h1 class="display-4">DogstaGram</h1>
        <p class="lead">Connect with friends and share pictures of your bestfriends.</p>
        <hr class="my-4" />
        <p>Remember, only pictures of dogs will be posted!</p>
        <>

        {
            session.isLoggedIn ? (
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                New Post
            </button>
            ) : (
            <Link to='/login' class="btn btn-primary" >
                New Post
            </Link>
            )
        }
   
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Caption: <input type="text" onChange={(e) => updateCaption(e)}/>
          </div>
          <div class="modal-body">
            Img: <input type="file" onChange={(e) => updateImg(e)}/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={post} data-dismiss="modal" >Post</button>
          </div>
        </div>
      </div>
    </div>
    </>
    </div>
    </>
  )
}

export default Jumbotron