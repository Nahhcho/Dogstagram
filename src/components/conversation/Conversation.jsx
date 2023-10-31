import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './conversation.css'
import { AuthContext } from '../../App'

const Conversation = () => {
    const navigate = useNavigate();
    const params = useParams()
    const id = params.conversationId
    const [messages, setMessages] = useState([])
    const [recipient, setRecipient] = useState(null)
    const [session, setSession] = useContext(AuthContext);
    const [messageToSend, setMessageToSend] = useState('')

    const getConversation = () => {
        fetch(`${session.API_URL}/conversation/${id}`)
        .then(response => response.json())
        .then(conversation => {
            setMessages(conversation.messages)
            conversation.users.forEach(user=>{
                if(session.user != user.username) {
                    setRecipient(user.username)
                }
            })
        })
    }

    useEffect(() => {
        getConversation()
    }, [])

    const sendMessage = (event) => {
        if(event.key === 'Enter') {
            setMessageToSend('');
            fetch(`${session.API_URL}/conversation/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    text: messageToSend,
                    sender: session.user,
                    recipient: recipient
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                fetch(`${session.API_URL}/conversation/${id}`)
                .then(response => response.json())
                .then(conversation => {
                setMessages(conversation.messages)
                conversation.users.forEach(user=>{
                if(session.user != user.username) {
                    setRecipient(user.username)
                }
            })
        })
        })
        }
    }

    const updateMessageToSend = (event) => {
        setMessageToSend(event.target.value)
    }


  return (
    <>
    <main>
      {messages?.length > 0 ? (
        messages.map(message => (

            <div class={message.sender.username === session.user ? ('message sent'):('message received')}>
            <img class='convo-img'src={message.sender.profile_pic} onClick={()=>{navigate(`/profile/${message.sender.username}`)}} />
            <p class='message-text'>{message.text}</p>
          </div>
        ))
        ) : (null)
      }
    </main>

        <input class='message-input' value={messageToSend} onChange={updateMessageToSend}  onKeyPress={sendMessage} placeholder="say something nice" />

    </>
    
  )
}

export default Conversation