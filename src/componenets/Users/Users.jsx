import { useState, useEffect } from 'react';

import Button from '../Button/Button';
import SingleUser from './SingleUser/SingleUser';
import FollowingGroup from './FollowingGroup/FollowingGroup';

import style from './Users.module.css';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetch(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=5`)
      .then(response => response.json())
      .then((response) => {
        setUsers(response.items)
      })
      .catch((error) => console.log(error))
  }, [])

  const toggleFollowButton = (id, photos, name, followed) => {

    let newFollowing = {
      id: id,
      photos: photos,
      name: name,
    }

    followed
      ? setFollowing(following.filter((singleFollowing) => singleFollowing.id !== id))
      : setFollowing([newFollowing, ...following])

    setUsers(users.map((user) => {
      return user.id === id
        ? { ...user, followed: !user.followed }
        : { ...user }
    }))
  }

  const showMoreHandler = () => {
    setPageCount(pageCount + 1)
    fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${pageCount + 1}&count=5`)
      .then(response => response.json())
      .then((response) => {
        setUsers([...users, ...response.items])
      })
  }

  return (
    <div className={style.users}>
      <FollowingGroup following={following} />
      <div className={style.usersInner}>
        <h4 className={style.usersTitle}>Users</h4>
        {users.map(({ id, name, status, followed, photos }) => {
          return (
            <SingleUser id={id} key={id} name={name} photos={photos} status={status} followed={followed} toggleFollowButton={toggleFollowButton} />
          )
        })}
        <div className={style.showMore}>
          <Button className={style.showMoreButton} text='Show more' onClick={showMoreHandler} />
        </div>
      </div>
    </div>

  )
}

export default Users;