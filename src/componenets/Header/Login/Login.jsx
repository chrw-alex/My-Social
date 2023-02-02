import { NavLink } from 'react-router-dom'
import style from './Login.module.css'

const Login = ({ authorizedUser, isAuthorized }) => {
  return (
    <div>
      {isAuthorized
        ? (<p className={style.userName}>{authorizedUser.login}</p>)
        : <button className={style.login}>
          <NavLink className={style.loginLink} to='login'>Login</NavLink>
        </button>}
    </div>
  )
}

export default Login