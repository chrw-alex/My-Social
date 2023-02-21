import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../api/api'

import { ReactComponent as LogoutSvg } from '../../../assets/img/logout.svg'
import PreloaderSmall from '../../PreloaderSmall/PreloaderSmall'
import style from './Login.module.css'

const Login = ({ authorisedUserProfile, setAuthorizedUser, isAuthorized, setIsAuthorized, isLoading }) => {

  const navigate = useNavigate()

  const logout = () => {
    logoutUser()
      .then((response) => {
        if (response.data.resultCode === 0) {
          setIsAuthorized(false)
          setAuthorizedUser({})
          navigate('/login')
        }
      })
  }

  return (
    <div>
      {isLoading ?
        <PreloaderSmall />
        : (isAuthorized
          ? (<div className={style.logout}>
            <p className={style.userName}>{authorisedUserProfile.fullName}</p>
            <LogoutSvg className={style.logoutBtn} onClick={logout} />
          </div>
          )
          : (<button className={style.loginBtn}>
            <NavLink className={style.loginLink} to='login'>Login</NavLink>
          </button>))
      }
    </div>
  )
}

export default Login