import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

export default function PhoneShell({ activeNav, onNavigate, children }) {
  return (
    <main className="phone-shell" aria-label="WellMate mobile application">
      <div className="soft-background" aria-hidden="true" />
      <StatusBar />
      {children}
      <BottomNav active={activeNav} onNavigate={onNavigate} />
    </main>
  )
}
