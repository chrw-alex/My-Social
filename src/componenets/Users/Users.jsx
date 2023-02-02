import { useState, useEffect } from 'react';
import { getUsers, postFollow, deleteFollow, showMore } from '../../api/api';

import Button from '../Button/Button';
import SingleUser from './SingleUser/SingleUser';
// import FollowingGroup from './FollowingGroup/FollowingGroup';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

import style from './Users.module.css';

const Users = () => {

  const [users, setUsers] = useState([]);
  // const [following, setFollowing] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers(1, 10)
      .then((data) => {
        setUsers(data.items)
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false)
        setIsDisabled(false)
      })
  }, [])

  const followUser = (button, id) => {
    button.disabled = true
    postFollow(id)
      .then(response => {
        if (response.data.resultCode === 0) {
          setUsers(users.map((user) => {
            return user.id === id
              ? { ...user, followed: !user.followed }
              : { ...user }
          }))
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => button.disabled = false)
  }

  const unfollowUser = (button, id) => {
    button.disabled = true
    deleteFollow(id)
      .then(response => {
        if (response.data.resultCode === 0) {
          setUsers(users.map((user) => {
            return user.id === id
              ? { ...user, followed: !user.followed }
              : { ...user }
          }))
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => button.disabled = false)
  }

  // const toggleFollowButton = (id, photos, name, followed) => {
  //   let newFollowing = {
  //     id: id,
  //     photos: photos,
  //     name: name,
  //   }

  //   followed
  //     ? setFollowing(following.filter((singleFollowing) => singleFollowing.id !== id))
  //     : setFollowing([newFollowing, ...following])

  //   setUsers(users.map((user) => {
  //     return user.id === id
  //       ? { ...user, followed: !user.followed }
  //       : { ...user }
  //   }))
  // }

  const showMoreHandler = () => {
    setIsShowMoreLoading(true)
    setPageCount(pageCount + 1)
    showMore(pageCount + 1, 10)
      .then((data) => {
        setUsers([...users, ...data.items])
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsShowMoreLoading(false))
  }

  if (error) {
    return (
      <Error />
    )
  }

  return (
    <div className={style.users}>
      {/* <FollowingGroup following={following} /> */}
      <div className={style.usersInner}>
        <h4 className={style.usersTitle}>Users</h4>
        {isLoading
          ? <Preloader />
          : (users.map(({ id, name, status, followed, photos }) => {
            return (
              <SingleUser id={id} key={id} name={name} photos={photos} status={status} followed={followed} followUser={followUser} unfollowUser={unfollowUser} />
            )
          }))}
        <div className={style.showMore}>
          {isShowMoreLoading
            ? <Preloader />
            : (isDisabled
              ? null
              : <Button className={style.showMoreButton} text='Show more' onClick={showMoreHandler} />)}
        </div>
      </div>
    </div>

  )
}

export default Users;