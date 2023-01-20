import { NavLink } from 'react-router-dom';

import style from './DialogsItem.module.css';

const DialogsItem = ({ id, name }) => {
  return (
    <li className={style.dialogsItem}>
      <NavLink className={style.dialogsLink} to={`/messages/${id}`}>{name}</NavLink>
    </li>
  )
}

export default DialogsItem;