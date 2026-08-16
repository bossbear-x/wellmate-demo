import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import robotIcon from '../assets/robot.svg'
import sendIcon from '../assets/send.svg'
import arrowRight from '../assets/arrow-right.svg'
import { aiAnswers } from '../data.js'

export default function AiCoachPage({ selectedQuestion, onQuestion }) {
  const selected = selectedQuestion ? aiAnswers[selectedQuestion] : null
  const answerRef = useRef(null)

  useEffect(() => {
    if (selected && answerRef.current) {
      answerRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selected])

  return (
    <>
      <PageHeader title="AIコーチ" />
      <section className="screen-scroll ai-scroll" aria-label="AIコーチ">
        <GlassCard className="ai-greeting-card">
          <img src={robotIcon} alt="" />
          <div><strong>今日もお疲れさまでした！</strong><p>あなたの記録をもとに、健康づくりをサポートします。</p></div>
        </GlassCard>

        <h2>今日のおすすめ</h2>
        <GlassCard className="ai-recommend-card">
          <div className="ai-recommend-card__top">
            <span><img src={robotIcon} alt="" /></span>
            <div><strong>夕食に野菜をプラス</strong><small>栄養バランスを整えましょう</small></div>
          </div>
          <p>今日はたんぱく質が十分に摂れています。夕食は彩りのよい野菜を一品加えてみませんか？</p>
        </GlassCard>

        <h2 className="ai-question-title">AIに聞いてみる</h2>
        <div className="ai-question-list">
          {Object.entries(aiAnswers).map(([id, item]) => (
            <button
              className={`ai-question ${selectedQuestion === id ? 'is-selected' : ''}`}
              type="button"
              key={id}
              onClick={() => onQuestion(id)}
              aria-pressed={selectedQuestion === id}
            >
              <span>{item.question}</span><img src={arrowRight} alt="" />
            </button>
          ))}
        </div>

        {selected ? (
          <GlassCard className="ai-answer" role="status" ref={answerRef}>
            <span className="ai-answer__icon"><img src={robotIcon} alt="" /></span>
            <p>{selected.answer}</p>
          </GlassCard>
        ) : null}
      </section>

      <div className="ai-input">
        <span>メッセージを入力…</span>
        <button type="button" aria-label="送信"><img src={sendIcon} alt="" /></button>
      </div>
    </>
  )
}
