import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Comments = ({comments, postId}) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('');
  const [session, setSession] = useContext(AuthContext);

  const updateComment = (event) => {
    setComment(event.target.value)
  }

  const postComment = () => {
    fetch(`${session.API_URL}/post_detail/${postId}`, {
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
    })
  }

  return (
    <>
       {
            comments?.length > 0 ? (comments.map(comment => (
                <div>
                    <h6>{comment.commenter}</h6>
                    <p>
                      {comment.text}
                    {
                      comment.commenter == session.user ? (
                        <button onClick={() => deleteComment(comment.id)} data-dismiss="modal">Delete</button>
                      ) : (null)
                    }
                    </p>
                </div>
            ))) : (null)
       }
       <div>
        <input value={comment} type="text" onChange={updateComment} />
        <br />
        <button class="btn btn-secondary" onClick={session.isLoggedIn ? (postComment):(() => {
          navigate('/login');
          })} data-dismiss="modal">Comment</button>
       </div>
    </>
  )
}

export default Comments