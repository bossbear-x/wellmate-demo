import avatar from '../assets/avatar.png'
import bellIcon from '../assets/bell.svg'
import menuIcon from '../assets/menu.svg'
import plusIcon from '../assets/plus.svg'
import arrowRight from '../assets/arrow-right.svg'
import breakfastIcon from '../assets/record-meal.svg'
import lunchIcon from '../assets/rice.svg'
import fireIcon from '../assets/fire.svg'
import proteinIcon from '../assets/protein.svg'
import waterIcon from '../assets/water.svg'
import GlassCard from '../components/GlassCard.jsx'

const summary = [
  { label: 'カロリー', value: '1,350', unit: '/ 1,800 kcal', icon: fireIcon },
  { label: 'たんぱく質', value: '68', unit: '/ 120 g', icon: proteinIcon },
  { label: '水分', value: '1.2', unit: '/ 2.0 L', icon: waterIcon },
]

export default function HomePage({ meals, onStartRecord, onLunch, onNotifications, onProfile }) {
  const records = [
    { id: 'breakfast', label: '朝ごはん', icon: breakfastIcon },
    { id: 'lunch', label: '昼ごはん', icon: lunchIcon },
  ]

  return (
    <>
      <header className="home-header">
        <div className="home-header__greeting">
          <img className="avatar" src={avatar} alt="Helenのプロフィール" />
          <strong>こんにちは、Helenさん</strong>
        </div>
        <div className="home-header__actions">
          <button className="circle-button" type="button" aria-label="通知" onClick={onNotifications}>
            <img src={bellIcon} alt="" />
          </button>
          <button className="circle-button" type="button" aria-label="メニュー" onClick={onProfile}>
            <img src={menuIcon} alt="" />
          </button>
        </div>
      </header>

      <section className="screen-scroll home-scroll" aria-label="ホーム">
        <h1 className="home-hero">今日も<br />自分を大切に。</h1>
        <p className="home-subcopy">小さな積み重ねが、<br />未来のあなたをつくります。</p>

        <button className="floating-add" type="button" onClick={onStartRecord} aria-label="記録を追加">
          <img src={plusIcon} alt="" />
        </button>

        <h2 className="home-summary-title">今日のサマリー</h2>
        <div className="summary-grid">
          {summary.map((item) => (
            <GlassCard key={item.label} className="summary-card">
              <img src={item.icon} alt="" />
              <strong>{item.label}</strong>
              <b>{item.value}</b>
              <span>{item.unit}</span>
            </GlassCard>
          ))}
        </div>

        <h2 className="home-records-title">今日の記録</h2>
        {records.map((record) => {
          const meal = meals[record.id]
          return (
            <GlassCard as="button" className={`record-row home-${record.id}`} type="button" onClick={onLunch} key={record.id}>
              <span className="record-row__label"><img src={record.icon} alt="" />{record.label}</span>
              <span className={`record-row__status ${meal ? 'is-saved' : ''}`}>
                {meal ? `${meal.kcal} kcal` : '未記録'}<img src={arrowRight} alt="" />
              </span>
            </GlassCard>
          )
        })}
      </section>
    </>
  )
}
