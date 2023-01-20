import DialogsItem from './DialogsItem/DialogsItem';
import dialogsData from '../../../data/dialogsData';

import style from './Dialogs.module.css';

const Dialogs = () => {
  return (
    <ul className={style.dialogs}>
      {dialogsData.map(({ id, name }) => {
        return (
          <DialogsItem id={id} name={name} key={id} />
        )
      })}
    </ul>
  )
}

export default Dialogs;