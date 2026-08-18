import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import avatar from '../assets/avatar.png'
import arrowRight from '../assets/arrow-right.svg'
import userIcon from '../assets/icon-user.svg'
import targetIcon from '../assets/icon-target.svg'
import settingsIcon from '../assets/icon-settings.svg'
import bellIcon from '../assets/bell.svg'
import downloadIcon from '../assets/icon-download.svg'
import chatIcon from '../assets/icon-chat.svg'
import logoutIcon from '../assets/icon-logout.svg'

const menu = [
  [userIcon, 'プロフィール編集'],
  [targetIcon, '目標設定'],
  [settingsIcon, 'アカウント設定'],
  [bellIcon, '通知設定'],
  [downloadIcon, 'データのエクスポート'],
  [chatIcon, 'ヘルプ・サポート'],
  [logoutIcon, 'ログアウト'],
]

export default function ProfilePage({ profile, onEdit, onGoals }) {
  const [notice, setNotice] = useState('')
  const open = (label) => {
    if (label === 'プロフィール編集') onEdit()
    else if (label === '目標設定') onGoals()
    else setNotice(`${label}はポートフォリオ表示です`)
  }
  return (
    <>
      <PageHeader title="マイページ" />
      <section className="screen-scroll profile-scroll" aria-label="マイページ">
        <div className="profile-identity">
          <img src={profile.avatar || avatar} alt={profile.name} />
          <strong>{profile.name}</strong>
          <span>2024年6月10日から利用中</span>
        </div>

        <GlassCard className="profile-health-card">
          <strong>スキンヘルス</strong>
          <b>78%</b>
          <span>順調</span>
        </GlassCard>

        <div className="profile-menu">
          {menu.map(([icon, label]) => (
            <GlassCard as="button" className="profile-menu-row" type="button" key={label} onClick={() => open(label)}>
              <span className="profile-menu-row__label"><img src={icon} alt="" />{label}</span>
              {label !== 'ログアウト' ? <img src={arrowRight} alt="" /> : null}
            </GlassCard>
          ))}
        </div>
        {notice ? <div className="profile-toast" role="status">{notice}<button type="button" onClick={() => setNotice('')}>閉じる</button></div> : null}
      </section>
    </>
  )
}
