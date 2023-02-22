import { ReactComponent as RequiredSvg } from '../assets/img/required.svg'

export const required = value => (value ? undefined : <RequiredSvg />)

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Max length is ${maxLength} symbols!`
  }
}

export const minLength1 = value => (value ? undefined : 'Min length is 1 symbol!')

export const checkSpacesValidator = (str) => str?.trim() !== '' ? undefined : 'Text contains only spaces!'

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);