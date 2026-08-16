import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

export default function SavingPage() {
  return (
    <>
      <PageHeader title="食事詳細" centered />
      <section className="saving-state" aria-live="polite">
        <GlassCard className="saving-card">
          <span className="saving-spinner" aria-hidden="true" />
          <strong>保存しています…</strong>
          <p>記録に反映しています</p>
        </GlassCard>
      </section>
    </>
  )
}
