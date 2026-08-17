import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

export default function StatsPage() {
  return (
    <>
      <PageHeader title="進捗" />
      <section className="screen-scroll stats-scroll" aria-label="進捗">
        <GlassCard className="stats-card stats-card--skin">
          <strong>スキンヘルス</strong>
          <b>78%</b>
          <span>先週 +6%</span>
          <svg className="stats-line-chart" viewBox="0 0 285 92" aria-hidden="true">
            <path d="M12 74 C34 68, 54 50, 78 48 S122 57, 146 53 S184 30, 210 27" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <g fill="white" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="74" r="5" />
              <circle cx="78" cy="48" r="5" />
              <circle cx="146" cy="53" r="5" />
              <circle cx="210" cy="27" r="5" />
            </g>
          </svg>
        </GlassCard>

        <GlassCard className="stats-card stats-card--routine">
          <strong>ルーティン達成率</strong>
          <b>67%</b>
          <span>先週 +12%</span>
          <div className="stats-bars" aria-hidden="true">
            {[34, 24, 48, 40, 62, 50, 72, 58, 78, 66, 83, 90].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="stats-card stats-card--days">
          <strong>継続日数</strong>
          <b>4日</b>
          <span>目標：7日</span>
        </GlassCard>
      </section>
    </>
  )
}
