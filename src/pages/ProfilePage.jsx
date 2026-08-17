import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import avatar from '../assets/avatar.png'
import arrowRight from '../assets/arrow-right.svg'

const menu = [
  ['user', 'プロフィール編集'],
  ['target', '目標設定'],
  ['gear', 'アカウント設定'],
  ['bell', '通知設定'],
  ['download', 'データのエクスポート'],
  ['help', 'ヘルプ・サポート'],
  ['logout', 'ログアウト'],
]

function MenuIcon({ type }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (type === 'user') return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" {...common}/><path d="M5.5 19c.8-4 3-6 6.5-6s5.7 2 6.5 6" {...common}/></svg>
  if (type === 'target') return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" {...common}/><circle cx="12" cy="12" r="3" {...common}/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" {...common}/></svg>
  if (type === 'gear') return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" {...common}/><path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2-1.7.7-1.9-.9-2.1 2.1.9 1.9-.7 1.7-2 .7v3l2 .7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2h3l.7-2 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7 2-.7Z" {...common}/></svg>
  if (type === 'bell') return <svg viewBox="0 0 24 24"><path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4L6 17Z" {...common}/><path d="M10 19a2 2 0 0 0 4 0" {...common}/></svg>
  if (type === 'download') return <svg viewBox="0 0 24 24"><path d="M12 3v11M8 10l4 4 4-4M5 20h14" {...common}/></svg>
  if (type === 'help') return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" {...common}/><path d="M9.8 9a2.3 2.3 0 0 1 4.5.7c0 1.8-2.3 2-2.3 3.8M12 17h.01" {...common}/></svg>
  return <svg viewBox="0 0 24 24"><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" {...common}/></svg>
}

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="マイページ" />
      <section className="screen-scroll profile-scroll" aria-label="マイページ">
        <div className="profile-identity">
          <img src={avatar} alt="Helen Smith" />
          <strong>Helen Smith</strong>
          <span>2024年6月10日から利用中</span>
        </div>

        <GlassCard className="profile-health-card">
          <strong>スキンヘルス</strong>
          <b>78%</b>
          <span>順調</span>
        </GlassCard>

        <div className="profile-menu">
          {menu.map(([icon, label]) => (
            <GlassCard as="button" className="profile-menu-row" type="button" key={label}>
              <span className="profile-menu-row__label"><MenuIcon type={icon} />{label}</span>
              {label !== 'ログアウト' ? <img src={arrowRight} alt="" /> : null}
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  )
}
