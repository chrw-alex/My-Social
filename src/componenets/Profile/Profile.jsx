import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import style from './Profile.module.css';

const Profile = () => {
  return (
    <div className={style.profile}>
      <img className={style.profileImg} src='https://static.vecteezy.com/system/resources/previews/001/946/569/original/abstract-geometric-hexagons-yellow-background-with-diagonal-striped-lines-free-vector.jpg' alt="profileImg" />
      <div className={style.profileInner}>
        <ProfileInfo />
        <Posts />
      </div>
    </div>
  )
}

export default Profile;