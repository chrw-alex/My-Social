import style from './SingleFollowing.module.css';

const SingleFollowing = ({ photos, name }) => {
  return (
    <div className={style.singleFollowing}>
      <img className={style.singleFollowingImg} src={photos.small || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt='userImg' />
      <div className={style.singleFollowingInfo}>
        <p className={style.singleFollowingName}>{name}</p>
      </div>
    </div>
  )
}

export default SingleFollowing;