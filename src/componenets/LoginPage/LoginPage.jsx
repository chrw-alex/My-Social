import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { loginUser, getMe } from '../../api/api';
import { ReactComponent as RequiredSvg } from './../../assets/img/required.svg'

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
  const [isDataCorrect, setIsDataCorrect] = useState(true);
  const navigate = useNavigate();

  const required = value => (value ? undefined : <RequiredSvg className={style.requiredIcon} />)

  const onSubmit = ({ email, password, rememberMe }) => {
    setIsLoading(true)
    loginUser(email, password, rememberMe)
      .then((response) => {
        if (response.data.resultCode === 0) {
          setUserId(response.data.data.userId)
          setIsLoginSuccessfull(true)
          setIsAuthorized(true)
        } else {
          setIsDataCorrect(false)
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
              render={({ handleSubmit, form }) => (
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
                  <div className={style.buttonInner}>
                    {isLoading
                      ? <PreloaderSmall />
                      : <Button className={style.button} type='submit' text='Login' onClick={() => setTimeout(form.reset, 500)} />}
                  </div>
                </form>
              )}
            />
            {isDataCorrect
              ? null
              : (
                <div className={style.invalidData}>Invalid email and/or password</div>
              )}
          </div>
        )}
    </div>

  )
}

export default LoginPage