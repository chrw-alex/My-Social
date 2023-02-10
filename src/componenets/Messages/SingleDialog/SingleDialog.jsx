import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import SingleMessage from './SingleMessage/SingleMessage';
import MessagesForm from './MessagesForm/MessagesForm';
import style from './SingleDialog.module.css';

const SingleDialog = ({ authorisedUserProfile, noUserPhoto }) => {

  const [messages, setMessages] = useState([]);

  const addMessageHandler = (text) => {
    const newMessage = {
      text: text,
      id: uuidv4(),
      date: new Date(),
    }
    setMessages([...messages, newMessage]);
  }

  const deleteMessageHandler = (id) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  return (
    <div className={style.singleDialog}>
      <div className={style.singleDialogTop}>
        {messages.map(({ id, text, date }) => {
          return (
            <SingleMessage authorisedUserProfile={authorisedUserProfile} text={text} key={id} id={id} date={date} deleteMessageHandler={deleteMessageHandler} noUserPhoto={noUserPhoto} />
          )
        })}
      </div>
      <MessagesForm className={style.MessagesForm} addMessage={addMessageHandler} />
    </div>
  )
}

export default SingleDialog;