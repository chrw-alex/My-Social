import { ReactComponent as SuccessSvg } from '../../../assets/img/success.svg'
import style from './Success.module.css'

const Success = () => {
    return (
        <div className={style.success}>
            <p>Success!</p>
            <SuccessSvg />
        </div>
    )
}

export default Success