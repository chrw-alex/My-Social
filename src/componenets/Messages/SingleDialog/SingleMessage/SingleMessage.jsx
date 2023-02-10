import { RiDeleteBinLine } from 'react-icons/ri';

import formatDate from '../../../../additional/formatDate';

import style from './SingleMessage.module.css';

const SingleMessage = ({ authorisedUserProfile, text, id, date, deleteMessageHandler, noUserPhoto }) => {
  return (
    <div className={style.singleMessage}>
      <img className={style.messageImg} src={authorisedUserProfile?.photos?.large || noUserPhoto} alt='userImg' />
      <div className={style.messageMain}>
        <div className={style.messageInfo}>
          <p className={style.messageUserName}>{authorisedUserProfile?.fullName}</p>
          <p className={style.messageDate}>{formatDate(date)}</p>
          <RiDeleteBinLine className={style.messageDeleteIcon} onClick={() => deleteMessageHandler(id)} />
        </div>
        <div className={style.messageTextAndDelete}>
          <div>
            <p className={style.messageText}>{text}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SingleMessage;