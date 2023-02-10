import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { loginUser, getMe, getCaptcha } from '../../api/api';
import { required } from '../../additional/validators';

import { ReactComponent as RefreshSvg } from '../../assets/img/refresh.svg'
import Button from '../Button/Button';
import PreloaderSmall from '../PreloaderSmall/PreloaderSmall';
import LoginSuccess from './LoginSuccess/LoginSuccess';
import Error from '../Error/Error';

import style from './LoginPage.module.css';

const LoginPage = ({ setIsAuthorized, setAuthorizedUser }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const navigate = useNavigate();

  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    setIsLoading(true)
    loginUser(email, password, rememberMe, captcha)
      .then((response) => {
        if (response.data.resultCode === 0) {
          setUserId(response.data.data.userId)
          setIsLoginSuccessfull(true)
          setIsAuthorized(true)
        } else if (response.data.resultCode === 10) {
          getCaptcha()
            .then((response) => {
              setCaptchaUrl(response.data.url)
              setErrorMessage('Please, type the characters above')
            })
        } else {
          setErrorMessage(...response.data.messages)
        }
      })
      .then(() => {
        getMe()
          .then(response => {
            if (response.data.resultCode === 0) {
              setIsAuthorized(true)
              setAuthorizedUser(response.data.data)
            }
          })
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }

  const refreshCaptcha = () => {
    getCaptcha()
      .then((response) => {
        setCaptchaUrl(response.data.url)
      })
  }

  useEffect(() => {
    if (isLoginSuccessfull) {
      setTimeout(() => navigate(`/profile/${userId}`), 3000)
    }
  }, [isLoginSuccessfull, userId, navigate])

  if (error) {
    return (
      <Error />
    )
  }

  return (
    <div className={style.loginPage}>
      {isLoginSuccessfull ? <LoginSuccess />
        : (
          <div className={style.loginInner}>
            <h3 className={style.loginTitle}>Login</h3>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, form, invalid }) => (
                <form className={style.form} onSubmit={handleSubmit}>

                  <Field name='email' validate={required} >
                    {({ input, meta }) => (
                      <div className={style.formInner}>
                        <input {...input} className={style.input} type='email' placeholder='Enter your email' />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                  <Field name='password' validate={required}>
                    {({ input, meta }) => (
                      <div className={style.formInner}>
                        <input {...input} className={style.input} type='password' placeholder='Enter your password' />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                  <Field name='rememberMe' type='checkbox'>
                    {({ input }) => (
                      <div className={style.formInner}>
                        <input {...input} id='checkbox' className={style.checkbox} type='checkbox' />
                        <label htmlFor='checkbox'>Remember me</label>
                      </div>
                    )}
                  </Field>
                  {captchaUrl
                    ? <Field name='captcha'>
                      {({ input }) => (
                        <div className={style.formInner + ' ' + style.captchaInner}>
                          <RefreshSvg className={style.refreshIcon} title='refresh captcha' onClick={refreshCaptcha} />
                          <img src={captchaUrl} alt='captcha' className={style.captchaImg} />
                          <input {...input} className={style.input + ' ' + style.captchaInput} placeholder='type the characters here' />
                        </div>
                      )}
                    </Field>
                    : null}
                  <div className={style.buttonInner}>
                    {isLoading
                      ? <PreloaderSmall />
                      : <Button className={style.button} type='submit' text='Login' disabled={invalid} onClick={() => isLoginSuccessfull && setTimeout(form.reset, 500)} />}
                  </div>
                </form>
              )}
            />
            {!errorMessage
              ? null
              : (
                <div className={style.invalidData}>{errorMessage}</div>
              )}
          </div>
        )}
    </div>

  )
}

export default LoginPage