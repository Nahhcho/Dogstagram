import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';

const API_URL = 'http://127.0.0.1:8000'

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
        setNewPost({...newPost, img: e.target.value})
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
            fetch(`${API_URL}/new_post`, {
                method: 'POST',
                body: JSON.stringify({
                    caption: newPost.caption,
                    img: newPost.img,
                    poster: session.user
                })
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
        <h1 class="display-4">MonkeyGram</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
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
            Img: <input type="text" onChange={(e) => updateImg(e)}/>
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