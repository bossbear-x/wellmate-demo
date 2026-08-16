import { useEffect, useRef, useState } from 'react'
import PhoneShell from './components/PhoneShell.jsx'
import HomePage from './pages/HomePage.jsx'
import RecordHubPage from './pages/RecordHubPage.jsx'
import MealListPage from './pages/MealListPage.jsx'
import AddMealPage from './pages/AddMealPage.jsx'
import MealReviewPage from './pages/MealReviewPage.jsx'
import SavingPage from './pages/SavingPage.jsx'
import AiCoachPage from './pages/AiCoachPage.jsx'

const params = new URLSearchParams(window.location.search)
const demoEnabled = params.get('demo') === '1'
const controlsEnabled = params.get('controls') === '1'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [mealType, setMealType] = useState('breakfast')
  const [selectedFoods, setSelectedFoods] = useState([])
  const [saved, setSaved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [demoRun, setDemoRun] = useState(0)
  const saveTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(saveTimer.current), [])

  useEffect(() => {
    if (!demoEnabled) return undefined

    setScreen('home')
    setMealType('breakfast')
    setSelectedFoods([])
    setSaved(false)
    setSelectedQuestion(null)

    const steps = [
      [850, () => setScreen('record')],
      [1750, () => setScreen('meal-list')],
      [2650, () => setScreen('add-meal')],
      [3500, () => setMealType('lunch')],
      [4350, () => setSelectedFoods(['rice', 'egg'])],
      [5250, () => setScreen('review')],
      [6500, () => setScreen('saving')],
      [6950, () => { setSaved(true); setScreen('updated') }],
      [8150, () => setScreen('ai')],
      [9450, () => setSelectedQuestion('breakfast')],
    ]
    const timers = steps.map(([delay, action]) => window.setTimeout(action, delay))
    return () => timers.forEach(window.clearTimeout)
  }, [demoRun])

  const navigate = (destination) => {
    if (destination === 'home') setScreen('home')
    if (destination === 'record') setScreen('record')
    if (destination === 'ai') setScreen('ai')
  }

  const toggleFood = (id) => {
    setSelectedFoods((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const saveMeal = () => {
    setScreen('saving')
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      setSaved(true)
      setScreen('updated')
    }, 420)
  }

  const activeNav = screen === 'home' ? 'home' : screen === 'ai' ? 'ai' : 'record'

  return (
    <div className="portfolio-stage" data-screen={screen} data-demo={demoEnabled ? 'on' : 'off'}>
      <PhoneShell activeNav={activeNav} onNavigate={navigate}>
        {screen === 'home' ? <HomePage onStartRecord={() => setScreen('record')} onLunch={() => setScreen('meal-list')} /> : null}
        {screen === 'record' ? <RecordHubPage onMeal={() => setScreen('meal-list')} /> : null}
        {screen === 'meal-list' ? <MealListPage onBack={() => setScreen('record')} onAdd={() => setScreen('add-meal')} saved={saved} /> : null}
        {screen === 'add-meal' ? (
          <AddMealPage
            mealType={mealType}
            selectedFoods={selectedFoods}
            onMealType={setMealType}
            onFood={toggleFood}
            onBack={() => setScreen('meal-list')}
            onNext={() => setScreen('review')}
          />
        ) : null}
        {screen === 'review' ? (
          <MealReviewPage
            mealType={mealType}
            selectedFoods={selectedFoods}
            onBack={() => setScreen('add-meal')}
            onSave={saveMeal}
          />
        ) : null}
        {screen === 'saving' ? <SavingPage /> : null}
        {screen === 'updated' ? <MealListPage onBack={() => setScreen('record')} onAdd={() => setScreen('add-meal')} saved /> : null}
        {screen === 'ai' ? <AiCoachPage selectedQuestion={selectedQuestion} onQuestion={setSelectedQuestion} /> : null}
      </PhoneShell>

      {controlsEnabled && demoEnabled ? (
        <button className="demo-replay" type="button" onClick={() => setDemoRun((value) => value + 1)}>
          デモを再生
        </button>
      ) : null}
    </div>
  )
}
