import style from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div className={style.profileInfo}>
      <img className={style.profileAvatar} src='https://klike.net/uploads/posts/2022-07/1658727898_47.jpg' alt="profile" />
      <div>
        <h3>Alexandra Sergeevna</h3>
        <p>Date of Birth: 19 November</p>
        <p>City: Novopolatsk</p>
        <p>Education: PSU'15</p>
        <p>Website: www.alexandra.com</p>
      </div>
    </div>
  )
}

export default ProfileInfo;