import { ReactComponent as SuccessSvg } from './../../../assets/img/success.svg'
import style from './LoginSuccess.module.css'

const LoginSuccess = () => {
  return (
    <div className={style.loginSuccess}>
      <p className={style.loginSuccessText}>Authorization is successfull</p>
      <SuccessSvg />
    </div>
  )
}

export default LoginSuccess