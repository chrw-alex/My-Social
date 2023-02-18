import { NavLink, useNavigate } from 'react-router-dom'

import { ReactComponent as LogoutSvg } from '../../../assets/img/logout.svg'
import { logoutUser } from '../../../api/api'
import style from './Login.module.css'

const Login = ({ authorisedUserProfile, setAuthorizedUser, isAuthorized, setIsAuthorized }) => {

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
      {isAuthorized
        ? (<div className={style.logout}>
          <p className={style.userName}>{authorisedUserProfile.fullName}</p>
          <LogoutSvg className={style.logoutBtn} onClick={logout} />
        </div>
        )
        : (<button className={style.loginBtn}>
          <NavLink className={style.loginLink} to='login'>Login</NavLink>
        </button>)}
    </div>
  )
}

export default Login