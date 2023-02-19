import FriendsItem from './FriendsItem/FriendsItem';

import style from './Friends.module.css';

const Friends = ({ friends, noUserPhoto }) => {
  return (
    <div className={style.friends}>
      <ul>
        {friends.map(({ id, name, photos }) => {
          return (
            <FriendsItem key={id} id={id} name={name} photos={photos} noUserPhoto={noUserPhoto} />
          )
        })}
      </ul>
    </div>
  )
}

export default Friends;