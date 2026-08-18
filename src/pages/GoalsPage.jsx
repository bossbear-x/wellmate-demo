import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

const goals = ['体重を減らす','体重を維持する','筋肉をつける','健康的な生活習慣をつくる']

export default function GoalsPage({ initialGoal, onBack, onSave }) {
  const [goal, setGoal] = useState(initialGoal)
  return <><PageHeader title="目標設定" centered onBack={onBack} action={<button className="text-action" type="button" onClick={() => onSave(goal)}>保存</button>} /><section className="screen-scroll goals-scroll" aria-label="目標設定"><h2>目標を選択</h2><div className="goal-options">{goals.map((item) => <GlassCard as="button" type="button" key={item} className="goal-option" onClick={() => setGoal(item)} aria-pressed={goal === item}><span>{item}</span><i className={goal === item ? 'is-selected' : ''} /></GlassCard>)}</div><h2>目標期間</h2><GlassCard className="goal-period">3ヶ月</GlassCard><GlassCard className="goal-calorie"><strong>1日のカロリー目標</strong><b>1,800 kcal</b><span><i /></span></GlassCard><button className="gradient-button goals-next" type="button" onClick={() => onSave(goal)}>次へ</button></section></>
}
