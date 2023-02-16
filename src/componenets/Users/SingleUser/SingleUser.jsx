import { NavLink } from 'react-router-dom';

import style from './SingleUser.module.css';

const SingleUser = ({ id, name, status, photos }) => {

  return (
    <div className={style.singleUser}>
      <div className={style.userLeft}>
        <NavLink to={`/profile/${id}`} >
          <img className={style.userImg} src={photos.small || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="userImg" />
        </NavLink>
      </div>
      <div className={style.userRight}>
        <div>
          <NavLink to={`/profile/${id}`} className={style.navLink} >
            <p className={style.userName}>{name}</p>
          </NavLink>
          <p className={style.userStatus}>{status || 'no status yet'}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleUser;