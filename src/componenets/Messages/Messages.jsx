import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getFriends, getDialogs, getMessages, sendMessage } from '../../api/api';
import Friends from './Friends/Friends';
import SingleDialog from './SingleDialog/SingleDialog';
import MessagesForm from './MessagesForm/MessagesForm';

import style from './Messages.module.css';
import Preloader from '../Preloader/Preloader';
import Dialogs from './Dialogs/Dialogs';

const Messages = ({ authorisedUserProfile, noUserPhoto }) => {

  const params = useParams()
  const [friends, setFriends] = useState([])
  const [dialogs, setDialogs] = useState([])
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getFriends()
      .then((data) => {
        setFriends(data.items)
      })
  }, [])

  useEffect(() => {
    getDialogs()
      .then((data) => {
        setDialogs(data)
      })
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      setIsLoading(true)
      getMessages(params.id)
        .then(data => {
          setMessages(data.items)
        })
        .finally(() => setIsLoading(false))
    }
  }, [params.id])

  const addMessageHandler = (text) => {
    sendMessage(params.id, text)
      .then(() => {
        getMessages(params.id)
          .then(data => setMessages(data.items))
      })
  }

  return (
    <div className={style.messages}>
      <div className={style.left}>
        <Friends friends={friends} noUserPhoto={noUserPhoto} />
        <Dialogs dialogs={dialogs} noUserPhoto={noUserPhoto} />
      </div>
      <div className={style.right}>
        {params.id ?
          (isLoading
            ? <Preloader />
            : <>
              <SingleDialog authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} messages={messages} setMessages={setMessages} />
              <MessagesForm className={style.MessagesForm} addMessageHandler={addMessageHandler} />
            </>
          )
          : null
        }

      </div>
    </div>
  )
}

export default Messages;