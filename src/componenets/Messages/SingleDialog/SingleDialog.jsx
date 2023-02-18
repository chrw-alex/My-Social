import { useRef, useEffect } from 'react'
import { getMessages, deleteMessage } from '../../../api/api';
import { useParams } from 'react-router-dom';
import SingleMessage from './SingleMessage/SingleMessage';
import style from './SingleDialog.module.css';

const SingleDialog = ({ authorisedUserProfile, noUserPhoto, messages, setMessages }) => {

  const params = useParams()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const deleteMessageHandler = (id) => {
    deleteMessage(id)
      .then(() => {
        getMessages(params.id)
          .then(data => setMessages(data.items))
      })
  }

  return (
    <div className={style.singleDialog}>
      <div>
        {messages.map(({ id, body, addedAt, recipientId, senderId, senderName, viewed }) => {
          return (
            <SingleMessage authorisedUserProfile={authorisedUserProfile} key={id} id={id} body={body} addedAt={addedAt} senderId={senderId} recipientId={recipientId} senderName={senderName} viewed={viewed} deleteMessageHandler={deleteMessageHandler} noUserPhoto={noUserPhoto} />
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default SingleDialog;