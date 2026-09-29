import { useEffect, useRef, useState } from 'react'
import PhoneShell from './components/PhoneShell.jsx'
import HomePage from './pages/HomePage.jsx'
import RecordHubPage from './pages/RecordHubPage.jsx'
import MealListPage from './pages/MealListPage.jsx'
import AddMealPage from './pages/AddMealPage.jsx'
import MealReviewPage from './pages/MealReviewPage.jsx'
import SavingPage from './pages/SavingPage.jsx'
import AiCoachPage from './pages/AiCoachPage.jsx'
import StatsPage from './pages/StatsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LaunchPage from './pages/LaunchPage.jsx'
import ExercisePage from './pages/ExercisePage.jsx'
import ExerciseEmptyPage from './pages/ExerciseEmptyPage.jsx'
import FoodSearchPage from './pages/FoodSearchPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import GoalsPage from './pages/GoalsPage.jsx'
import ProfileEditPage from './pages/ProfileEditPage.jsx'
import { calculateNutrition, getSelectedFoods } from './data.js'

const params = new URLSearchParams(window.location.search)
const demoEnabled = params.get('demo') === '1'
const controlsEnabled = params.get('controls') === '1'

const demoSavedMeals = {
  breakfast: { mealType: 'breakfast', kcal: 520, selectedFoods: [] },
  snack: { mealType: 'snack', kcal: 210, selectedFoods: [] },
}

const defaultProfile = {
  name: 'Helen Smith',
  avatar: '',
  birthday: '1994-08-15',
  height: '165',
  targetWeight: '55',
  notifications: true,
  dataLink: true,
}

function loadProfile() {
  try {
    return { ...defaultProfile, ...JSON.parse(localStorage.getItem('wellmate-profile') || '{}') }
  } catch {
    return defaultProfile
  }
}

function loadSavedMeals() {
  try {
    const stored = JSON.parse(localStorage.getItem('wellmate-meals') || 'null')
    if (stored && typeof stored === 'object') return stored

    const legacy = JSON.parse(localStorage.getItem('wellmate-last-meal') || 'null')
    if (legacy?.mealType) {
      const selectedFoods = Array.isArray(legacy.selectedFoods) ? legacy.selectedFoods : []
      return {
        ...demoSavedMeals,
        [legacy.mealType]: {
          mealType: legacy.mealType,
          selectedFoods,
          kcal: calculateNutrition(getSelectedFoods(selectedFoods)).kcal,
        },
      }
    }
  } catch {
    return demoSavedMeals
  }
  return demoSavedMeals
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [mealType, setMealType] = useState(null)
  const [selectedFoods, setSelectedFoods] = useState([])
  const [savedMeals, setSavedMeals] = useState(loadSavedMeals)
  const [saved, setSaved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [demoRun, setDemoRun] = useState(0)
  const [detailBack, setDetailBack] = useState('record')
  const [goal, setGoal] = useState(() => localStorage.getItem('wellmate-goal') || '健康的な生活習慣をつくる')
  const [profile, setProfile] = useState(loadProfile)
  const saveTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(saveTimer.current), [])

  useEffect(() => {
    if (demoEnabled || screen !== 'splash') return undefined
    const timer = window.setTimeout(() => setScreen('onboarding-1'), 1500)
    return () => window.clearTimeout(timer)
  }, [screen])

  useEffect(() => {
    if (!demoEnabled) return undefined

    setScreen('home')
    setMealType(null)
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
    if (['home', 'record', 'stats', 'ai', 'profile'].includes(destination)) {
      setScreen(destination)
    }
  }

  const nextLaunch = () => setScreen((current) => current === 'splash' ? 'onboarding-1' : current === 'onboarding-1' ? 'onboarding-2' : current === 'onboarding-2' ? 'onboarding-3' : 'home')
  const openWeight = (back = 'record') => { setDetailBack(back); setScreen('stats-weight') }
  const openExercise = (back = 'record') => { setDetailBack(back); setScreen('exercise') }
  const openQuestion = (id) => { setSelectedQuestion(id); setScreen('ai-chat') }
  const saveGoal = (value) => { setGoal(value); localStorage.setItem('wellmate-goal', value); setScreen('profile') }
  const saveProfile = (value) => {
    setProfile(value)
    localStorage.setItem('wellmate-profile', JSON.stringify(value))
    setScreen('profile')
  }
  const openNotification = (target) => {
    if (target === 'weight') openWeight('notifications')
    else if (target === 'exercise') openExercise('notifications')
    else setScreen(target)
  }

  const toggleFood = (id) => {
    setSelectedFoods((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const resetMealDraft = () => {
    setMealType(null)
    setSelectedFoods([])
  }

  const startMealDraft = () => {
    resetMealDraft()
    setScreen('add-meal')
  }

  const saveMeal = () => {
    const mealRecord = {
      mealType,
      selectedFoods: [...selectedFoods],
      kcal: calculateNutrition(getSelectedFoods(selectedFoods)).kcal,
    }
    const nextSavedMeals = { ...savedMeals, [mealType]: mealRecord }
    setSavedMeals(nextSavedMeals)
    localStorage.setItem('wellmate-meals', JSON.stringify(nextSavedMeals))
    localStorage.setItem('wellmate-last-meal', JSON.stringify(mealRecord))
    setScreen('saving')
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      setSaved(true)
      resetMealDraft()
      setScreen('updated')
    }, 420)
  }

  const activeNav =
    screen === 'home' ? 'home' :
    screen.startsWith('ai') ? 'ai' :
    screen.startsWith('stats') ? 'stats' :
    screen === 'profile' || screen === 'profile-edit' || screen === 'goals' ? 'profile' :
    screen === 'notifications' ? 'home' : 'record'

  const isLaunch = ['splash', 'onboarding-1', 'onboarding-2', 'onboarding-3'].includes(screen)
  const showNav = !isLaunch && !['food-search', 'goals', 'exercise-empty'].includes(screen)

  return (
    <div className="portfolio-stage" data-screen={screen} data-demo={demoEnabled ? 'on' : 'off'}>
      <div className="app-scale-wrapper">
        <PhoneShell activeNav={activeNav} onNavigate={navigate} showStatus={screen !== 'splash'} showNav={showNav}>
        {isLaunch ? <LaunchPage screen={screen} onNext={nextLaunch} /> : null}
        {screen === 'home' ? <HomePage meals={savedMeals} onStartRecord={() => setScreen('record')} onLunch={() => setScreen('meal-list')} onNotifications={() => setScreen('notifications')} onProfile={() => setScreen('profile')} /> : null}
        {screen === 'record' ? <RecordHubPage onMeal={() => setScreen('meal-list')} onExercise={() => openExercise('record')} onWeight={() => openWeight('record')} /> : null}
        {screen === 'exercise' ? <ExercisePage onBack={() => setScreen(detailBack)} onActivity={() => setScreen('exercise-empty')} onNext={() => setScreen('record')} /> : null}
        {screen === 'exercise-empty' ? <ExerciseEmptyPage onBack={() => setScreen('exercise')} onNext={() => setScreen('record')} /> : null}
        {screen === 'stats' ? <StatsPage view="overview" onView={(view) => setScreen(`stats-${view}`)} /> : null}
        {screen === 'stats-analytics' ? <StatsPage view="analytics" onView={(view) => setScreen(`stats-${view}`)} onBack={() => setScreen('stats')} /> : null}
        {screen === 'stats-weight' ? <StatsPage view="weight" onView={(view) => setScreen(`stats-${view}`)} onBack={() => setScreen(detailBack)} /> : null}
        {screen === 'profile' ? <ProfilePage profile={profile} onEdit={() => setScreen('profile-edit')} onGoals={() => setScreen('goals')} /> : null}
        {screen === 'profile-edit' ? <ProfileEditPage initialProfile={profile} onBack={() => setScreen('profile')} onSave={saveProfile} /> : null}
        {screen === 'goals' ? <GoalsPage initialGoal={goal} onBack={() => setScreen('profile')} onSave={saveGoal} /> : null}
        {screen === 'notifications' ? <NotificationsPage onBack={() => setScreen('home')} onOpen={openNotification} /> : null}

        {screen === 'meal-list' ? <MealListPage meals={savedMeals} onBack={() => setScreen('record')} onAdd={startMealDraft} saved={saved} /> : null}
        {screen === 'add-meal' ? (
          <AddMealPage
            mealType={mealType}
            selectedFoods={selectedFoods}
            onMealType={setMealType}
            onFood={toggleFood}
            onBack={() => setScreen('meal-list')}
            onNext={() => setScreen('review')}
            onSearch={() => setScreen('food-search')}
          />
        ) : null}
        {screen === 'food-search' ? <FoodSearchPage selectedFoods={selectedFoods} onFood={toggleFood} onBack={() => setScreen('add-meal')} onAdd={() => setScreen('add-meal')} /> : null}
        {screen === 'review' ? (
          <MealReviewPage
            mealType={mealType}
            selectedFoods={selectedFoods}
            onBack={() => setScreen('add-meal')}
            onSave={saveMeal}
          />
        ) : null}
        {screen === 'saving' ? <SavingPage /> : null}
        {screen === 'updated' ? <MealListPage meals={savedMeals} onBack={() => setScreen('record')} onAdd={startMealDraft} saved /> : null}
        {screen === 'ai' ? <AiCoachPage view="overview" selectedQuestion={selectedQuestion} onQuestion={openQuestion} onInsights={() => setScreen('ai-insights')} /> : null}
        {screen === 'ai-insights' ? <AiCoachPage view="insights" selectedQuestion={selectedQuestion} onBack={() => setScreen('ai')} /> : null}
        {screen === 'ai-chat' ? <AiCoachPage view="chat" selectedQuestion={selectedQuestion} onBack={() => setScreen('ai')} onInsights={() => setScreen('ai-insights')} /> : null}
        </PhoneShell>
      </div>

      {controlsEnabled && demoEnabled ? (
        <button className="demo-replay" type="button" onClick={() => setDemoRun((value) => value + 1)}>
          デモを再生
        </button>
      ) : null}
    </div>
  )
}
