import { useEffect, useMemo, useRef, useState } from 'react'
import avatar from './assets/avatar.png'
import splashArt from './assets/figma-v2/splash.png'
import onboarding1Art from './assets/figma-v2/onboarding-1.png'
import onboarding2Art from './assets/figma-v2/onboarding-2.png'
import onboarding3Art from './assets/figma-v2/onboarding-3.png'
import './styles/wellmate-v2.css'

const NAV = ['home', 'records', 'progress', 'ai', 'profile']
const NAV_LABELS = { home: 'ホーム', records: '記録', progress: '統計', ai: 'AI', profile: 'マイページ' }
const INTRO = ['splash', 'onboarding-1', 'onboarding-2', 'onboarding-3']
const INTRO_ART = { splash: splashArt, 'onboarding-1': onboarding1Art, 'onboarding-2': onboarding2Art, 'onboarding-3': onboarding3Art }

function Icon({ name, size = 24, className = '' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const p = {
    home: <><path d="M4 10.5 12 4l8 6.5V20h-5.4v-5.5H9.4V20H4z" {...common}/></>,
    record: <><path d="M12 5v14M5 12h14" {...common}/></>,
    stats: <><path d="M5 19V12M12 19V5M19 19V9" {...common}/><path d="M3.5 20.5h17" {...common}/></>,
    ai: <><rect x="5" y="7" width="14" height="11" rx="4" {...common}/><path d="M12 4v3M9 12h.01M15 12h.01M9 15h6" {...common}/><circle cx="12" cy="3.5" r="1" {...common}/></>,
    user: <><circle cx="12" cy="8" r="3.2" {...common}/><path d="M5.5 20c.7-4.2 3-6.3 6.5-6.3s5.8 2.1 6.5 6.3" {...common}/></>,
    bell: <><path d="M6.5 17.5h11l-1.5-2v-4a4 4 0 0 0-8 0v4l-1.5 2Z" {...common}/><path d="M10 19.5a2.2 2.2 0 0 0 4 0" {...common}/></>,
    menu: <><path d="M5 7h14M5 12h14M5 17h14" {...common}/></>,
    plus: <><path d="M12 5v14M5 12h14" {...common}/></>,
    back: <><path d="m14.5 6-6 6 6 6" {...common}/></>,
    arrow: <><path d="m9.5 6 6 6-6 6" {...common}/></>,
    fire: <><path d="M13 3c1 3-1 4-1 6 0 1.4 1 2.2 2 2.2 1.8 0 3-1.7 2.6-3.7 2.7 2.3 4 5 3.2 7.7C18.8 18.6 16 21 12 21c-4.2 0-7.5-2.8-7.5-6.8 0-3.2 1.8-6.2 5.2-8.7-.2 3.3 1.2 4.8 2.5 4.8 1.1 0 1.8-.8 1.6-2.2-.2-1.7-1.6-2.9-.8-5.1Z" {...common}/></>,
    protein: <><path d="M6.5 11.5c-1.7-.1-3 1.1-3 2.8 0 1.9 1.5 3.2 3.4 3.2h7.4a4.7 4.7 0 1 0 0-9.4c-1.9 0-3.5 1-4.3 2.5" {...common}/><path d="M7 8.5c-.7-1.1-.5-2 .4-2.8M11 7c-.8-1.2-.6-2.1.3-3" {...common}/></>,
    water: <><path d="M12 3S5.7 9.3 5.7 14.1A6.3 6.3 0 0 0 12 20.4a6.3 6.3 0 0 0 6.3-6.3C18.3 9.3 12 3 12 3Z" {...common}/><path d="M8.5 15.2c.8 1.2 2 1.8 3.5 1.8" {...common}/></>,
    bowl: <><path d="M4 11.5h16c-.4 4.7-3.2 7-8 7s-7.6-2.3-8-7Z" {...common}/><path d="M2.5 10h19M8 8c-1-1.4 1-2.2 0-3.5M12 8c-1-1.4 1-2.2 0-3.5M16 8c-1-1.4 1-2.2 0-3.5" {...common}/></>,
    pot: <><path d="M5 9h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9ZM3 11H1.8M21 11h1.2M8 6h8M10 4h4" {...common}/></>,
    running: <><circle cx="15" cy="5" r="2" {...common}/><path d="m11 9 3-2 2 3 3 1M13 8l-2 5-4 2M11 13l3 2 1 5M9 14l-3 5" {...common}/></>,
    weight: <><rect x="4" y="4.5" width="16" height="15" rx="4" {...common}/><path d="M7.5 10.5C8.9 8.7 10.4 7.8 12 7.8c1.6 0 3.1.9 4.5 2.7M12 8v3" {...common}/></>,
    target: <><circle cx="12" cy="12" r="8" {...common}/><circle cx="12" cy="12" r="3.5" {...common}/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" {...common}/></>,
    gear: <><circle cx="12" cy="12" r="3" {...common}/><path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2-1.7.7-1.9-.9-2.1 2.1.9 1.9-.7 1.7-2 .7v3l2 .7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2h3l.7-2 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7 2-.7Z" {...common}/></>,
    download: <><path d="M12 3v12M8 11l4 4 4-4M5 20h14" {...common}/></>,
    help: <><circle cx="12" cy="12" r="9" {...common}/><path d="M9.8 9a2.3 2.3 0 0 1 4.5.7c0 1.8-2.3 2-2.3 3.8M12 17h.01" {...common}/></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" {...common}/></>,
    send: <><path d="m4 5 16 7-16 7 3-7-3-7Z" {...common}/><path d="M7 12h13" {...common}/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" {...common}/><path d="m15.5 15.5 4.5 4.5" {...common}/></>,
    camera: <><rect x="3" y="6" width="18" height="14" rx="3" {...common}/><path d="m8 6 1.5-2h5L16 6" {...common}/><circle cx="12" cy="13" r="3.2" {...common}/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" {...common}/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" {...common}/></>,
    check: <><path d="m6.5 12.5 3.3 3.3L17.8 8" {...common}/></>,
    sparkle: <><path d="M12 3c.7 3.3 2.2 4.8 5.5 5.5C14.2 9.2 12.7 10.7 12 14c-.7-3.3-2.2-4.8-5.5-5.5C9.8 7.8 11.3 6.3 12 3ZM18 14.5c.4 1.7 1.2 2.5 3 3-1.8.5-2.6 1.3-3 3-.4-1.7-1.2-2.5-3-3 1.8-.5 2.6-1.3 3-3Z" {...common}/></>,
  }
  return <svg className={`wm-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{p[name] ?? p.help}</svg>
}

function StatusBar() {
  return <div className="wm-status"><strong>10:01</strong><span className="wm-status-icons"><i className="signal"/><i className="wifi">⌁</i><i className="battery"/></span></div>
}

function Shell({ children, nav, onNavigate, showNav = true, className = '' }) {
  return <div className={`wm-phone ${className}`}><div className="wm-bg"/><StatusBar/><div className="wm-screen">{children}</div>{showNav && <BottomNav active={nav} onNavigate={onNavigate}/>}</div>
}

function BottomNav({ active, onNavigate }) {
  const start = useRef(null)
  const activeIndex = Math.max(0, NAV.indexOf(active))
  const onPointerDown = e => { start.current = e.clientX }
  const onPointerUp = e => {
    if (start.current == null) return
    const delta = e.clientX - start.current
    start.current = null
    if (Math.abs(delta) < 32) return
    const next = Math.max(0, Math.min(NAV.length - 1, activeIndex + (delta < 0 ? 1 : -1)))
    if (next !== activeIndex) onNavigate(NAV[next])
  }
  return <nav className="wm-bottom-nav" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
    <span className="wm-liquid-lens" style={{ transform: `translateX(${activeIndex * 67.25}px)` }}/>
    {NAV.map(item => <button key={item} className={active === item ? 'active' : ''} onClick={() => onNavigate(item)}>
      <Icon name={item === 'records' ? 'record' : item === 'progress' ? 'stats' : item} size={22}/><span>{NAV_LABELS[item]}</span>
    </button>)}
  </nav>
}

function Header({ title, back, action, onAction }) {
  return <header className="wm-header">{back ? <button className="wm-header-back" onClick={back}><Icon name="back"/></button> : null}<h1>{title}</h1>{action ? <button className="wm-header-action" onClick={onAction}>{action}</button> : null}</header>
}

function GlassCard({ children, className = '', onClick }) {
  const C = onClick ? 'button' : 'div'
  return <C className={`wm-glass-card ${className}`} onClick={onClick}>{children}</C>
}
function PrimaryButton({ children, onClick, disabled = false, className='' }) { return <button className={`wm-primary ${className}`} onClick={onClick} disabled={disabled}>{children}</button> }
function Toast({ text }) { return text ? <div className="wm-toast">{text}</div> : null }

const introDelay = { splash: 900, 'onboarding-1': 1500, 'onboarding-2': 1500, 'onboarding-3': 1600 }
function IntroScreen({ screen, next }) {
  useEffect(() => { const t = setTimeout(next, introDelay[screen]); return () => clearTimeout(t) }, [screen, next])
  return <div className="wm-intro"><img src={INTRO_ART[screen]} alt=""/><button onClick={next} aria-label="次へ"/></div>
}

function Home({ go, toast }) {
  const summary = [
    ['fire','カロリー','1,350','/ 1,800 kcal'],['protein','たんぱく質','68','/ 120 g'],['water','水分','1.2','/ 2.0 L']
  ]
  return <Shell nav="home" onNavigate={go}><div className="wm-home">
    <header className="wm-home-header"><div className="greeting"><img src={avatar}/><strong>こんにちは、Helenさん</strong></div><div className="actions"><button onClick={() => go('notifications')}><Icon name="bell"/></button><button onClick={() => go('profile')}><Icon name="menu"/></button></div></header>
    <h1 className="wm-hero">今日も<br/>自分を大切に。</h1><p className="wm-hero-body">小さな積み重ねが、<br/>未来のあなたをつくります。</p>
    <button className="wm-floating-add" onClick={() => go('records')}><Icon name="plus"/></button>
    <h2>今日のサマリー</h2><div className="wm-summary-grid">{summary.map(([i,l,v,m]) => <GlassCard key={l} className="wm-summary"><Icon name={i}/><strong>{l}</strong><b>{v}</b><small>{m}</small></GlassCard>)}</div>
    <h2 className="records-title">今日の記録</h2>
    <GlassCard className="wm-record-row" onClick={() => go('meal-detail')}><span><Icon name="bowl"/><b>朝ごはん</b></span><span><b>未記録</b><Icon name="arrow"/></span></GlassCard>
    <GlassCard className="wm-record-row" onClick={() => go('meal-add')}><span><Icon name="pot"/><b>昼ごはん</b></span><span><b>未記録</b><Icon name="arrow"/></span></GlassCard>
  </div><Toast text={toast}/></Shell>
}

function RecordsHub({ go }) {
  const cards = [['pot','食事記録','食事・カロリー・栄養を登録','meals'],['running','運動記録','運動時間と消費カロリーを登録','exercise'],['weight','体重記録','体重の変化を記録','weight']]
  return <Shell nav="records" onNavigate={go}><Header title="記録"/><main className="wm-page wm-record-hub"><h2>何を記録しますか？</h2>{cards.map(([i,t,s,d]) => <GlassCard key={t} className="wm-hub-card" onClick={() => go(d)}><span className="wm-icon-orb"><Icon name={i}/></span><span className="copy"><b>{t}</b><small>{s}</small></span><Icon name="plus" size={22}/></GlassCard>)}</main></Shell>
}

function MealList({ go, mealSaved }) {
  return <Shell nav="records" onNavigate={go}><Header title="食事記録" back={() => go('records')}/><main className="wm-page wm-meals"><div className="wm-date-control"><button onClick={() => go('records-empty')}>‹</button><b>2024年6月10日（火）</b><button onClick={() => go('records-empty')}>›</button></div><GlassCard className="wm-cal-card"><small>カロリー摂取</small><strong>1,350 kcal</strong><span>目標まであと 450 kcal</span><div className="wm-progress-line"><i style={{width:'75%'}}/></div></GlassCard>{[['朝ごはん', mealSaved ? '520 kcal' : '520 kcal','meal-detail'],['昼ごはん',mealSaved?'420 kcal':'未記録','meal-add'],['夕ごはん','未記録','meal-add'],['間食・その他','210 kcal','meal-detail']].map(x => <GlassCard className="wm-record-row compact" key={x[0]} onClick={() => go(x[2])}><span><Icon name="bowl"/><b>{x[0]}</b></span><span><b>{x[1]}</b><Icon name="arrow"/></span></GlassCard>)}<PrimaryButton onClick={() => go('meal-add')}>食事を追加＋</PrimaryButton></main></Shell>
}

function MealAdd({ go, mealType, setMealType, foods, setFoods, onComplete }) {
  const types=['朝ごはん','昼ごはん','夕ごはん','間食']; const options=['ごはん','パン','サラダ','スープ','卵','バナナ','ヨーグルト','豆腐']
  const toggle = v => setFoods(f => f.includes(v)?f.filter(x=>x!==v):[...f,v])
  return <Shell nav="records" onNavigate={go}><Header title="食事を追加" back={() => go('meals')} action="キャンセル" onAction={() => go('meals')}/><main className="wm-page wm-add-meal"><p className="section-label">どの食事ですか？</p><div className="wm-choice-grid four">{types.map((t,i)=><button key={t} className={mealType===t?'selected':''} onClick={()=>setMealType(t)}><Icon name={i===0?'bowl':'pot'}/><span>{t}</span></button>)}</div><p className="section-label">よく食べるもの</p><div className="wm-choice-grid four foods">{options.map(t=><button key={t} className={foods.includes(t)?'selected':''} onClick={()=>toggle(t)}><span className="food-glyph">{t==='卵'?'◯':t==='バナナ'?'◒':t==='パン'?'▰':'◇'}</span><span>{t}</span></button>)}</div><button className="wm-search" onClick={()=>go('food-search')}><Icon name="search"/><span>食品名を検索</span><Icon name="arrow" size={20}/></button><PrimaryButton onClick={onComplete}>次へ</PrimaryButton></main></Shell>
}

function Exercise({ go, exercise, setExercise, onSave }) {
  const list=[['ウォーキング','120 kcal'],['ランニング','240 kcal'],['サイクリング','180 kcal'],['筋トレ','160 kcal'],['ストレッチ','70 kcal']]
  return <Shell nav="records" onNavigate={go}><Header title="運動記録" back={() => go('records')}/><main className="wm-page wm-exercise"><div className="wm-date-control"><button>‹</button><b>2024年6月10日（火）</b><button>›</button></div><GlassCard className="wm-cal-card"><small>今日の消費カロリー</small><strong>120 kcal</strong><div className="wm-mini-bars">{[18,28,22,38,31,48,43,54,35,58].map((h,i)=><i key={i} style={{height:h}}/>)}</div></GlassCard><div className="wm-exercise-list">{list.map(([n,k])=><GlassCard className={`wm-exercise-row ${exercise===n?'selected':''}`} key={n} onClick={()=>setExercise(n)}><span><Icon name="running"/><b>{n}</b></span><span>{k}{exercise===n?<Icon name="check"/>:<Icon name="arrow"/>}</span></GlassCard>)}</div><PrimaryButton onClick={onSave}>次へ</PrimaryButton></main></Shell>
}

function MealDetail({ go, mealType, foods }) {
  const foodList = foods.length ? foods : ['ごはん','卵','スープ']
  return <Shell nav="records" onNavigate={go}><Header title="食事詳細" back={() => go('meals')} action="編集" onAction={()=>go('meal-add')}/><main className="wm-page wm-meal-detail"><h2>{mealType || '朝ごはん'}</h2><p className="muted">2024年6月10日 / 08:10</p><GlassCard className="wm-cal-card detail-chart"><small>カロリー</small><strong>520 kcal</strong><div className="wm-line-chart"><i/><i/><i/><i/></div></GlassCard><div className="wm-summary-grid nutrition"><GlassCard><b>24</b><small>たんぱく質 g</small></GlassCard><GlassCard><b>62</b><small>炭水化物 g</small></GlassCard><GlassCard><b>18</b><small>脂質 g</small></GlassCard></div><h3>食べたもの</h3>{foodList.map(x=><GlassCard className="wm-record-row compact" key={x}><span><Icon name="bowl"/><b>{x}</b></span><span><small>登録済み</small><Icon name="arrow"/></span></GlassCard>)}</main></Shell>
}

function EmptyRecords({ go }) { return <Shell showNav={false}><Header title="食事記録" back={()=>go('meals')}/><main className="wm-page wm-empty"><div className="wm-empty-art">✓</div><h2>まだ記録がありません</h2><p>この日の食事を記録して、毎日の変化を残しましょう。</p><PrimaryButton onClick={()=>go('meal-add')}>食事を記録する</PrimaryButton></main></Shell> }

function FoodSearch({ go, selectedSearch, setSelectedSearch, setFoods, onComplete }) {
  const items=['ごはん','アボカド','コーヒー','サラダチキン','ヨーグルト','バナナ']
  const toggle=v=>setSelectedSearch(s=>s.includes(v)?s.filter(x=>x!==v):[...s,v])
  const add=()=>{setFoods(f=>Array.from(new Set([...f,...selectedSearch])));onComplete()}
  return <Shell showNav={false}><Header title="食品を検索" back={()=>go('meal-add')} action="キャンセル" onAction={()=>go('meal-add')}/><main className="wm-page wm-food-search"><label className="wm-real-search"><Icon name="search"/><input defaultValue="" placeholder="食品名を検索"/></label><h3>AIで簡単に記録</h3><div className="wm-quick-ai"><button onClick={()=>toggle('写真から追加')}><Icon name="camera"/><span>写真で記録</span></button><button onClick={()=>toggle('音声から追加')}><Icon name="mic"/><span>音声で記録</span></button></div><h3>最近の検索</h3><div className="wm-chips">{['ごはん','アボカド','コーヒー','バナナ'].map(x=><button onClick={()=>toggle(x)} key={x}>{x}</button>)}</div><h3>検索結果</h3><div className="wm-search-results">{items.map(x=><GlassCard className={`wm-record-row compact ${selectedSearch.includes(x)?'selected':''}`} key={x} onClick={()=>toggle(x)}><span><Icon name="bowl"/><b>{x}</b></span><span>{selectedSearch.includes(x)?<Icon name="check"/>:<Icon name="plus"/>}</span></GlassCard>)}</div><GlassCard className="wm-selection-summary"><b>{selectedSearch.length}件を選択中</b><span>{selectedSearch.join('、')||'食品を選んでください'}</span></GlassCard><PrimaryButton disabled={!selectedSearch.length} onClick={add}>選択した食品を追加</PrimaryButton></main></Shell>
}

function Progress({ go }) {
  return <Shell nav="progress" onNavigate={go}><Header title="進捗"/><main className="wm-page wm-progress"><ProgressCard title="スキンヘルス" value="78%" meta="先週 +6%" type="line" onClick={()=>go('analytics')}/><ProgressCard title="ルーティン達成率" value="67%" meta="先週 +12%" type="bars" onClick={()=>go('analytics')}/><ProgressCard title="継続日数" value="4日" meta="目標：7日" type="none"/></main></Shell>
}
function ProgressCard({title,value,meta,type,onClick}) { return <GlassCard className={`wm-progress-card ${type}`} onClick={onClick}><strong>{title}</strong><b>{value}</b><small>{meta}</small>{type==='line'?<div className="wm-line-chart large"><i/><i/><i/><i/></div>:null}{type==='bars'?<div className="wm-mini-bars large">{[18,30,26,40,34,52,42,58,48,62,54,68].map((h,i)=><i key={i} style={{height:h}}/>)}</div>:null}</GlassCard> }

function Weight({ go, weight, setWeight }) {
  const [period,setPeriod]=useState('月'); const [open,setOpen]=useState(false); const [draft,setDraft]=useState(weight)
  return <Shell nav="progress" onNavigate={go}><Header title="体重記録" back={()=>go('records')}/><main className="wm-page wm-weight"><Segment options={['週','月','3ヶ月']} value={period} onChange={setPeriod}/><GlassCard className="wm-weight-card"><strong>{weight}<small> kg</small></strong><span>前回より -0.2 kg</span><div className="wm-line-chart weight"><i/><i/><i/><i/></div></GlassCard><PrimaryButton className="bottom-cta" onClick={()=>setOpen(true)}>体重を記録＋</PrimaryButton>{open?<div className="wm-modal-backdrop" onClick={()=>setOpen(false)}><div className="wm-sheet" onClick={e=>e.stopPropagation()}><h3>体重を記録</h3><label><span>今日の体重</span><div><input inputMode="decimal" value={draft} onChange={e=>setDraft(e.target.value)}/><b>kg</b></div></label><PrimaryButton onClick={()=>{setWeight(draft);setOpen(false)}}>保存</PrimaryButton></div></div>:null}</main></Shell>
}
function Segment({options,value,onChange}) { return <div className="wm-segment">{options.map(x=><button className={value===x?'active':''} onClick={()=>onChange(x)} key={x}>{x}</button>)}</div> }

function Analytics({ go }) { const [period,setPeriod]=useState('月'); return <Shell nav="progress" onNavigate={go}><Header title="統計" back={()=>go('progress')}/><main className="wm-page wm-analytics"><Segment options={['週','月','年']} value={period} onChange={setPeriod}/><GlassCard className="wm-analytic-card" onClick={()=>go('meals')}><small>カロリー平均</small><strong>1,420 kcal</strong><span>目標との差 +30 kcal</span></GlassCard><GlassCard className="wm-analytic-card" onClick={()=>go('meals')}><small>摂取カロリー</small><strong>1,420 kcal</strong><span>先週 +4%</span><div className="wm-mini-bars">{[22,38,30,55,26,50,42,60,21,48,53,33].map((h,i)=><i key={i} style={{height:h}}/>)}</div></GlassCard><GlassCard className="wm-analytic-card" onClick={()=>go('weight')}><small>体重の変化</small><strong>-1.2 kg</strong><span>今月の変化</span><div className="wm-line-chart small"><i/><i/><i/><i/></div></GlassCard></main></Shell> }

function Notifications({go}) { const [read,setRead]=useState(false); const rows=[['check','目標の75%達成！','今日の目標まであと少しです','ai-insights'],['water','水分を飲みましょう','朝の水分補給を忘れずに','home'],['weight','体重を記録しましょう','今日の体重を入力しましょう','weight'],['sparkle','運動おつかれさまでした！','昨日の運動記録を確認できます','exercise']]; return <Shell nav="progress" onNavigate={go}><Header title="通知" back={()=>go('home')} action="すべて既読" onAction={()=>setRead(true)}/><main className="wm-page wm-notifications"><h3>今日</h3>{rows.slice(0,3).map(([i,t,s,d])=><GlassCard className={`wm-notice ${read?'read':''}`} key={t} onClick={()=>go(d)}><Icon name={i}/><span><b>{t}</b><small>{s}</small></span><em>{read?'既読':'9:30'}</em></GlassCard>)}<h3>昨日</h3>{rows.slice(3).map(([i,t,s,d])=><GlassCard className="wm-notice" key={t} onClick={()=>go(d)}><Icon name={i}/><span><b>{t}</b><small>{s}</small></span><em>20:15</em></GlassCard>)}</main></Shell> }

function Goals({go,goal,setGoal}) { return <Shell showNav={false}><Header title="目標設定" back={()=>go('profile')} action="保存" onAction={()=>go('profile')}/><main className="wm-page wm-goals"><h3>目標を選択</h3>{['体重を減らす','体重を維持する','筋肉をつける','健康的な生活習慣をつくる'].map(x=><button className="wm-radio-row" onClick={()=>setGoal(x)} key={x}><span>{x}</span><i className={goal===x?'active':''}/></button>)}<h3>目標期間</h3><GlassCard className="wm-period"><b>3ヶ月</b></GlassCard><GlassCard className="wm-goal-kcal"><small>1日のカロリー目標</small><strong>1,800 kcal</strong><div className="wm-progress-line"><i style={{width:'60%'}}/></div></GlassCard><PrimaryButton onClick={()=>go('profile')}>次へ</PrimaryButton></main></Shell> }

function AiOverview({go,setChatSeed}) { const ask=q=>{setChatSeed(q);go('ai-chat')}; return <Shell nav="ai" onNavigate={go}><Header title="AIコーチ"/><main className="wm-page wm-ai"><GlassCard className="wm-ai-greeting">おはようございます、Helenさん！<br/>今日も一緒に健康を整えましょう</GlassCard><h3>今日のおすすめ</h3><GlassCard className="wm-ai-reco" onClick={()=>go('ai-insights')}><Icon name="ai"/><div><b>たんぱく質を意識しましょう</b><p>目標まであと少しです。お昼に卵や豆腐を追加するとバランスが良くなります。</p><button>詳しく見る</button></div></GlassCard><h3>AIに相談する</h3>{['体重が減らないのはなぜ？','おすすめの朝ごはんは？','モチベーションが続かない…'].map(q=><button className="wm-ai-question" onClick={()=>ask(q)} key={q}>{q}</button>)}<button className="wm-chat-entry" onClick={()=>ask('')}><span>メッセージを入力...</span><i><Icon name="send"/></i></button></main></Shell> }

function AiInsights({go}) { return <Shell nav="ai" onNavigate={go}><Header title="AIインサイト" back={()=>go('ai')}/><main className="wm-page wm-insights"><GlassCard className="wm-insight-lead"><b>今週の振り返り</b><p>食事と運動のバランスが先週より改善しています。</p></GlassCard><ProgressCard title="スキンヘルス" value="78%" meta="水分と睡眠が安定" type="line" onClick={()=>go('progress')}/><ProgressCard title="ルーティン達成率" value="67%" meta="先週 +12%" type="bars" onClick={()=>go('exercise')}/><GlassCard className="wm-advice" onClick={()=>go('ai-chat')}><Icon name="ai"/><span><b>次の一歩</b><small>朝食にたんぱく質を10g追加してみましょう。</small></span><Icon name="arrow"/></GlassCard></main></Shell> }

function AiChat({go,seed}) { const [messages,setMessages]=useState(()=>seed?[['user',seed],['ai','記録を確認すると、直近1週間はカロリーは安定しています。睡眠と運動量も一緒に見てみましょう。']]:[['ai','こんにちは。今日はどんなことを相談したいですか？']]); const [draft,setDraft]=useState(''); const send=()=>{const q=draft.trim(); if(!q)return; setMessages(m=>[...m,['user',q],['ai','記録をもとに整理しました。まずは1週間の傾向を見ながら、無理のない一歩を決めていきましょう。']]); setDraft('')}; return <Shell nav="ai" onNavigate={go}><Header title="AIコーチ" back={()=>go('ai')}/><main className="wm-page wm-chat"><div className="wm-chat-log">{messages.map((m,i)=><div key={i} className={`bubble ${m[0]}`}>{m[1]}</div>)}</div><form className="wm-chat-form" onSubmit={e=>{e.preventDefault();send()}}><input autoFocus value={draft} onChange={e=>setDraft(e.target.value)} placeholder="メッセージを入力..."/><button><Icon name="send"/></button></form></main></Shell> }

function Profile({go}) { const menus=[['user','プロフィール編集','profile-edit'],['target','目標設定','goals'],['gear','アカウント設定','toast-account'],['bell','通知設定','notifications'],['download','データのエクスポート','toast-export'],['help','ヘルプ・サポート','toast-help'],['logout','ログアウト','toast-logout']]; return <Shell nav="profile" onNavigate={go}><Header title="マイページ"/><main className="wm-page wm-profile"><div className="wm-profile-head"><img src={avatar}/><b>Helen Smith</b><small>2024年6月10日から利用中</small></div><GlassCard className="wm-profile-health"><b>スキンヘルス</b><strong>78%</strong><small>順調</small></GlassCard><div className="wm-profile-menu">{menus.map(([i,t,d])=><GlassCard className="wm-profile-row" key={t} onClick={()=>go(d)}><Icon name={i}/><b>{t}</b>{i!=='logout'?<Icon name="arrow" size={22}/>:<span/>}</GlassCard>)}</div></main></Shell> }

function ProfileEdit({go,profile,setProfile}) { const change=(k,v)=>setProfile(p=>({...p,[k]:v})); return <Shell nav="profile" onNavigate={go}><Header title="プロフィール編集" back={()=>go('profile')} action="保存" onAction={()=>go('profile')}/><main className="wm-page wm-profile-edit"><div className="edit-avatar"><img src={avatar}/><button>写真を変更</button></div>{[['name','名前'],['birth','生年月日'],['height','身長'],['targetWeight','目標体重']].map(([k,l])=><label className="wm-edit-field" key={k}><span>{l}</span><input value={profile[k]} onChange={e=>change(k,e.target.value)}/></label>)}<GlassCard className="wm-profile-row" onClick={()=>go('notifications')}><Icon name="bell"/><b>通知設定</b><Icon name="arrow" size={22}/></GlassCard><GlassCard className="wm-profile-row" onClick={()=>go('toast-link')}><Icon name="gear"/><b>データ連携</b><Icon name="arrow" size={22}/></GlassCard></main></Shell> }

export default function App() {
  const [screen,setScreen]=useState('splash')
  const [toast,setToast]=useState('')
  const [mealType,setMealType]=useState('朝ごはん')
  const [foods,setFoods]=useState(['ごはん','卵'])
  const [selectedSearch,setSelectedSearch]=useState([])
  const [exercise,setExercise]=useState('ウォーキング')
  const [mealSaved,setMealSaved]=useState(false)
  const [weight,setWeight]=useState('58.4')
  const [goal,setGoal]=useState('健康的な生活習慣をつくる')
  const [chatSeed,setChatSeed]=useState('')
  const [profile,setProfile]=useState({name:'Helen Smith',birth:'1992年6月10日',height:'165 cm',targetWeight:'56 kg'})
  const toastTimer=useRef(null)

  const flash = text => { setToast(text); clearTimeout(toastTimer.current); toastTimer.current=setTimeout(()=>setToast(''),1800) }
  useEffect(()=>()=>clearTimeout(toastTimer.current),[])

  const go = target => {
    const toastMap={ 'toast-account':'アカウント設定を確認しました','toast-export':'データを書き出しました','toast-help':'サポート画面を開きました','toast-logout':'デモではログイン状態を保持します','toast-link':'データ連携を確認しました' }
    if (toastMap[target]) { flash(toastMap[target]); return }
    setScreen(target); const sc=document.querySelector('.wm-screen'); if(sc) sc.scrollTop=0
  }
  const nextIntro = () => { const i=INTRO.indexOf(screen); setScreen(i>=0 && i<INTRO.length-1 ? INTRO[i+1] : 'home') }
  const saveExercise=()=>{flash(`${exercise}を記録しました`);setTimeout(()=>setScreen('records'),380)}

  let content
  if (INTRO.includes(screen)) content=<IntroScreen screen={screen} next={nextIntro}/>
  else if(screen==='home') content=<Home go={go} toast={toast}/>
  else if(screen==='records') content=<RecordsHub go={go}/>
  else if(screen==='meals') content=<MealList go={go} mealSaved={mealSaved}/>
  else if(screen==='meal-add') content=<MealAdd go={go} mealType={mealType} setMealType={setMealType} foods={foods} setFoods={setFoods} onComplete={()=>{setMealSaved(true);go('meal-detail')}}/>
  else if(screen==='exercise') content=<Exercise go={go} exercise={exercise} setExercise={setExercise} onSave={saveExercise}/>
  else if(screen==='meal-detail') content=<MealDetail go={go} mealType={mealType} foods={foods}/>
  else if(screen==='records-empty') content=<EmptyRecords go={go}/>
  else if(screen==='food-search') content=<FoodSearch go={go} selectedSearch={selectedSearch} setSelectedSearch={setSelectedSearch} setFoods={setFoods} onComplete={()=>{setMealSaved(true);go('meal-detail')}}/>
  else if(screen==='progress') content=<Progress go={go}/>
  else if(screen==='weight') content=<Weight go={go} weight={weight} setWeight={setWeight}/>
  else if(screen==='analytics') content=<Analytics go={go}/>
  else if(screen==='notifications') content=<Notifications go={go}/>
  else if(screen==='goals') content=<Goals go={go} goal={goal} setGoal={setGoal}/>
  else if(screen==='ai') content=<AiOverview go={go} setChatSeed={setChatSeed}/>
  else if(screen==='ai-insights') content=<AiInsights go={go}/>
  else if(screen==='ai-chat') content=<AiChat go={go} seed={chatSeed}/>
  else if(screen==='profile-edit') content=<ProfileEdit go={go} profile={profile} setProfile={setProfile}/>
  else content=<Profile go={go}/>

  return <main className="wm-v2-stage">{content}<Toast text={screen!=='home'?toast:''}/></main>
}
