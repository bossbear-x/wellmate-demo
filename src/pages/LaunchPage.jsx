import logo from '../assets/wellmate-logo.png'
import mealIllustration from '../assets/onboarding-meal.png'
import runIllustration from '../assets/onboarding-run.png'
import habitsIllustration from '../assets/onboarding-habits.png'

const steps = {
  'onboarding-1': {
    image: mealIllustration,
    alt: 'スマートフォンで食事を記録する女性',
    title: <>食事を記録して<br />健康を管理</>,
    copy: <>カロリーや栄養を簡単に記録して、<br />毎日の身体づくりをサポートします。</>,
    button: '次へ',
  },
  'onboarding-2': {
    image: runIllustration,
    alt: 'ランニングをする男性',
    title: <>運動で<br />もっとアクティブに</>,
    copy: <>運動を記録して、消費カロリーや達成度を<br />チェックしましょう。</>,
    button: '次へ',
  },
  'onboarding-3': {
    image: habitsIllustration,
    alt: 'バランスの良い食事',
    title: <>小さな習慣が<br />未来を変える</>,
    copy: <>毎日の小さな積み重ねが、<br />あなたの未来をつくります。</>,
    button: 'はじめる',
  },
}

export default function LaunchPage({ screen, onNext }) {
  if (screen === 'splash') {
    return (
      <button className="launch-splash" type="button" onClick={onNext} aria-label="オンボーディングへ進む">
        <img src={logo} alt="WellMate" />
        <strong>WellMate</strong>
        <span>小さな健康、私の味方。</span>
      </button>
    )
  }

  const step = steps[screen]
  const index = Number(screen.slice(-1))
  return (
    <section className="onboarding" aria-label={`オンボーディング ${index} / 3`}>
      <div className="onboarding__illustration"><img src={step.image} alt={step.alt} /></div>
      <h1>{step.title}</h1>
      <p>{step.copy}</p>
      <div className="onboarding__dots" aria-label={`${index}ページ目`}>
        {[1, 2, 3].map((dot) => <span key={dot} className={dot === index ? 'is-active' : ''} />)}
      </div>
      <button className="gradient-button onboarding__next" type="button" onClick={onNext}>{step.button}</button>
    </section>
  )
}
