import { ReactComponent as FacebookSvg } from '../../../../assets/img/contacts/facebook.svg'
import { ReactComponent as GitHubSvg } from '../../../../assets/img/contacts/github.svg'
import { ReactComponent as InstaSvg } from '../../../../assets/img/contacts/instagram.svg'
import { ReactComponent as TwitterSvg } from '../../../../assets/img/contacts/twitter.svg'
import { ReactComponent as VkSvg } from '../../../../assets/img/contacts/vk.svg'
import { ReactComponent as WebSvg } from '../../../../assets/img/contacts/web.svg'
import { ReactComponent as YoutubeSvg } from '../../../../assets/img/contacts/youtube.svg'

import checkUrl from '../../../../additional/checkUrl';

import style from './Contacts.module.css';

const Contacts = ({ profile }) => {
  return (
    <div>
      <h3 className={style.contactsTitle}>Contacts</h3>
      <div className={style.contactsLinks}>
        {profile.contacts.facebook
          ? (<a href={checkUrl(profile.contacts.facebook)} target='_blank' rel='noreferrer'>
            <FacebookSvg className={style.contactsIcon} />
          </a>)
          : null}
        {profile.contacts.github
          ? (<a href={checkUrl(profile.contacts.github)} target='_blank' rel='noreferrer'>
            <GitHubSvg className={style.contactsIcon + ' ' + style.transformIcon} />
          </a>)
          : null}
        {profile.contacts.instagram
          ? (<a href={checkUrl(profile.contacts.instagram)} target='_blank' rel='noreferrer'>
            <InstaSvg className={style.contactsIcon} />
          </a>)
          : null}
        {profile.contacts.twitter
          ? (<a href={checkUrl(profile.contacts.twitter)} target='_blank' rel='noreferrer'>
            <TwitterSvg className={style.contactsIcon} />
          </a>)
          : null}
        {profile.contacts.vk
          ? (<a href={checkUrl(profile.contacts.vk)} target='_blank' rel='noreferrer'>
            <VkSvg className={style.contactsIcon} />
          </a>)
          : null}
        {profile.contacts.website
          ? (<a href={checkUrl(profile.contacts.website)} target='_blank' rel='noreferrer'>
            <WebSvg className={style.contactsIcon + ' ' + style.transformIcon} />
          </a>)
          : null}
        {profile.contacts.youtube
          ? (<a href={checkUrl(profile.contacts.youtube)} target='_blank' rel='noreferrer'>
            <YoutubeSvg className={style.contactsIcon + ' ' + style.transformIcon} />
          </a>)
          : null}
      </div>
    </div>
  )
}

export default Contacts;