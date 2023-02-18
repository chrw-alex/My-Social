import { Link } from 'react-router-dom';
import formatDate from './../../../../additional/formatDate';
import style from './DialogsItem.module.css'

const DialogsItem = ({ id, hasNewMessages, lastDialogActivityDate, lastUserActivityDate, newMessagesCount, photos, userName, noUserPhoto }) => {
  return (
    <Link className={style.link} to={`/messages/${id}`}>
      <div className={hasNewMessages ? style.dialogsItem + ' ' + style.hasNewMessages : style.dialogsItem}>
        <img className={style.img} src={photos.small || noUserPhoto} alt="userImg" />
        <div className={style.info}>
          <div className={style.top}>
            <p className={style.name}>{userName}</p>
            <p className={style.date}>{formatDate(lastDialogActivityDate)}</p>
          </div>
          <div className={style.bottom}>
            <p className={style.date}>last visit: {formatDate(lastUserActivityDate)}</p>
            {newMessagesCount > 0 ? <div className={style.messagesCount}>{newMessagesCount}</div> : null}
          </div>
        </div>
      </div >
    </Link >

  )
}

export default DialogsItem