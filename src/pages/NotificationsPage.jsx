import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import waterIcon from '../assets/water.svg'
import targetIcon from '../assets/icon-target.svg'
import weightIcon from '../assets/record-weight.svg'
import yogaIcon from '../assets/sport-yoga.svg'

const notices = [
  { id: 'goal', title: '目標の75%達成！', copy: '今日の目標まであと少しです', time: '9:30', icon: targetIcon, target: 'stats' },
  { id: 'water', title: '水分を飲みましょう', copy: '朝の水分補給を忘れずに', time: '8:00', icon: waterIcon, target: 'home' },
  { id: 'weight', title: '体重を記録しましょう', copy: '今日の体重を入力しましょう', time: '7:30', icon: weightIcon, target: 'weight' },
  { id: 'exercise', title: '運動おつかれさまでした！', copy: '昨日の運動記録を確認できます', time: '20:15', icon: yogaIcon, target: 'exercise' },
]

export default function NotificationsPage({ onBack, onOpen }) {
  const [read, setRead] = useState([])
  const open = (notice) => { setRead((items) => [...new Set([...items, notice.id])]); onOpen(notice.target) }
  return <><PageHeader title="通知" centered onBack={onBack} action={<button className="text-action" type="button" onClick={() => setRead(notices.map((item) => item.id))}>すべて既読</button>} /><section className="screen-scroll notifications-scroll" aria-label="通知"><h2>今日</h2>{notices.slice(0,3).map((notice) => <GlassCard as="button" type="button" className={`notification-row ${read.includes(notice.id) ? 'is-read' : ''}`} key={notice.id} onClick={() => open(notice)}><img src={notice.icon} alt="" /><span><strong>{notice.title}</strong><small>{notice.copy}</small></span><time>{notice.time}</time></GlassCard>)}<h2>昨日</h2>{notices.slice(3).map((notice) => <GlassCard as="button" type="button" className={`notification-row ${read.includes(notice.id) ? 'is-read' : ''}`} key={notice.id} onClick={() => open(notice)}><img src={notice.icon} alt="" /><span><strong>{notice.title}</strong><small>{notice.copy}</small></span><time>{notice.time}</time></GlassCard>)}</section></>
}
