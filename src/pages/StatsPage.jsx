import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import plusIcon from '../assets/plus.svg'

const analyticsData = {
  week: { calories: '1,380 kcal', intake: '1,390 kcal', weight: '−0.4 kg', meta: '7日間の変化', bars: [42,68,54,82,61,74,58] },
  month: { calories: '1,420 kcal', intake: '1,420 kcal', weight: '−1.2 kg', meta: '今月の変化', bars: [34,60,44,72,48,66,38,56,76,42,68,50] },
  year: { calories: '1,455 kcal', intake: '1,470 kcal', weight: '−4.8 kg', meta: '今年の変化', bars: [44,52,60,57,66,72,64,78,74,82,80,88] },
}
const weightData = { week: ['58.6', '前回より -0.1 kg'], month: ['58.4', '前回より -0.2 kg'], quarter: ['59.2', '3ヶ月で -1.0 kg'] }

function Bars({ values }) { return <div className="stats-bars" aria-hidden="true">{values.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div> }
function Line({ variant = 0 }) { const paths = ['M12 70 C58 55 72 48 112 52 S178 62 224 27','M12 40 C54 44 75 58 116 52 S176 45 224 72','M12 66 C50 28 88 52 126 35 S182 64 224 30']; return <svg className="stats-line-chart" viewBox="0 0 240 92" aria-hidden="true"><path d={paths[variant]} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="12" cy={variant === 1 ? 40 : variant === 2 ? 66 : 70} r="4"/><circle cx="224" cy={variant === 1 ? 72 : variant === 2 ? 30 : 27} r="4"/></svg> }

export default function StatsPage({ view = 'overview', onView, onBack }) {
  const [analyticsPeriod, setAnalyticsPeriod] = useState('month')
  const [weightPeriod, setWeightPeriod] = useState('month')
  if (view === 'weight') {
    const data = weightData[weightPeriod]
    return <><PageHeader title="体重記録" centered onBack={onBack} /><section className="screen-scroll stats-detail-scroll"><div className="segmented-control">{[['week','週'],['month','月'],['quarter','3ヶ月']].map(([id,label]) => <button type="button" key={id} className={weightPeriod === id ? 'is-active' : ''} onClick={() => setWeightPeriod(id)}>{label}</button>)}</div><GlassCard className="weight-chart"><strong><b>{data[0]}</b> kg</strong><span>{data[1]}</span><Line variant={weightPeriod === 'week' ? 0 : weightPeriod === 'month' ? 1 : 2} /></GlassCard><button className="gradient-button weight-record-button" type="button">体重を記録 <img src={plusIcon} alt="" /></button></section></>
  }
  if (view === 'analytics') {
    const data = analyticsData[analyticsPeriod]
    return <><PageHeader title="統計" /><section className="screen-scroll analytics-scroll"><div className="segmented-control">{[['week','週'],['month','月'],['year','年']].map(([id,label]) => <button type="button" key={id} className={analyticsPeriod === id ? 'is-active' : ''} onClick={() => setAnalyticsPeriod(id)}>{label}</button>)}</div><GlassCard className="analytics-card"><strong>カロリー平均</strong><b>{data.calories}</b><span>目標との差 +30 kcal</span></GlassCard><GlassCard className="analytics-card analytics-card--bars"><strong>摂取カロリー</strong><b>{data.intake}</b><span>先週 +4%</span><Bars values={data.bars} /></GlassCard><GlassCard as="button" type="button" className="analytics-card analytics-card--line" onClick={() => onView('weight')}><strong>体重の変化</strong><b>{data.weight}</b><span>{data.meta}</span><Line variant={analyticsPeriod === 'week' ? 0 : analyticsPeriod === 'month' ? 1 : 2} /></GlassCard></section></>
  }
  return <><PageHeader title="進捗" /><section className="screen-scroll stats-scroll" aria-label="進捗"><GlassCard as="button" type="button" className="stats-card stats-card--skin" onClick={() => onView('analytics')}><strong>スキンヘルス</strong><b>78%</b><span>先週 +6%</span><Line /></GlassCard><GlassCard as="button" type="button" className="stats-card stats-card--routine" onClick={() => onView('analytics')}><strong>ルーティン達成率</strong><b>67%</b><span>先週 +12%</span><Bars values={[34,24,48,40,62,50,72,58,78,66,83,90]} /></GlassCard><GlassCard as="button" type="button" className="stats-card stats-card--days" onClick={() => onView('weight')}><strong>継続日数</strong><b>4日</b><span>目標：7日</span></GlassCard></section></>
}
