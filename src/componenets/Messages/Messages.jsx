import Dialogs from './Dialogs/Dialogs';
import SingleDialog from './SingleDialog/SingleDialog';

import style from './Messages.module.css';

const Messages = ({ authorisedUserProfile, noUserPhoto }) => {
  return (
    <div className={style.messages}>
      <Dialogs />
      <SingleDialog authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />
    </div>
  )
}

export default Messages;