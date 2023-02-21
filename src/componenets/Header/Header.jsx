import { Link } from 'react-router-dom';
import Login from './Login/Login';

import style from './Header.module.css';

const Header = ({ authorisedUserProfile, setAuthorizedUser, isAuthorized, setIsAuthorized, authorizedUser, isLoading }) => {
  return (
    <div className={style.header}>
      <div className={style.logoInner}>
        <Link to={isAuthorized ? `/profile/${authorizedUser.id}` : '/login'} className={style.link}>
          <img className={style.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" alt="logo" />
        </Link>
      </div>
      <Login authorisedUserProfile={authorisedUserProfile} setAuthorizedUser={setAuthorizedUser} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} isLoading={isLoading} />
    </div>
  )
}

export default Header;