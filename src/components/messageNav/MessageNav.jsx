import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './messageNav.css'
import { render } from '@testing-library/react';

const MessageNav = () => {
const navigate = useNavigate();
const [session, setSession] = useContext(AuthContext);
const [conversations, setConversations] = useState([]);

const getProfile = () => {
    fetch(`${session.API_URL}/messages/${session.user}`)
    .then(response => response.json())
    .then(conversations => {
      console.log(conversations)
      setConversations(conversations)
    })
  }

useEffect(() => {
    getProfile()
}, [])

return (
    <>
    {
        conversations?.length > 0 ? (conversations.map(conversation => (
            <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start" onClick={() => {navigate(`/conversation/${conversation.id}`)}}>
            <div class="ms-2 me-auto">
            <div class="fw-bold">
                <h5>{conversation.users.map(user=>(
                    session.user != user.username ? (<>{user.username}</>):(null)
                ))}</h5>
            </div>
                {conversation.messages[conversation.messages.length-1].sender.username}:{` ${conversation.messages[conversation.messages.length-1].text}`}
            </div>
        </li>
    </ol>
        ))) : (null)
    }
    </>
    
  )
}

export default MessageNav