import { useState, useEffect } from 'react';
import { getUsers, showMore } from '../../api/api';

import Button from '../Button/Button';
import UsersSearch from './UsersSearch/UsersSearch';
import SingleUser from './SingleUser/SingleUser';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

import style from './Users.module.css';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState()
  const [text, setText] = useState('')
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);
  const [error, setError] = useState('');

  const isShowMoreVisible = totalCount === users.length ? false : true

  useEffect(() => {
    getUsers(1, 10)
      .then((data) => {
        setUsers(data.items)
        setTotalCount(data.totalCount)
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false)
        setIsDisabled(false)
      })
  }, [])

  const showMoreHandler = () => {
    setIsShowMoreLoading(true)
    setPageCount(pageCount + 1)
    showMore(pageCount + 1, 10, text)
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
      <div className={style.usersInner}>
        <UsersSearch users={users} setUsers={setUsers} text={text} setText={setText} setTotalCount={setTotalCount} />
        <h4 className={style.usersTitle}>Users</h4>
        {isLoading
          ? <Preloader />
          : (users.map(({ id, name, status, photos }) => {
            return (
              <SingleUser id={id} key={id} name={name} photos={photos} status={status} />
            )
          }))}
        <div className={style.showMore}>
          {isShowMoreLoading
            ? <Preloader />
            : (isDisabled
              ? null
              : (isShowMoreVisible ? <Button className={style.showMoreButton} text='Show more' onClick={showMoreHandler} /> : null)
            )}
        </div>
      </div>
    </div>

  )
}

export default Users;