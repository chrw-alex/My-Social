import { Link } from 'react-router-dom'

import style from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'

const Dialogs = ({ dialogs, noUserPhoto }) => {
  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItemsInner}>
        {dialogs.map(({ hasNewMessages, id, lastDialogActivityDate, lastUserActivityDate, newMessagesCount, photos, userName }) => {
          return <DialogsItem key={id} id={id} hasNewMessages={hasNewMessages} lastDialogActivityDate={lastDialogActivityDate} lastUserActivityDate={lastUserActivityDate} newMessagesCount={newMessagesCount} photos={photos} userName={userName} noUserPhoto={noUserPhoto} />
        })}
      </div>
      <div className={style.buttonInner}>
        <button className={style.button}>
          <Link className={style.link} to='/messages'>Close All</Link>
        </button>
      </div>
    </div>
  )
}

export default Dialogs