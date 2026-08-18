import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import robotIcon from '../assets/robot.svg'
import sendIcon from '../assets/send.svg'
import arrowRight from '../assets/arrow-right.svg'
import { aiAnswers } from '../data.js'

export default function AiCoachPage({ view = 'overview', selectedQuestion, onQuestion, onInsights, onBack }) {
  const selected = selectedQuestion ? aiAnswers[selectedQuestion] : null
  const answerRef = useRef(null)
  const [draft, setDraft] = useState('')
  const [customTurn, setCustomTurn] = useState(null)

  useEffect(() => {
    if ((selected || customTurn) && answerRef.current) {
      answerRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selected, customTurn])

  const sendMessage = (event) => {
    event.preventDefault()
    const question = draft.trim()
    if (!question) return

    setCustomTurn({
      question,
      answer: '記録をもとに一緒に整理してみましょう。まずは直近1週間の食事・睡眠・活動量の変化を確認すると、次の一歩が見つけやすくなります。',
    })
    setDraft('')
  }

  if (view === 'insights') {
    return (
      <>
        <PageHeader title="AIインサイト" onBack={onBack} />
        <section className="screen-scroll ai-insights-scroll" aria-label="AIインサイト">
          <GlassCard><strong>今週の振り返り</strong><p>今週はバランスの良い食事と運動ができています</p></GlassCard>
          <GlassCard className="insight-metric"><strong>スキンヘルス</strong><b>78%</b><span>↑ 6% 前週比</span></GlassCard>
          <GlassCard className="insight-metric"><strong>ルーティン達成率</strong><b>67%</b><span>↑ 12% 前週比</span></GlassCard>
          <GlassCard><strong>AIからのアドバイス</strong><p>夕食のカロリーがやや多めです。野菜中心に変えてみましょう。</p></GlassCard>
        </section>
      </>
    )
  }

  if (view === 'chat') {
    const conversation = selected ?? aiAnswers.weight
    return (
      <>
        <PageHeader title="AIチャット" centered onBack={onBack} />
        <section className="screen-scroll ai-chat-scroll" aria-label="AIチャット">
          <GlassCard className="chat-bubble chat-bubble--ai">体重が減らない時は、まず記録の抜けと水分量を見直してみましょう。</GlassCard>
          <GlassCard className="chat-bubble chat-bubble--user">{conversation.question}</GlassCard>
          <GlassCard className="ai-analysis"><strong><img src={robotIcon} alt="" />AIの分析</strong><p>{conversation.answer} 朝食に卵や豆腐を追加し、就寝前の水分を控えめにしてみましょう。</p><button type="button" onClick={onInsights}>詳しく見る</button></GlassCard>
          <GlassCard className="chat-bubble chat-bubble--ai">今日のおすすめ：昼ごはんにたんぱく質を20g追加、夜は軽いストレッチを5分。</GlassCard>
          {customTurn ? <div className="chat-turn" ref={answerRef}><GlassCard className="chat-bubble chat-bubble--user">{customTurn.question}</GlassCard><GlassCard className="chat-bubble chat-bubble--ai">{customTurn.answer}</GlassCard></div> : null}
        </section>
        <form className="ai-input" onSubmit={sendMessage}>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="メッセージを入力..." aria-label="AIへのメッセージ" autoComplete="off" />
          <button type="submit" aria-label="送信"><img src={sendIcon} alt="" /></button>
        </form>
      </>
    )
  }

  return (
    <>
      <PageHeader title="AIコーチ" />
      <section className="screen-scroll ai-scroll" aria-label="AIコーチ">
        <GlassCard className="ai-greeting-card">
          <p>おはようございます、Helenさん！<br />今日も一緒に健康を整えましょう</p>
        </GlassCard>

        <h2>今日のおすすめ</h2>
        <GlassCard className="ai-recommend-card">
          <div className="ai-recommend-card__top">
            <span><img src={robotIcon} alt="" /></span>
            <div><strong>たんぱく質を意識しましょう</strong></div>
          </div>
          <p>目標まであと少しです。お昼に卵や豆腐を追加するとバランスが良くなります。</p>
          <button className="ai-detail-button" type="button" onClick={onInsights}>詳しく見る</button>
        </GlassCard>

        <h2 className="ai-question-title">AIに相談する</h2>
        <div className="ai-question-list">
          {Object.entries(aiAnswers).map(([id, item]) => (
            <button
              className={`ai-question ${selectedQuestion === id ? 'is-selected' : ''}`}
              type="button"
              key={id}
              onClick={() => {
                onQuestion(id)
                setCustomTurn(null)
              }}
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

        {customTurn ? (
          <div className="ai-custom-turn" ref={answerRef} aria-live="polite">
            <div className="ai-user-message">{customTurn.question}</div>
            <GlassCard className="ai-answer">
              <span className="ai-answer__icon"><img src={robotIcon} alt="" /></span>
              <p>{customTurn.answer}</p>
            </GlassCard>
          </div>
        ) : null}
      </section>

      <form className="ai-input" onSubmit={sendMessage}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="メッセージを入力..."
          aria-label="AIコーチへのメッセージ"
          autoComplete="off"
        />
        <button type="submit" aria-label="送信"><img src={sendIcon} alt="" /></button>
      </form>
    </>
  )
}
