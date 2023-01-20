import SingleFollowing from './SingleFollowing/SingleFollowing';
import style from './FollowingGroup.module.css';

const FollowingGroup = ({ following }) => {
  return (
    <div className={style.followingGroup}>
      <h4 className={style.followingTitle}>Recent Following</h4>
      <div className={style.following}>

        {following.map(({ id, name, photos }) => {
          return (
            <SingleFollowing photos={photos} name={name} key={id} />
          )
        })}
      </div>
    </div>

  )
}

export default FollowingGroup;