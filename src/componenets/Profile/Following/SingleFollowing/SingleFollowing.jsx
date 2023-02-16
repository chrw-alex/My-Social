import { NavLink } from 'react-router-dom';
import style from './SingleFollowing.module.css';

const SingleFollowing = ({ id, name, photos, noUserPhoto }) => {

  return (
    <div className={style.singleFollowing}>
      <NavLink to={`/profile/${id}`}>
        <img className={style.singleFollowingImg} src={photos.small || noUserPhoto} alt='userImg' />
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