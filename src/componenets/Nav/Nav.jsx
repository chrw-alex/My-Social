import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileSvg } from '../../assets/img/nav/profile.svg'
import { ReactComponent as MessagesSvg } from '../../assets/img/nav/messages.svg'
import { ReactComponent as UsersSvg } from '../../assets/img/nav/users.svg'
import { ReactComponent as SettingsSvg } from '../../assets/img/nav/settings.svg'

import style from './Nav.module.css';

const Nav = ({ authorizedUser, isAuthorized, messagesCount }) => {
  return (
    <div className={style.nav}>
      <nav>
        <div>
          <NavLink to={isAuthorized ? `/profile/${authorizedUser.id}` : '/login'} className={style.link}>
            <span className={style.linkText}>Profile</span>
            <span className={style.navIcon + ' ' + style.messagesIcon}><ProfileSvg /></span>
          </NavLink>
        </div>
        <div>
          <NavLink to={isAuthorized ? '/messages' : '/login'} className={style.link}>
            <span className={style.linkText}>Messages</span>
            <span className={style.navIcon + ' ' + style.messagesIcon}><MessagesSvg /></span>
            {messagesCount > 0 ? <span className={style.messagesCount}>{`(${messagesCount})`}</span> : null}
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' className={style.link}>
            <span className={style.linkText}>Users</span>
            <span className={style.navIcon + ' ' + style.messagesIcon}><UsersSvg /></span>
          </NavLink>
        </div>
        <div className={style.separatedDiv}>
          <NavLink to={isAuthorized ? '/settings' : '/login'} className={style.link}>
            <span className={style.linkText}>Settings</span>
            <span className={style.navIcon + ' ' + style.messagesIcon}><SettingsSvg /></span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Nav;