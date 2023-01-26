import style from './Login.module.css'

const Login = ({ authorizedUser, isAuthorized }) => {
  return (
    <div>
      {isAuthorized
        ? (<p className={style.userName}>{authorizedUser.login}</p>)
        : <button className={style.login}>Login</button>}
    </div>
  )
}

export default Login