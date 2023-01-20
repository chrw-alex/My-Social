import Dialogs from './Dialogs/Dialogs';
import SingleDialog from './SingleDialog/SingleDialog';

import style from './Messages.module.css';

const Messages = () => {
  return (
    <div className={style.messages}>
      <Dialogs />
      <SingleDialog />
    </div>
  )
}

export default Messages;