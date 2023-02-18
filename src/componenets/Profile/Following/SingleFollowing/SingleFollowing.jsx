import { Link } from 'react-router-dom';
import style from './SingleFollowing.module.css';

const SingleFollowing = ({ id, name, photos, noUserPhoto }) => {

  return (
    <div className={style.singleFollowing}>
      <Link to={`/profile/${id}`}>
        <img className={style.singleFollowingImg} src={photos.small || noUserPhoto} alt='userImg' />
      </Link>
      <div className={style.singleFollowingInfo}>
        <Link to={`/profile/${id}`} className={style.navLink}>
          <p className={style.singleFollowingName}>{name}</p>
        </Link>
      </div>
    </div>
  )
}

export default SingleFollowing;