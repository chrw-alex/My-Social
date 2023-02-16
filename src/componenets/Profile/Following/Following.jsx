import { useState, useEffect } from 'react';
import { getFriends } from '../../../api/api';
import SingleFollowing from './SingleFollowing/SingleFollowing';
import style from './Following.module.css';
import PreloaderSmall from '../../PreloaderSmall/PreloaderSmall';

const Following = ({ noUserPhoto }) => {

  const [following, setFollowing] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getFriends()
      .then((data) => {
        setFollowing(data.items)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={style.followingGroup}>
      <h4 className={style.followingTitle}>Following</h4>
      {isLoading
        ? <PreloaderSmall />
        : <div className={style.following}>
          {following.map(({ id, name, photos }) => {
            return (
              <SingleFollowing key={id} id={id} name={name} photos={photos} noUserPhoto={noUserPhoto} />
            )
          })}
        </div>}

    </div>
  )
}

export default Following;