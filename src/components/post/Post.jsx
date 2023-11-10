import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import Comments from '../comments.jsx/Comments';

const Post = ({post}) => {

    const navigate = useNavigate()
    const location = useLocation();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);
    const [likes, setLikes] = useState(post.likes)
    const [session, setSession] = useContext(AuthContext);

    const postLike = () => {
      console.log(session.user)
      fetch(`${session.API_URL}/post_detail/${post.id}`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'like',
          liker: session.user
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        fetch(`${session.API_URL}/post_detail/${post.id}`)
          .then(response => response.json())
          .then(post => {
                setLikes(post.likes)
          })
      })
    }

    const updateComment = (event) => {
        setComment(event.target.value)
      }
    
      const postComment = () => {
        fetch(`${session.API_URL}/post_detail/${post.id}`, {
          method: 'POST',
          body: JSON.stringify({
            type: 'comment',
            text: comment,
            commenter: session.user
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setComment('')
          fetch(`${session.API_URL}/post_detail/${post.id}`)
          .then(response => response.json())
          .then(post => {
                setComments(post.comments)
          })
        })
      }
    
      const deleteComment = (id) => {
        fetch(`${session.API_URL}/comment/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({
            id
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          fetch(`${session.API_URL}/post_detail/${post.id}`)
          .then(response => response.json())
          .then(post => {
                setComments(post.comments)
          })
        })
      }

      const deletePost = () => {
        fetch(`${session.API_URL}/post_detail/${post.id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          navigate(`/`)
        })
      }

  return (
    <>
    <div class="post-container">
      <div class="post-header">
        <Link to={`/profile/${post.poster}`}>
          <h5 className="card-title">{post.poster}</h5>
        </Link>
        {
          session.user == post.poster && location.pathname == `/profile/${session.user}` ? (<button onClick={deletePost}>Delete Post</button>) : (null)
        }
      </div>
      <img src={`${post.img}`} alt="img" class="post-img" />
      <div class="img-container">
        <img class="icon" onClick={session.isLoggedIn ? (() => postLike(post.id)) : (() => {navigate('/login')})} src="https://visualmodo.com/wp-content/uploads/2020/03/Everything-You-Need-To-Know-About-Instagram-Hiding-Likes.png" />
        <img class="icon" data-toggle="modal" data-target={`#commentModal${post.id}`} src="https://cdn0.iconfinder.com/data/icons/social-media-logo-4/32/Social_Media_instagram_comment-512.png" />
      </div>
        <p>{likes} likes</p>
      <div class="caption-container">
        <Link to={`/profile/${post.poster}`}>
          <h5 className="card-title">{post.poster}</h5>
        </Link>
      <p>{post.caption}</p>
      </div>
      </div>
            <div class="modal fade" id={`commentModal${post.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Comments</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              <div class="modal-body">
    
       {
            comments?.length > 0 ? (comments.map(comment => (
                <div>
                    <h6>{comment.commenter}</h6>
                    <p>
                      {comment.text}
                    {
                      comment.commenter == session.user ? (
                        <button onClick={() => deleteComment(comment.id)}>Delete</button>
                      ) : (null)
                    }
                    </p>
                </div>
            ))) : (null)
       }
       
        {
            session.isLoggedIn ? (
            <div>
            <input value={comment} type="text" onChange={updateComment} />
            <br />
            <button class="btn btn-secondary" onClick={postComment}>Comment</button>
            </div>
            ) : (null)
        }        
    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
          </div>
          </>
  )
}

export default Post