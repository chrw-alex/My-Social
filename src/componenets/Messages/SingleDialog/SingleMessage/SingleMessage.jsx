import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserImg } from '../../../../api/api';
import { RiDeleteBinLine } from 'react-icons/ri';

import formatDate from '../../../../additional/formatDate';

import style from './SingleMessage.module.css';

const SingleMessage = ({ authorisedUserProfile, body, id, addedAt, senderId, recipientId, senderName, viewed, deleteMessageHandler, noUserPhoto }) => {

  const [src, setSrc] = useState('')

  useEffect(() => {
    getUserImg(senderId)
      .then((result) => setSrc(result))
  }, [senderId])

  return (
    <div className={viewed ? style.singleMessage : style.singleMessage + ' ' + style.notViewed}>
      <NavLink to={`/profile/${senderId}`}>
        <img className={style.messageImg} src={src || noUserPhoto} alt='userImg' />
      </NavLink>
      <div className={style.messageMain}>
        <div className={style.messageInfo}>
          <div>
            <p className={style.messageUserName}>{senderName}</p>
            <p className={style.messageDate}>{formatDate(addedAt)}</p>
          </div>
          <RiDeleteBinLine className={style.messageDeleteIcon} onClick={() => deleteMessageHandler(id)} />
        </div>
        <div>
          <p className={style.messageText}>{body}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleMessage;