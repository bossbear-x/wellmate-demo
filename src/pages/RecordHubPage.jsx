import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import plusIcon from '../assets/plus.svg'
import mealIcon from '../assets/record-meal.svg'
import exerciseIcon from '../assets/record-exercise.svg'
import weightIcon from '../assets/record-weight.svg'

const recordTypes = [
  { id: 'meal', title: '食事記録', detail: '食事・カロリー・栄養を登録', icon: mealIcon },
  { id: 'exercise', title: '運動記録', detail: '運動時間と消費カロリーを登録', icon: exerciseIcon },
  { id: 'weight', title: '体重記録', detail: '体重の変化を記録', icon: weightIcon },
]

export default function RecordHubPage({ onMeal, onExercise, onWeight }) {
  return (
    <>
      <PageHeader title="記録" />
      <section className="screen-scroll record-hub-scroll" aria-label="記録">
        <h2>何を記録しますか？</h2>
        <div className="record-type-list">
          {recordTypes.map((item) => (
            <GlassCard
              as="button"
              className="record-type-card"
              type="button"
              key={item.id}
              onClick={item.id === 'meal' ? onMeal : item.id === 'exercise' ? onExercise : onWeight}
            >
              <span className="record-type-card__icon"><img src={item.icon} alt="" /></span>
              <span className="record-type-card__copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
              <img className="record-type-card__plus" src={plusIcon} alt="" />
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  )
}
