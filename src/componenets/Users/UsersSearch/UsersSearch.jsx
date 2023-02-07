import { useState } from 'react'
import { ReactComponent as SearchSvg } from '../../../assets/img/search.svg'
import { searchUsersbyName } from '../../../api/api'
import PreloaderSmall from '../../PreloaderSmall/PreloaderSmall'
import style from './UsersSearch.module.css'

const UsersSearch = ({ setUsers, text, setText }) => {

  const [isLoading, setIsLoading] = useState(false)

  const onSearchHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    searchUsersbyName(1, 10, text)
      .then((data) => {
        setUsers(data.items)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={style.search}>
      <form className={style.form} onSubmit={(e) => onSearchHandler(e)} >
        <input className={style.input} placeholder='search...' type="text" value={text} onChange={(e) => setText(e.target.value)} />
        {isLoading
          ? <PreloaderSmall />
          : (<button className={style.button}>
            <SearchSvg type='submit' className={style.searchIcon} />
          </button>)}
      </form>
    </div>
  )
}

export default UsersSearch