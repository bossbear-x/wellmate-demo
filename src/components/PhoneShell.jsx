import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

export default function PhoneShell({ activeNav, onNavigate, showStatus = true, showNav = true, children }) {
  return (
    <main className="phone-shell" aria-label="WellMate mobile application">
      <div className="soft-background" aria-hidden="true" />
      {showStatus ? <StatusBar /> : null}
      {children}
      {showNav ? <BottomNav active={activeNav} onNavigate={onNavigate} /> : null}
    </main>
  )
}
