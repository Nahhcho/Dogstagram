import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../App';
import Conversation from '../conversation/Conversation';

const NewConversation = () => {
    const navigate = useNavigate();
    const params = useParams()
    const user = params.user
    const [session, setSession] = useContext(AuthContext);

    const postConversation = (event) => {
        if(event.key == 'Enter') {
            fetch(`${session.API_URL}/messages/${session.user}`, {
                method: 'POST',
                body: JSON.stringify({
                    recipient: user,
                    text: event.target.value
                })
            })
            .then(response => response.json())
            .then(conversation => {
                navigate(`/conversation/${conversation.id}`)
            })
        }
    }

  return (
    <>
        <input class='message-input' onKeyPress={postConversation} placeholder="say something nice" />

    </>
  )
}

export default NewConversation