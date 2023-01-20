import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.header}>
      <img className={style.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" alt="logo" />
      <h1 className={style.name}>My Social</h1>
    </div>
  )
}

export default Header;