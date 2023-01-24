import { NavLink } from 'react-router-dom';
import style from './SingleFollowing.module.css';

const SingleFollowing = ({ photos, name, id }) => {
  return (
    <div className={style.singleFollowing}>
      <NavLink to={`/profile/${id}`}>
        <img className={style.singleFollowingImg} src={photos.small || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt='userImg' />
      </NavLink>
      <div className={style.singleFollowingInfo}>
        <NavLink to={`/profile/${id}`} className={style.navLink}>
          <p className={style.singleFollowingName}>{name}</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SingleFollowing;