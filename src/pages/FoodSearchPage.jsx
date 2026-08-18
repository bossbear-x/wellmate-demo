import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import searchIcon from '../assets/search.svg'
import micIcon from '../assets/mic.svg'
import cameraIcon from '../assets/icon-camera.svg'
import plusIcon from '../assets/plus.svg'
import scanStatusDot from '../assets/scan-status-dot.svg'
import { calculateNutrition, foodSearchOptions, getSelectedFoods } from '../data.js'

function FoodScanModal({ onCancel, onCapture }) {
  return (
    <div className="food-scan-overlay">
      <div className="food-scan-backdrop" aria-hidden="true" />
      <section className="food-scan-modal" role="dialog" aria-modal="true" aria-labelledby="food-scan-title">
        <header className="food-scan-header">
          <h2 id="food-scan-title">食事をスキャン</h2>
          <button type="button" onClick={onCancel}>キャンセル</button>
        </header>
        <p className="food-scan-instruction">食事全体が枠内に入るように撮影してください</p>
        <div className="food-scanner-preview" aria-hidden="true">
          <i className="food-scan-corner food-scan-corner--tl" />
          <i className="food-scan-corner food-scan-corner--tr" />
          <i className="food-scan-corner food-scan-corner--bl" />
          <i className="food-scan-corner food-scan-corner--br" />
          <span className="food-scan-line" />
        </div>
        <div className="food-scan-helper"><img src={scanStatusDot} alt="" /><span>明るい場所で、真上から撮影してください</span></div>
        <button className="gradient-button food-scan-capture" type="button" onClick={onCapture}>撮影する</button>
      </section>
    </div>
  )
}

export default function FoodSearchPage({ selectedFoods, onFood, onBack, onAdd }) {
  const [query, setQuery] = useState('')
  const [scanOpen, setScanOpen] = useState(false)
  const visible = foodSearchOptions.filter((item) => item.name.includes(query.trim()))
  const chosen = useMemo(() => getSelectedFoods(selectedFoods), [selectedFoods])
  const totals = useMemo(() => calculateNutrition(chosen), [chosen])

  const captureFood = () => {
    if (!selectedFoods.includes('chicken')) onFood('chicken')
    setScanOpen(false)
  }

  return (
    <>
      <PageHeader title="食品検索" centered onBack={onBack} action={<button className="text-action" type="button" onClick={onBack}>キャンセル</button>} />
      <section className="screen-scroll food-search-scroll" aria-label="食品検索">
        <div className="food-search-input"><img src={searchIcon} alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="食品名を検索" aria-label="食品名を検索" /><button type="button" aria-label="音声で検索"><img src={micIcon} alt="" /></button></div>
        <h2>AIでかんたん記録</h2>
        <div className="quick-actions">
          <GlassCard as="button" type="button" onClick={() => setScanOpen(true)}><span><img src={cameraIcon} alt="" /></span><strong>写真で記録</strong><small>AIが食事を解析</small></GlassCard>
          <GlassCard as="button" type="button"><span><img src={micIcon} alt="" /></span><strong>音声で記録</strong><small>食べたものを話す</small></GlassCard>
        </div>
        <h2>最近検索</h2>
        <div className="recent-chips">{['ごはん', 'アボカド', 'コーヒー', 'バナナ'].map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
        <h2>検索結果</h2>
        <div className="food-results">
          {visible.map((item) => {
            const selected = selectedFoods.includes(item.id)
            return (
              <GlassCard as="button" type="button" key={item.id} className={`food-result ${selected ? 'is-selected' : ''}`} onClick={() => onFood(item.id)} aria-pressed={selected}>
                <span className="food-result__name"><i><img src={item.icon} alt="" /></i><span><strong>{item.name}</strong><small>{item.meta}</small></span></span>
                <span className="food-result__action"><b>{item.kcal} kcal</b><img src={plusIcon} alt="" /></span>
              </GlassCard>
            )
          })}
        </div>
        <GlassCard className="food-selection"><span>選択中：{chosen.map((item) => item.name).join('、') || 'なし'}</span><strong>合計 {totals.kcal} kcal</strong></GlassCard>
      </section>
      <div className="food-search-footer">
        <button className="gradient-button food-add" type="button" disabled={!chosen.length} onClick={onAdd}>追加する</button>
      </div>
      {scanOpen ? <FoodScanModal onCancel={() => setScanOpen(false)} onCapture={captureFood} /> : null}
    </>
  )
}
