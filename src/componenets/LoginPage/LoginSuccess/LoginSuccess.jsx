import { ReactComponent as SuccessSvg } from './../../../assets/img/success.svg'
import style from './LoginSuccess.module.css'

const LoginSuccess = () => {
  return (
    <div className={style.loginSuccess}>
      <div>
        <p className={style.loginSuccessText}>Authorization is successfull</p>
        <SuccessSvg />
      </div>
    </div>
  )
}

export default LoginSuccess