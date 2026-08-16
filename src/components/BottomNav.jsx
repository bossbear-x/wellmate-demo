import homeActive from '../assets/nav-home-active.svg'
import homeInactive from '../assets/nav-home-inactive.svg'
import recordActive from '../assets/nav-record-active.svg'
import recordInactive from '../assets/nav-record-inactive.svg'
import statsInactive from '../assets/nav-stats-inactive.svg'
import aiActive from '../assets/nav-ai-active.svg'
import aiInactive from '../assets/nav-ai-inactive.svg'
import userInactive from '../assets/nav-user-inactive.svg'

const items = [
  { id: 'home', label: 'ホーム', activeIcon: homeActive, inactiveIcon: homeInactive },
  { id: 'record', label: '記録', activeIcon: recordActive, inactiveIcon: recordInactive },
  { id: 'stats', label: '統計', activeIcon: statsInactive, inactiveIcon: statsInactive },
  { id: 'ai', label: 'AI', activeIcon: aiActive, inactiveIcon: aiInactive },
  { id: 'profile', label: 'マイページ', activeIcon: userInactive, inactiveIcon: userInactive },
]

export default function BottomNav({ active, onNavigate }) {
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active))

  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      <span className="bottom-nav__lens" style={{ transform: `translateX(${activeIndex * 69}px)` }} />
      {items.map((item) => {
        const isActive = active === item.id
        const enabled = ['home', 'record', 'ai'].includes(item.id)
        return (
          <button
            key={item.id}
            className={`bottom-nav__item ${isActive ? 'is-active' : ''}`}
            type="button"
            onClick={() => enabled && onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={!enabled}
          >
            <img src={isActive ? item.activeIcon : item.inactiveIcon} alt="" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
