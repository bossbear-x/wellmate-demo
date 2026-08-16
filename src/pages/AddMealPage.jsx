import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import searchIcon from '../assets/search.svg'
import micIcon from '../assets/mic.svg'
import { foodOptions, mealTypes } from '../data.js'

export default function AddMealPage({ mealType, selectedFoods, onMealType, onFood, onBack, onNext }) {
  return (
    <>
      <PageHeader
        title="食事を追加"
        centered
        onBack={onBack}
        action={<button className="text-action" type="button" onClick={onBack}>キャンセル</button>}
      />
      <section className="screen-scroll add-meal-scroll" aria-label="食事を追加">
        <h2>どの食事ですか？</h2>
        <div className="option-grid option-grid--meal">
          {mealTypes.map((item) => (
            <button
              key={item.id}
              className={`option-card ${mealType === item.id ? 'is-selected' : ''}`}
              type="button"
              onClick={() => onMealType(item.id)}
              aria-pressed={mealType === item.id}
            >
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <h2 className="frequent-heading">よく食べるもの</h2>
        <div className="option-grid option-grid--food">
          {foodOptions.map((item) => {
            const selected = selectedFoods.includes(item.id)
            return (
              <button
                key={item.id}
                className={`option-card ${selected ? 'is-selected' : ''}`}
                type="button"
                onClick={() => onFood(item.id)}
                aria-pressed={selected}
              >
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="meal-search-row">
          <GlassCard className="search-field">
            <img src={searchIcon} alt="" /><span>食品名を検索</span>
          </GlassCard>
          <button className="voice-button" type="button" aria-label="音声入力">
            <img src={micIcon} alt="" />
          </button>
        </div>

        <div className="page-dots" aria-hidden="true"><span /><span /><span /></div>

        <button className="gradient-button add-next-button" type="button" onClick={onNext}>
          次へ
        </button>
      </section>
    </>
  )
}
