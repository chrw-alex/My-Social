import { NavLink, useNavigate } from 'react-router-dom'

import { ReactComponent as LogoutSvg } from '../../../assets/img/logout.svg'
import { logoutUser } from '../../../api/api'
import style from './Login.module.css'

const Login = ({ authorizedUser, setAuthorizedUser, isAuthorized, setIsAuthorized }) => {

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
          <p className={style.userName}>{authorizedUser.login}</p>
          <LogoutSvg className={style.logoutBtn} onClick={logout} />
        </div>
        )
        : (<button className={style.login}>
          <NavLink className={style.loginLink} to='login'>Login</NavLink>
        </button>)}
    </div>
  )
}

export default Login