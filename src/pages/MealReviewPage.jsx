import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import fireIcon from '../assets/fire.svg'
import proteinIcon from '../assets/protein.svg'
import waterIcon from '../assets/water.svg'
import arrowRight from '../assets/arrow-right.svg'
import { foodOptions, mealTypes } from '../data.js'

export default function MealReviewPage({ mealType, selectedFoods, onBack, onSave }) {
  const type = mealTypes.find((item) => item.id === mealType) ?? mealTypes[1]
  const selected = foodOptions.filter((item) => selectedFoods.includes(item.id))
  const foods = selected.length ? selected : foodOptions.filter((item) => ['rice', 'egg'].includes(item.id))

  return (
    <>
      <PageHeader
        title="食事詳細"
        centered
        onBack={onBack}
        action={<button className="text-action" type="button" onClick={onBack}>編集</button>}
      />
      <section className="screen-scroll review-scroll" aria-label="食事詳細">
        <div className="review-heading">
          <div>
            <h2>{type.label}</h2>
            <p>2024年6月20日 12:30</p>
          </div>
          <img src={type.icon} alt="" />
        </div>

        <GlassCard className="review-calorie-card">
          <span>摂取カロリー</span>
          <strong>520 <small>kcal</small></strong>
          <div className="review-bar" aria-hidden="true"><span /></div>
        </GlassCard>

        <div className="macro-grid" aria-label="栄養バランス">
          <GlassCard className="macro-card">
            <img src={proteinIcon} alt="" /><span>たんぱく質</span><strong>24 g</strong>
          </GlassCard>
          <GlassCard className="macro-card">
            <img src={fireIcon} alt="" /><span>脂質</span><strong>14 g</strong>
          </GlassCard>
          <GlassCard className="macro-card">
            <img src={waterIcon} alt="" /><span>炭水化物</span><strong>62 g</strong>
          </GlassCard>
        </div>

        <h3 className="review-list-title">食べたもの</h3>
        <div className="review-food-list">
          {foods.map((food) => (
            <GlassCard className="review-food-row" key={food.id}>
              <span><img src={food.icon} alt="" /><strong>{food.label}</strong></span>
              <span>{food.kcal} kcal<img src={arrowRight} alt="" /></span>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="review-note">
          <strong>AIからのひとこと</strong>
          <p>たんぱく質をしっかり摂れています。野菜をもう一品加えると、さらにバランスが整います。</p>
        </GlassCard>

        <button className="gradient-button review-save-button" type="button" onClick={onSave}>
          この内容で保存
        </button>
      </section>
    </>
  )
}
