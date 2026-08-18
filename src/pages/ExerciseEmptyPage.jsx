import PageHeader from '../components/PageHeader.jsx'
import emptyStateIllustration from '../assets/empty-state.png'

export default function ExerciseEmptyPage({ onBack, onNext }) {
  return (
    <>
      <PageHeader title="" centered onBack={onBack} />
      <section className="exercise-empty" aria-label="記録なし">
        <h1>記録がありません</h1>
        <p>最初の記録をつけてみましょう。<br />小さな一歩が大きな変化につながります。</p>
        <img className="exercise-empty__illustration" src={emptyStateIllustration} alt="記録を始めるためのチェックリスト" />
        <button className="gradient-button exercise-empty__next" type="button" onClick={onNext}>次へ</button>
      </section>
    </>
  )
}
