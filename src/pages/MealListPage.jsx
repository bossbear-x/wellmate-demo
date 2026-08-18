import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import backIcon from '../assets/back.svg'
import calendarIcon from '../assets/calendar.svg'
import arrowRight from '../assets/arrow-right.svg'
import plusIcon from '../assets/plus.svg'
import riceIcon from '../assets/rice.svg'
import saladIcon from '../assets/salad.svg'
import coffeeIcon from '../assets/coffee.svg'
import beerIcon from '../assets/beer.svg'

export default function MealListPage({ meals, onBack, onAdd, saved = false }) {
  const rows = [
    { id: 'breakfast', label: '朝ごはん', icon: riceIcon },
    { id: 'lunch', label: '昼ごはん', icon: saladIcon, action: onAdd },
    { id: 'dinner', label: '夕ごはん', icon: coffeeIcon, action: onAdd },
    { id: 'snack', label: '間食・その他', icon: beerIcon },
  ]

  return (
    <>
      <PageHeader title="食事記録" centered onBack={onBack} />
      <section className={`screen-scroll meal-list-scroll ${saved ? 'is-updated' : ''}`} aria-label="食事記録">
        {saved ? <div className="saved-banner" role="status">食事を記録しました</div> : null}

        <GlassCard className="date-picker">
          <img src={backIcon} alt="" />
          <strong>2024年6月20日（木）</strong>
          <img src={calendarIcon} alt="" />
        </GlassCard>

        <GlassCard className="calorie-card">
          <strong>カロリー摂取</strong>
          <b>{saved ? '1,870 kcal' : '1,350 kcal'}</b>
          <span>目標との差 {saved ? '+70 kcal' : '-450 kcal'}</span>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: saved ? '100%' : '75%' }} />
          </div>
        </GlassCard>

        <div className="meal-row-list">
          {rows.map((row) => (
            <GlassCard
              as="button"
              className="record-row"
              type="button"
              key={row.label}
              onClick={row.action}
              aria-disabled={!row.action}
            >
              <span className="record-row__label"><img src={row.icon} alt="" />{row.label}</span>
              <span className={`record-row__status ${meals[row.id] ? 'is-saved' : ''}`}>
                {meals[row.id] ? `${meals[row.id].kcal} kcal` : '未記録'}<img src={arrowRight} alt="" />
              </span>
            </GlassCard>
          ))}
        </div>

        <button className="gradient-button add-meal-button" type="button" onClick={onAdd}>
          <span>食事を追加</span><img src={plusIcon} alt="" />
        </button>
      </section>
    </>
  )
}
