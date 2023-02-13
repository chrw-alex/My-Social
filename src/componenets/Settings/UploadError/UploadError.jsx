import { ReactComponent as ErrorSvg } from '../../../assets/img/required.svg'
import style from './UploadError.module.css'

const UploadError = ({ error }) => {
  return (
    <div className={style.error}>
      <p>{error}</p>
      <ErrorSvg />
    </div>
  )
}

export default UploadError