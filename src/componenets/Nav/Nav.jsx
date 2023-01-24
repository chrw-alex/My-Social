import { NavLink } from 'react-router-dom';

import style from './Nav.module.css';

const Nav = () => {
  return (
    <div className={style.nav}>
      <nav>
        <div>
          <NavLink to='/profile' className={style.link}>Profile</NavLink>
        </div>
        <div>
          <NavLink to='/messages' className={style.link}>Messages</NavLink>
        </div>
        <div>
          <NavLink to='/news' className={style.link}>News</NavLink>
        </div>
        <div>
          <NavLink to='/music' className={style.link}>Music</NavLink>
        </div>
        <div>
          <NavLink to='/users' className={style.link}>Users</NavLink>
        </div>
        <div className={style.separatedDiv}>
          <NavLink to='/settings' className={style.settingsLink}>Settings</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Nav;