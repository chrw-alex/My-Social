import { NavLink } from 'react-router-dom';
import Button from '../../Button/Button';

import style from './SingleUser.module.css';

const SingleUser = ({ id, name, status, followed, photos, followUser, unfollowUser, isAuthorized }) => {
  return (
    <div className={style.singleUser}>
      <div className={style.userLeft}>
        <NavLink to={`/profile/${id}`} >
          <img className={style.userImg} src={photos.small || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="userImg" />
        </NavLink>
        {followed
          ? <Button className={style.followBtn} text="Unfollow" onClick={(event) => unfollowUser(event.target, id)} />
          : <Button className={style.followBtn} text="Follow" disabled={isAuthorized ? false : true} onClick={(event) => followUser(event.target, id)} />}
      </div>
      <div className={style.userRight}>
        <div>
          <NavLink to={`/profile/${id}`} className={style.navLink} >
            <p className={style.userName}>{name}</p>
          </NavLink>
          <p className={style.userStatus}>{status || 'no status yet'}</p>
        </div>
        <div className={style.userCity}>City, Country</div>
      </div>
    </div>
  )
}

export default SingleUser;