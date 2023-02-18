import { Link } from 'react-router-dom';

import style from './FriendsItem.module.css';

const FriendsItem = ({ id, name, photos, noUserPhoto }) => {
  return (
    <li className={style.friendsItem}>
      <Link className={style.friendsLink} to={`/messages/${id}`}>
        <img className={style.userImg} src={photos.small || noUserPhoto} alt="userImg" />
      </Link>
    </li>
  )
}

export default FriendsItem;