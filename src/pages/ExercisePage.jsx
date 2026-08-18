import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import calendarIcon from '../assets/calendar.svg'
import backIcon from '../assets/back.svg'
import arrowRight from '../assets/arrow-right.svg'
import walkingIcon from '../assets/sport-walking.svg'
import runningIcon from '../assets/sport-running.svg'
import cyclingIcon from '../assets/sport-cycling.svg'
import dumbbellIcon from '../assets/sport-dumbbell.svg'
import yogaIcon from '../assets/sport-yoga.svg'

const activities = [
  ['walking', 'ウォーキング', walkingIcon],
  ['running', 'ランニング', runningIcon],
  ['cycling', 'サイクリング', cyclingIcon],
  ['strength', '筋トレ', dumbbellIcon],
  ['yoga', 'ストレッチ・ヨガ', yogaIcon],
]

export default function ExercisePage({ onBack, onActivity, onNext }) {
  const [selected, setSelected] = useState('walking')
  return (
    <>
      <PageHeader title="運動記録" centered onBack={onBack} />
      <section className="screen-scroll exercise-scroll" aria-label="運動記録">
        <GlassCard className="date-picker exercise-date"><img src={backIcon} alt="" /><strong>2024年6月10日（火）</strong><img src={calendarIcon} alt="" /></GlassCard>
        <GlassCard className="exercise-summary">
          <strong>今日の消費カロリー</strong><b>120 kcal</b>
          <div className="exercise-bars" aria-hidden="true">{[28,43,62,88,52,36,70,94,58,42,74,50].map((h, i) => <i key={i} style={{height: `${h}%`}} />)}</div>
        </GlassCard>
        <div className="exercise-list">
          {activities.map(([id, label, icon]) => (
            <GlassCard as="button" type="button" key={id} className={`exercise-row ${selected === id ? 'is-selected' : ''}`} onClick={() => { setSelected(id); onActivity(id) }} aria-pressed={selected === id}>
              <span><img src={icon} alt="" />{label}</span><img src={arrowRight} alt="" />
            </GlassCard>
          ))}
        </div>
      </section>
      <button className="gradient-button exercise-next" type="button" onClick={() => onNext(selected)}>次へ</button>
    </>
  )
}
