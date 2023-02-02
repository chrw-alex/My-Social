import Dialogs from './Dialogs/Dialogs';
import SingleDialog from './SingleDialog/SingleDialog';
import LoginPage from '../LoginPage/LoginPage';

import style from './Messages.module.css';

const Messages = ({ isAuthorized }) => {

  if (!isAuthorized) {
    return (
      <LoginPage />
    )
  }

  return (
    <div className={style.messages}>
      <Dialogs />
      <SingleDialog />
    </div>
  )
}

export default Messages;