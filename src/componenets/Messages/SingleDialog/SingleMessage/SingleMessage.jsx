import { RiDeleteBinLine } from 'react-icons/ri';

import formatDate from '../../../../additional/formatDate';

import style from './SingleMessage.module.css';

const SingleMessage = ({ text, id, date, deleteMessageHandler }) => {
  return (
    <div className={style.singleMessage}>
      <img className={style.messageImg} src='https://klike.net/uploads/posts/2022-07/1658727898_47.jpg' alt='userImg' />
      <div className={style.messageMain}>
        <div className={style.messageInfo}>
          <p className={style.messageUserName}>Alexandra</p>
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