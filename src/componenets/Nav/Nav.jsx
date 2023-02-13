import { NavLink } from 'react-router-dom';

import style from './Nav.module.css';

const Nav = ({ authorizedUser, isAuthorized }) => {
  return (
    <div className={style.nav}>
      <nav>
        <div>
          <NavLink to={isAuthorized ? `/profile/${authorizedUser.id}` : '/login'} className={style.link}>Profile</NavLink>
        </div>
        <div>
          <NavLink to={isAuthorized ? '/messages' : '/login'} className={style.link}>Messages</NavLink>
        </div>
        <div>
          <NavLink to='/users' className={style.link}>Users</NavLink>
        </div>
        <div className={style.separatedDiv}>
          <NavLink to={isAuthorized ? '/settings' : '/login'} className={style.settingsLink}>Settings</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Nav;