import Login from './Login/Login';

import style from './Header.module.css';

const Header = ({ authorisedUserProfile, setAuthorizedUser, isAuthorized, setIsAuthorized }) => {
  return (
    <div className={style.header}>
      <div className={style.logoInner}>
        <img className={style.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" alt="logo" />
      </div>
      <Login authorisedUserProfile={authorisedUserProfile} setAuthorizedUser={setAuthorizedUser} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
    </div>
  )
}

export default Header;